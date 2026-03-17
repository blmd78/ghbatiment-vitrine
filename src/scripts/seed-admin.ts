import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

// ─── Charger .env.local manuellement ────────────────────────────────────────
const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, '../..');

for (const envFile of ['.env.local', '.env']) {
  const filePath = path.join(root, envFile);
  if (!fs.existsSync(filePath)) {
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf-8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) {
      continue;
    }
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

// ─── Mock @next/env (absent hors Next.js runtime) ──────────────────────────
const require = createRequire(import.meta.url);
const Module = require('node:module');
const origResolve = Module._resolveFilename;
Module._resolveFilename = function (request: string, ...args: unknown[]) {
  if (request === '@next/env') {
    return request;
  }
  return origResolve.call(this, request, ...args);
};
require.cache['@next/env'] = {
  id: '@next/env',
  filename: '@next/env',
  loaded: true,
  exports: { loadEnvConfig: () => ({ combinedEnv: process.env, loadedEnvFiles: [] }) },
} as never;

// ─── Seed ───────────────────────────────────────────────────────────────────
async function seed() {
  const email = process.env.ADMIN_SEED_EMAIL;
  if (!email) {
    console.log('ADMIN_SEED_EMAIL non défini, seed ignoré.');
    process.exit(0);
  }

  const { getPayload } = await import('payload');
  const { default: config } = await import('../payload.config.js');
  const payload = await getPayload({ config });

  const { docs } = await payload.find({
    collection: 'users',
    limit: 1,
    overrideAccess: true,
  });

  if (docs.length > 0) {
    console.log('Utilisateur(s) existant(s), seed ignoré.');
    process.exit(0);
  }

  await payload.create({
    collection: 'users',
    data: {
      email,
      role: 'admin',
      name: 'Admin',
    },
    overrideAccess: true,
  });

  console.log(`Admin créé : ${email}`);
  process.exit(0);
}

seed().catch((err) => {
  // 42P01 = table inexistante (premier déploiement, migrations pas encore faites)
  if (err?.code === '42P01' || err?.cause?.code === '42P01') {
    console.log('Tables non créées, seed ignoré (premier déploiement).');
    process.exit(0);
  }
  console.error('Erreur seed:', err);
  process.exit(1);
});
