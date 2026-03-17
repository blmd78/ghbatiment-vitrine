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

// ─── Mock @next/env ──────────────────────────────────────────────────────────
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

// ─── Push DB ─────────────────────────────────────────────────────────────────
async function pushDb() {
  const { getPayload } = await import('payload');
  const { default: config } = await import('../payload.config.js');
  const payload = await getPayload({ config });

  const db = payload.db as unknown as Record<string, unknown>;
  if (db && typeof db.push === 'function') {
    console.log('Push du schéma DB en cours...');
    await (db.push as (args: { forceAcceptWarning: boolean }) => Promise<void>)({
      forceAcceptWarning: true,
    });
    console.log('Schéma DB synchronisé.');
  } else {
    console.log('Méthode push non disponible sur le DB adapter.');
  }

  process.exit(0);
}

pushDb().catch((err) => {
  console.error('Erreur push DB:', err);
  process.exit(1);
});
