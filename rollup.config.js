import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';
import packageJson from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom', 'styled-components', 'framer-motion'],
  plugins: [
    peerDepsExternal(),
    resolve({ extensions: ['.js', '.ts', '.tsx'] }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    postcss(),
    svgr({
      icon: true, // Optimize for icon size
      svgo: true, // Enable SVGO for optimizing SVGs
      svgoConfig: {
        // Custom SVGO config (optional)
        plugins: [{ name: 'removeViewBox', active: false }],
      },
    }),
    // Export SVGs and PNgs as URLs for assets
    // include public path to make sure these get refenced ok
    url({
      include: ['**/*.svg', '**/*.png'], // Match SVG files
      limit: 0, // Always copy images as assets
      fileName: 'assets/[name]-[hash][extname]', // File naming
      emitFiles: true,
    }),
  ],
};
