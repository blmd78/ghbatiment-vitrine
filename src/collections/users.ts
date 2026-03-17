import crypto from 'node:crypto';
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Utilisateur',
    plural: 'Utilisateurs',
  },
  auth: {
    disableLocalStrategy: {
      enableFields: true,
    },
    tokenExpiration: 7200, // 2 heures
    strategies: [
      {
        name: 'otp-jwt',
        authenticate: async ({ headers, payload }) => {
          // 1. Extraire le token du cookie
          const cookie = headers.get('cookie') || '';
          const match = cookie.match(/payload-token=([^;]+)/);
          if (!match) {
            return { user: null };
          }
          const token = match[1];

          try {
            // 2. Vérifier le JWT (HS256 via crypto natif)
            const [headerB64, payloadB64, sigB64] = token.split('.');
            const expectedSig = crypto
              .createHmac('sha256', payload.secret)
              .update(`${headerB64}.${payloadB64}`)
              .digest('base64url');

            // Comparaison timing-safe de la signature
            if (
              expectedSig.length !== sigB64.length ||
              !crypto.timingSafeEqual(Buffer.from(expectedSig), Buffer.from(sigB64))
            ) {
              return { user: null };
            }

            const decoded = JSON.parse(Buffer.from(payloadB64, 'base64url').toString()) as {
              id: number;
              collection: string;
              exp: number;
            };

            // Vérifier collection
            if (decoded.collection !== 'users') {
              return { user: null };
            }

            // Vérifier expiration
            if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
              return { user: null };
            }

            // Chercher l'utilisateur
            const user = await payload.findByID({
              collection: 'users',
              id: decoded.id as number,
              overrideAccess: true,
            });

            if (!user) {
              return { user: null };
            }

            user.collection = 'users';
            user._strategy = 'otp-jwt';
            return { user } as { user: typeof user & { collection: string; _strategy: string } };
          } catch {
            return { user: null };
          }
        },
      },
    ],
  },
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    create: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.id === req.data?.id || req.user?.role === 'admin',
    read: ({ req }) => {
      if (req.user?.role === 'admin') {
        return true;
      }
      if (req.user) {
        return { id: { equals: req.user.id } };
      }
      return false;
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rôle',
      defaultValue: 'editor',
      options: [
        { label: 'Administrateur', value: 'admin' },
        { label: 'Éditeur', value: 'editor' },
      ],
      access: {
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
    // ─── Champs OTP (cachés, inaccessibles via API) ───────────────────────
    {
      name: 'otpCode',
      type: 'text',
      admin: { hidden: true },
      access: {
        read: () => false,
        update: () => false,
      },
    },
    {
      name: 'otpExpiry',
      type: 'date',
      admin: { hidden: true },
      access: {
        read: () => false,
        update: () => false,
      },
    },
    {
      name: 'otpAttempts',
      type: 'number',
      defaultValue: 0,
      admin: { hidden: true },
      access: {
        read: () => false,
        update: () => false,
      },
    },
  ],
};
