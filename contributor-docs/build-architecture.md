# Build Architecture Guide

This document explains how `@apple-pie/slice` is built and what to update when adding or changing components, hooks, themes, and providers.

## Build Pipeline

`npm run build` runs three stages in order:

1. `rollup -c --bundleConfigAsCjs`
2. `tsc -p tsconfig.build.json`
3. `./scripts/copy-css.sh`

### Stage 1: Rollup (JavaScript output)

Rollup config: `rollup.config.js`

- Build inputs are discovered automatically:
  - Root entry: `src/index.ts`
  - UI component entries: each `src/components/*/index.ts`
  - Hooks: `src/hooks/index.ts` and each `src/hooks/<HookName>/<HookName>.ts(x)`
  - Providers: `src/providers/index.ts` and each provider source file (for example `ThemeProvider.tsx`)
  - Stores: `src/stores/index.ts` and each `src/stores/<StoreName>/index.ts`
  - Theme: `src/theme/index.ts` plus `theme/colors`, `theme/corners`, `theme/type`, `theme/themes`
  - Utilities: `src/utils/index.ts`
- Outputs:
  - CommonJS: `dist/cjs/**`
  - ESM: `dist/esm/**`
- Shared chunks are emitted into `dist/{cjs,esm}/chunks/**`.

Important plugins and behavior:

- `@rollup/plugin-typescript` uses `tsconfig.rollup.json` (JS transpile only).
- `rollup-plugin-postcss` handles CSS imports.
- CSS is injected at runtime (via generated style injection helpers in JS chunks).
- `@svgr/rollup` + `@rollup/plugin-url` handle SVG/image assets.
- Story files are excluded from build inputs and TS plugin include patterns.

### Stage 2: TypeScript declarations

Type config: `tsconfig.build.json`

- Runs declaration emit into `dist/types/**`.
- Excludes Storybook files:
  - `**/*.stories.ts`
  - `**/*.stories.tsx`
  - `documentation/**`

### Stage 3: CSS copy

Script: `scripts/copy-css.sh`

- Copies utility CSS modules to `dist/css/`:
  - `flexBox.module.css`
  - `type.module.css`

## Published Package Contract

Package metadata in `package.json`:

- `main`: `dist/cjs/index.js`
- `module`: `dist/esm/index.js`
- `types`: `dist/types/index.d.ts`
- `exports`:
  - `.` (root)
  - `./hooks`, `./hooks/*`
  - `./providers`, `./providers/*`
  - `./stores`, `./stores/*`
  - `./utils`
  - `./theme`, `./theme/colors`, `./theme/corners`, `./theme/type`, `./theme/themes`
  - `./components/*` (subpath component imports)
- `sideEffects`: `"**/*.css"`

### Supported import patterns

- Root API: `import { ButtonLikeThing } from '@apple-pie/slice'`
- Component subpath API: `import { Avatar } from '@apple-pie/slice/components/Avatar'`
- Hook subpath API: `import { useTheme } from '@apple-pie/slice/hooks/useTheme'`
- Provider subpath API: `import { ThemeProvider } from '@apple-pie/slice/providers/ThemeProvider'`
- Store subpath API: `import { useToast } from '@apple-pie/slice/stores/toast'`
- Utilities API: `import { addOpacity } from '@apple-pie/slice/utils'`
- Theme subpath API: `import { lightTheme } from '@apple-pie/slice/theme/themes'`

## Adding New UI Components

When adding `src/components/NewComponent/*`:

1. Add `src/components/NewComponent/index.ts`.
2. Export the component/types from that `index.ts`.
3. (Optional but recommended) Re-export from `src/index.ts` for root import consumers.
4. Ensure Storybook files are named `*.stories.tsx` so they stay excluded.
5. Run `npm run build`.
6. Verify outputs exist:
   - `dist/esm/components/NewComponent/index.mjs`
   - `dist/cjs/components/NewComponent/index.js`
   - `dist/types/components/NewComponent/index.d.ts`

No Rollup config change is needed for standard new components because inputs are auto-discovered.

## Adding New Hooks, Providers, Theme Utilities, and Package Utilities

For new hook/provider/theme/package utility API:

1. Add implementation under `src/hooks`, `src/providers`, `src/theme`, or `src/utils/functions`.
2. Export from its local `index.ts` (if applicable).
3. Export from `src/index.ts` to publish it on root API, or from `src/utils/index.ts` to publish it on the `./utils` subpath.
4. For hook subpath auto-discovery, use folder/file convention:
   - `src/hooks/<HookName>/<HookName>.ts` or `.tsx`
5. For provider subpath auto-discovery, place provider file in `src/providers` (non-`index.ts`, non-story).
6. For theme subpaths, update `themeEntries` in `rollup.config.js` if adding a new themed module family.
7. For package utilities, export them from `src/utils/index.ts`.
8. Run `npm run build` and verify type output in `dist/types/**`.

## Adding New Stores

For a new store:

1. Add folder `src/stores/<StoreName>/`.
2. Add implementation (for example `store.ts`) and local entry `src/stores/<StoreName>/index.ts`.
3. Export from `src/stores/index.ts`.
4. Run `npm run build`.
5. Verify outputs:
   - `dist/esm/stores/<StoreName>.js`
   - `dist/cjs/stores/<StoreName>.js`
   - `dist/types/stores/<StoreName>/index.d.ts`

## CSS and Side Effects Guidance

- CSS imports create side effects at module load time.
- Keep `"sideEffects": ["**/*.css"]` unless you redesign styling to be side-effect free.
- If introducing additional non-CSS side-effect modules, list them explicitly in `sideEffects`.

## Storybook Separation Rules

To avoid polluting published artifacts:

- Keep Storybook-only docs and examples in:
  - `documentation/**`
  - or colocated `*.stories.ts(x)` files
- Do not export story helpers from `src/index.ts`.

## Troubleshooting

### New component is missing from `dist/esm/components`

- Confirm folder shape: `src/components/<Name>/index.ts`.
- Confirm no TS compile errors in that component.

### Story types appear in `dist/types`

- Check naming/paths match exclusions in `tsconfig.build.json`.
- Ensure story files use `.stories.ts` or `.stories.tsx` suffix.

### Import path works locally but not for consumers

- Verify the path is declared in `package.json` `exports`.
- Use `npm pack --dry-run` to inspect what will be published.

## Release Verification Checklist

Before publishing:

1. Run `npm run build`.
2. Run `npm pack --dry-run`.
3. Confirm root artifacts:
   - `dist/cjs/index.js`
   - `dist/esm/index.js`
   - `dist/types/index.d.ts`
4. Confirm new component artifacts exist in all three trees (`cjs`, `esm`, `types`).
5. Confirm no story declaration files:
   - `find dist/types -type f | rg 'stories|\.stories\.d\.ts'`
6. Confirm `exports` covers intended public import paths.
