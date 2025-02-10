import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  loadEnv(mode, __dirname, ''); // Using __dirname instead of process.cwd()
  return {
    root: resolve(__dirname, './playground'),
    logLevel: 'silent', // Prevent logging Vite hot update messages
    plugins: [
      react(),
      eslint(),
      svgr({
        svgrOptions: {
          exportType: 'named',
          ref: true,
          svgo: false,
          titleProp: true,
        },
        include: '**/*.svg',
      }),
    ],
    server: {
      open: true,
      port: 3000,
    },
    resolve: {
      alias: {
        '@fs': './',
      },
    },
  };
});
