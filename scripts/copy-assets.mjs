import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if we're in a consuming project (not in development)
const isInNodeModules = __dirname.includes('node_modules');

// Source will be from the package's dist/assets
const source = isInNodeModules
  ? path.resolve(__dirname, '../../dist/assets')
  : path.resolve(__dirname, '../dist/assets');

// Destination will be the consuming project's public/assets folder
const destination = path.resolve('public/assets');

async function copyDir(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
    console.log('✅ Assets copied successfully to public/assets!');
  } catch (err) {
    console.error('❌ Error copying assets:', err);
  }
}

fs.access(source)
  .then(() => copyDir(source, destination))
  .catch(() => console.log('⚠️ No assets found in dist/assets to copy.'));
