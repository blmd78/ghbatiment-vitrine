import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';

const IMAGES_DIR = path.resolve(import.meta.dirname, '../public/images');
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

let totalBefore = 0;
let totalAfter = 0;
let count = 0;

async function processDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDir(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!EXTENSIONS.has(ext)) continue;

    const { size: sizeBefore } = await stat(fullPath);
    totalBefore += sizeBefore;

    const webpPath = fullPath.replace(/\.(jpe?g|png)$/i, '.webp');
    const relativePath = path.relative(IMAGES_DIR, fullPath);

    try {
      const image = sharp(fullPath);
      const metadata = await image.metadata();

      let pipeline = image;
      if (metadata.width && metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize(MAX_WIDTH, null, { withoutEnlargement: true });
      }

      await pipeline.webp({ quality: WEBP_QUALITY }).toFile(webpPath);

      const { size: sizeAfter } = await stat(webpPath);
      totalAfter += sizeAfter;
      count++;

      const savings = ((1 - sizeAfter / sizeBefore) * 100).toFixed(0);
      console.log(`${relativePath} → .webp  ${(sizeBefore / 1024).toFixed(0)}KB → ${(sizeAfter / 1024).toFixed(0)}KB  (-${savings}%)`);

      // Supprime l'original
      await unlink(fullPath);
    } catch (err) {
      console.error(`ERREUR: ${relativePath} — ${err.message}`);
    }
  }
}

console.log('Optimisation des images...\n');
await processDir(IMAGES_DIR);

console.log(`\n--- Résultat ---`);
console.log(`${count} images converties`);
console.log(`Avant : ${(totalBefore / 1024 / 1024).toFixed(1)} MB`);
console.log(`Après : ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
console.log(`Économie : ${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%`);
