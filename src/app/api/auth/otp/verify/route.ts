import crypto from 'node:crypto';
import { getPayload, jwtSign } from 'payload';
import config from '@payload-config';

import { verifyOtpSchema } from '@/lib/schemas/otp';
import { OTP_MAX_ATTEMPTS, hashOTP } from '@/lib/auth/otp';

const TOKEN_EXPIRATION = 7200; // 2 heures (secondes)
const COOKIE_NAME = 'payload-token';
const INVALID_MESSAGE = 'Code invalide ou expiré.';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: INVALID_MESSAGE }, { status: 401 });
  }

  const result = verifyOtpSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ success: false, message: INVALID_MESSAGE }, { status: 401 });
  }

  const { email, code } = result.data;

  try {
    const payload = await getPayload({ config });

    const { docs: users } = await payload.find({
      collection: 'users',
      where: { email: { equals: email.toLowerCase() } },
      limit: 1,
      overrideAccess: true,
    });

    if (users.length === 0) {
      return Response.json({ success: false, message: INVALID_MESSAGE }, { status: 401 });
    }

    const user = users[0];

    // Vérifier que l'OTP existe
    if (!user.otpCode || !user.otpExpiry) {
      return Response.json({ success: false, message: INVALID_MESSAGE }, { status: 401 });
    }

    // Vérifier le nombre de tentatives
    if ((user.otpAttempts ?? 0) >= OTP_MAX_ATTEMPTS) {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: { otpCode: null, otpExpiry: null, otpAttempts: 0 },
        overrideAccess: true,
      });
      return Response.json({ success: false, message: INVALID_MESSAGE }, { status: 401 });
    }

    // Vérifier l'expiration
    if (new Date(user.otpExpiry) < new Date()) {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: { otpCode: null, otpExpiry: null, otpAttempts: 0 },
        overrideAccess: true,
      });
      return Response.json({ success: false, message: INVALID_MESSAGE }, { status: 401 });
    }

    // Comparer le hash (timing-safe)
    const codeHash = hashOTP(code);
    const codeMatch =
      codeHash.length === user.otpCode.length &&
      crypto.timingSafeEqual(Buffer.from(codeHash), Buffer.from(user.otpCode));

    if (!codeMatch) {
      await payload.update({
        collection: 'users',
        id: user.id,
        data: { otpAttempts: (user.otpAttempts ?? 0) + 1 },
        overrideAccess: true,
      });
      return Response.json({ success: false, message: INVALID_MESSAGE }, { status: 401 });
    }

    // Code valide — effacer l'OTP
    await payload.update({
      collection: 'users',
      id: user.id,
      data: { otpCode: null, otpExpiry: null, otpAttempts: 0 },
      overrideAccess: true,
    });

    // Signer le JWT avec le secret interne de Payload
    const { token, exp } = await jwtSign({
      fieldsToSign: {
        id: user.id,
        collection: 'users',
        email: user.email,
      },
      secret: payload.secret,
      tokenExpiration: TOKEN_EXPIRATION,
    });

    // Cookie HttpOnly — le token n'est PAS retourné dans le body
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieParts = [
      `${COOKIE_NAME}=${token}`,
      'Path=/',
      'HttpOnly',
      'SameSite=Lax',
      `Max-Age=${TOKEN_EXPIRATION}`,
    ];
    if (isProduction) {
      cookieParts.push('Secure');
    }

    return Response.json(
      {
        success: true,
        exp,
      },
      {
        headers: {
          'Set-Cookie': cookieParts.join('; '),
        },
      },
    );
  } catch (error) {
    console.error('Erreur OTP verify:', error);
    return Response.json({ success: false, message: 'Erreur serveur.' }, { status: 500 });
  }
}
