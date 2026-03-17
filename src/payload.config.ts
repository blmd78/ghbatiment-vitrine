import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { fr } from '@payloadcms/translations/languages/fr';
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Users } from './collections/users';
import { Media } from './collections/media';
// import { EngagementsSection } from './globals/engagements-section';
import { GalerieGlobal } from './globals/galerie';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const plugins = [];

// S3 storage only when configured (skip in local dev without R2)
if (process.env.S3_BUCKET) {
  plugins.push(
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: process.env.S3_BUCKET,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_URL || '',
        forcePathStyle: true,
      },
    }),
  );
}

if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET manquant — définis-le dans .env.local');
}

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
const adminURL = serverURL.replace('://localhost', '://admin.localhost');

export default buildConfig({
  serverURL,
  cors: [serverURL, adminURL],
  csrf: [serverURL, adminURL],
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: 'fr',
  },
  graphQL: {
    disable: true,
  },
  admin: {
    user: Users.slug,
    livePreview: {
      url: () => serverURL,
      collections: [],
      globals: [/* 'engagements-section', */ 'galerie'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 812 },
        { label: 'Tablette', name: 'tablet', width: 768, height: 1024 },
      ],
    },
    meta: {
      titleSuffix: ' — GH Bâtiment',
    },
    components: {
      beforeLogin: ['/src/components/payload/OTPLogin'],
      graphics: {
        Logo: '/src/components/payload/Logo',
        Icon: '/src/components/payload/Icon',
      },
    },
  },
  collections: [Users, Media],
  globals: [/* EngagementsSection, */ GalerieGlobal],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  plugins,
  sharp,
});
