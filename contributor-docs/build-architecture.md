# Build Architecture Guide

This document describes the current publish pipeline for `@apple-pie/slice` and the file/layout conventions that keep new APIs publishable.

## Build Command

`npm run build` runs these steps in order:

1. `prebuild`: `rm -rf dist`
2. Rollup bundle build: `NODE_ENV=production rollup -c --bundleConfigAsCjs`
3. Type declaration build: `tsc -p tsconfig.build.json`
4. CSS copy step: `./scripts/copy-css.sh`

`npm run build:min` runs the same pipeline with `MINIFY=true`.

## Stage 1: Rollup Bundles

Build config: `rollup.config.js`

Rollup discovers entrypoints automatically from `src`:

- Package roots:
  - `src/index.ts`
  - `src/hooks/index.ts`
  - `src/providers/index.ts`
  - `src/stores/index.ts`
  - `src/theme/index.ts`
  - `src/utils/index.ts`
  - `src/utils/objects/index.ts`
- Components:
  - every `src/components/<Name>/index.ts`
- Hooks:
  - every `src/hooks/<HookName>/<HookName>.ts` or `.tsx`
- Providers:
  - every non-story `.ts`/`.tsx` file in `src/providers`
- Stores:
  - every `src/stores/<StoreName>/index.ts`
- Workers:
  - `src/workers/<WorkerName>/<WorkerName>.ts`
  - or `src/workers/<WorkerName>/<WorkerName>.worker.ts`
  - or `src/workers/<WorkerName>/index.ts`
- Theme subpaths:
  - `src/theme/colors/colors.ts`
  - `src/theme/corners/corners.ts`
  - `src/theme/elevations/elevations.ts`
  - `src/theme/motion/motion.ts`
  - `src/theme/type/type.ts`
  - `src/theme/themes.ts`

Output layout:

- CommonJS: `dist/cjs/**`
- ESM: `dist/esm/**`
- Shared chunks: `dist/cjs/chunks/**` and `dist/esm/chunks/**`

Entry naming conventions in output:

- Root entry: `dist/cjs/index.js`, `dist/esm/index.mjs`
- Component subpaths: `dist/{cjs,esm}/components/<Name>/index.{js,mjs}`
- Worker subpaths: `dist/{cjs,esm}/workers/<WorkerName>/<WorkerName>.{js,mjs}`
- Utils objects: `dist/{cjs,esm}/utils/objects/index.{js,mjs}`

Important plugin behavior:

- `@rollup/plugin-typescript` uses `tsconfig.rollup.json` for transpile-only bundling
- `rollup-plugin-postcss` turns CSS imports into runtime-injected styles
- `@svgr/rollup` handles SVG React imports
- `@rollup/plugin-url` emits SVG, PNG, JPG, and GIF assets into `dist/**/assets`
- `rollup-plugin-peer-deps-external` keeps peer deps external
- `@rollup/plugin-terser` runs for both normal and minified builds
- `rollup-plugin-visualizer` writes `reports/package-size-visualizer.html`

Externalized runtime deps:

- `react`
- `react-dom`
- `motion`

## Stage 2: Type Declarations

Type build config: `tsconfig.build.json`

Declaration output is written to `dist/types/**` via the base `tsconfig.json` settings:

- `declaration: true`
- `emitDeclarationOnly: true`
- `declarationDir: dist/types`

Included source:

- `src/**/*`

Excluded from declaration build:

- `documentation/**`
- `**/*.stories.ts`
- `**/*.stories.tsx`

Important note:

- Story files stay out of the published type tree only if production source files do not import them. If a source file imports a story file, TypeScript will still pull that story into the declaration graph.

## Stage 3: CSS Copy

Script: `scripts/copy-css.sh`

Copied files:

- `src/utils/styling/flexBox.module.css` -> `dist/css/flexBox.module.css`
- `src/utils/styling/type.module.css` -> `dist/css/type.module.css`

## Theme CSS Bootstrap

`ThemeProvider` in `src/providers/ThemeProvider.tsx` is also a styling entrypoint.

It imports these theme foundation files for side effects:

- `src/theme/colors/colors.css`
- `src/theme/elevations/elevation.css`
- `src/theme/type/type.css`
- `src/theme/breakpoints/custom-media.css`
- `src/theme/motion/motion.css`

Those imports are required for theme CSS variables, typography classes, custom media aliases, motion tokens, and elevation tokens to exist at runtime. The provider does not only set `document.documentElement.dataset.sliceTheme`; it also renders a `data-slice-theme-scope` wrapper and ensures the underlying CSS token files are included in the bundle.

If those imports are removed, theming may appear to "work" from React state while Storybook or consuming apps fail at runtime because the CSS variables and utility classes are missing.

## Published Package Contract

Package metadata lives in `package.json`.

Top-level fields:

- `main`: `dist/cjs/index.js`
- `module`: `dist/esm/index.mjs`
- `types`: `dist/types/index.d.ts`
- `type`: `commonjs`
- `sideEffects`: `["**/*.css"]`

Published export map:

- `.`
- `./components/*`
- `./hooks`
- `./hooks/*`
- `./providers`
- `./providers/*`
- `./stores`
- `./stores/*`
- `./workers/*`
- `./theme`
- `./theme/colors`
- `./theme/corners`
- `./theme/elevations`
- `./theme/motion`
- `./theme/type`
- `./theme/themes`
- `./utils`
- `./utils/objects`

Representative import patterns:

```ts
import { Button } from '@apple-pie/slice';
import { Avatar } from '@apple-pie/slice/components/Avatar';
import { useTheme } from '@apple-pie/slice/hooks/useTheme';
import { ThemeProvider } from '@apple-pie/slice/providers/ThemeProvider';
import { useUploadsActions } from '@apple-pie/slice/stores/uploads';
import uploadsWorkerUrl from '@apple-pie/slice/workers/uploads/uploads?url';
import { lightTheme } from '@apple-pie/slice/theme/themes';
import { IndexedDB } from '@apple-pie/slice/utils/objects';
```

## Adding New Public APIs

### Components

For `src/components/<Name>/...`:

1. Add `src/components/<Name>/index.ts`.
2. Export the component and public types from that `index.ts`.
3. Re-export from `src/index.ts` if the component should be available from the package root.
4. Keep Storybook files named `*.stories.tsx`.
5. Run `npm run build`.
6. Verify:
   - `dist/esm/components/<Name>/index.mjs`
   - `dist/cjs/components/<Name>/index.js`
   - `dist/types/components/<Name>/index.d.ts`

### Hooks

For a new hook subpath:

1. Place it at `src/hooks/<HookName>/<HookName>.ts` or `.tsx`.
2. Export from `src/hooks/index.ts` if it should also appear in `@apple-pie/slice/hooks`.
3. Re-export from `src/index.ts` if it should also appear in the package root.
4. Run `npm run build`.

### Providers

For a new provider:

1. Add the provider source file in `src/providers`.
2. Export it from `src/providers/index.ts`.
3. Re-export from `src/index.ts` if it belongs on the root API.
4. Run `npm run build`.

For `ThemeProvider` specifically:

1. Keep the theme CSS side-effect imports in place unless the styling bootstrap is intentionally moved elsewhere.
2. If you move that bootstrap, update both this document and the README usage guidance.

### Stores

For a new store:

1. Add `src/stores/<StoreName>/index.ts`.
2. Export the public store API from that folder.
3. Export it from `src/stores/index.ts` only if it belongs in `@apple-pie/slice/stores`.
4. Run `npm run build`.
5. Verify:
   - `dist/esm/stores/<StoreName>.mjs`
   - `dist/cjs/stores/<StoreName>.js`
   - `dist/types/stores/<StoreName>/index.d.ts`

### Workers

For a new worker:

1. Add `src/workers/<WorkerName>/`.
2. Use one of the recognized entry names:
   - `<WorkerName>.ts`
   - `<WorkerName>.worker.ts`
   - `index.ts`
3. Run `npm run build`.
4. Verify the worker appears under `dist/{esm,cjs}/workers/<WorkerName>/`.

### Theme Modules

For a new top-level theme subpath:

1. Add the source module under `src/theme/...`.
2. Add it to `themeEntries` in `rollup.config.js`.
3. Add the corresponding `exports` entry in `package.json`.
4. Export types and values from `src/theme/index.ts` as needed.
5. Run `npm run build`.

### Utilities

For utilities:

1. Export package-level helpers from `src/utils/index.ts`.
2. Export low-level object helpers from `src/utils/objects/index.ts`.
3. If you need a new public utility subpath beyond the existing ones, update `package.json` `exports` and Rollup entry discovery accordingly.

## Storybook Separation

Keep Storybook-only material in:

- `documentation/**`
- colocated `*.stories.ts(x)`
- colocated `*.mdx`

Do not import story files into production code.

## Release Verification

Before publishing:

1. Run `npm run build`.
2. Run `npm pack --dry-run`.
3. Confirm core artifacts exist:
   - `dist/cjs/index.js`
   - `dist/esm/index.mjs`
   - `dist/types/index.d.ts`
4. Confirm new API artifacts exist in `dist/cjs`, `dist/esm`, and `dist/types`.
5. Confirm story files are not present in the type output:
   - `rg 'stories\\.d\\.ts|\\.stories\\.' dist/types`
6. Confirm `package.json` `exports` includes any new public import path.
