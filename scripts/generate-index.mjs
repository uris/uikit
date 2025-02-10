import fs from 'fs';
import path from 'path';

const SRC_DIR = './src'; // Adjust for project root
const OUTPUT_FILE = path.join(SRC_DIR, 'index.ts'); // Path to the root `index.ts`

/**
 * Recursively finds all `index.ts` files starting from a directory.
 * @param {string} dir - The directory to search in.
 * @param {string[]} results - Array to collect paths of `index.ts` files.
 * @returns {string[]} Array of relative paths to `index.ts` files.
 */
function findIndexFiles(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recurse into subdirectory
      findIndexFiles(fullPath, results);
    } else if (entry.isFile() && entry.name === 'index.ts') {
      // Add relative path to results
      const relativePath = path.relative(SRC_DIR, fullPath).replace(/\\/g, '/');
      results.push(relativePath);
    }
  });

  return results;
}

/**
 * Extracts all named exports from an index.ts file.
 * @param {string} filePath - Path to the `index.ts` file.
 * @returns {string[]} Array of named exports.
 */
function getNamedExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const exportRegex = /export\s+(?:\{([^}]+)\}|type\s+\{([^}]+)\})/g;

  const namedExports = [];
  let match;
  while ((match = exportRegex.exec(content)) !== null) {
    // Match either normal exports or type exports
    const exportNames = match[1] || match[2];
    if (exportNames) {
      namedExports.push(...exportNames.split(',').map((name) => name.trim()));
    }
  }

  return namedExports;
}

/**
 * Generate a root `index.ts` file with explicit exports for all found named exports.
 */
function generateRootIndexFile() {
  console.log('Scanning for index.ts files...');
  const indexFiles = findIndexFiles(SRC_DIR);

  const exports = [];

  indexFiles.forEach((file) => {
    const filePath = path.join(SRC_DIR, file);
    const namedExports = getNamedExports(filePath);

    if (namedExports.length > 0) {
      const dirPath = path.dirname(file).replace(/\\/g, '/');
      const exportLine = `export { ${namedExports.join(
        ', ',
      )} } from "./${dirPath}";`;
      exports.push(exportLine);
    }
  });

  // Write the export statements to the root index.ts
  const content = exports.join('\n') + '\n';
  fs.writeFileSync(OUTPUT_FILE, content);

  console.log(`Generated ${OUTPUT_FILE}:\n\n${content}`);
}

// Execute the script
generateRootIndexFile();
