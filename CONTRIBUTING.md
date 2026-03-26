# Contributing to Slice

This repository contains the source for the `@apple-pie/slice` package, Storybook docs, and benchmark tooling.

## Local Setup

Requirements:

- Node.js 18+ recommended
- npm

Install dependencies:

```bash
npm install
```

Start the main local workflows:

```bash
npm run dev
npm run storybook
npm run test
npm run benchmark
npm run build
npm run lint
```

## Repository Layout

- `src/components` React components and their local public entrypoints
- `src/hooks` hooks and hook subpath entrypoints
- `src/providers` providers
- `src/stores` optional Zustand-backed stores
- `src/workers` publishable worker entrypoints
- `src/theme` theme tokens, presets, and typed theme utilities
- `src/utils` package utilities and low-level objects
- `documentation` Storybook docs pages and doc-only helpers
- `benchmarks` Vitest benchmark suite
- `contributor-docs` contributor-specific implementation notes

## Contribution Rules

- Keep public exports intentional. New files are not automatically public unless they are wired into the relevant entrypoints and `package.json` `exports`.
- Put Storybook examples in `*.stories.ts(x)` or `documentation/**`.
- Do not import story files into production source. That can leak story typings into `dist/types`.
- If you add a new package subpath, update both Rollup entry discovery and `package.json` `exports`.
- Preserve CSS side effects for imported styles unless you are intentionally redesigning the packaging model.

## Build and Package Validation

Before opening a PR or publishing:

1. Run `npm run build`.
2. Run `npm pack --dry-run`.
3. Verify the new or changed API appears under `dist/cjs`, `dist/esm`, and `dist/types`.
4. Verify Storybook files do not appear in `dist/types`.

Build architecture details: [contributor-docs/build-architecture.md](./contributor-docs/build-architecture.md)

## Publishing Notes

- The package name is `@apple-pie/slice`.
- The current package metadata is defined in `package.json`.
- `README.md` is part of the published package, so public-facing usage and install guidance should stay current.
- This repo is preparing for public GitHub visibility, so contributor docs should avoid private-only assumptions.
