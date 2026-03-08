# Slice (`@apple-pie/slice`)

Slice is a TypeScript-first React UI kit with theme tokens, utility hooks, optional Zustand stores, Storybook docs, and benchmark tooling.

## What is included

- 30+ reusable UI components (inputs, buttons, navigation, overlays, feedback, layout, icons)
- Theme system with light/dark presets and typed theme tokens
- React hooks for theme, window sizing, keyboard shortcuts, local storage, resize, and more
- Optional Zustand-powered stores (`toast`, `tip`)
- Rollup + TypeScript build pipeline for CJS, ESM, and declaration output
- Component performance benchmarks powered by Vitest

## Installation

```bash
npm install @apple-pie/slice
```

Peer dependencies:

```bash
npm install react react-dom motion
```

Optional (only if using store exports):

```bash
npm install zustand
```

## Quick start

```tsx
import { ThemeProvider, Avatar, UIButton, useTheme } from '@apple-pie/slice';

function ThemeToggle() {
  const theme = useTheme();
  return (
    <UIButton
      label={theme.isDark ? 'Switch to Light' : 'Switch to Dark'}
      onClick={() => theme.toggle()}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider system>
      <Avatar size={32} first="John" last="Appleseed" />
      <ThemeToggle />
    </ThemeProvider>
  );
}
```

## Public API

Root import:

```ts
import { Avatar, useTheme, ThemeProvider } from '@apple-pie/slice';
```

Subpath imports are also published:

- `@apple-pie/slice/uikit/*`
- `@apple-pie/slice/hooks`
- `@apple-pie/slice/hooks/*`
- `@apple-pie/slice/providers`
- `@apple-pie/slice/providers/*`
- `@apple-pie/slice/stores`
- `@apple-pie/slice/stores/*`
- `@apple-pie/slice/theme`
- `@apple-pie/slice/theme/colors`
- `@apple-pie/slice/theme/corners`
- `@apple-pie/slice/theme/elevations`
- `@apple-pie/slice/theme/type`
- `@apple-pie/slice/theme/themes`

## Components

- `Avatar`, `AvatarGroup`, `Badge`, `CheckBox`, `DivInput`, `Dot`, `DropDown`
- `EditorButtonBar`, `ErrorSummary`, `FlexDiv`, `Grouper`, `Icon`, `IconButton`
- `Logos`, `MessageInput`, `Overlay`, `Pager`, `ProgressIndicator`, `DoneCheck`
- `RadioButton`, `RadioButtonList`, `Slider`, `Spacer`, `Switch`, `TabBar`
- `TextField`, `TextArea`, `Tip`, `Toast`, `UIButton`, `UIButtonBar`
- `UICard`, `UIChip`, `UIFileIcon`, `UILabel`, `DocIcons`, `DraggablePanel`

## Hooks

- `useTheme`, `useObserveTheme`
- `useKeyboardShortcuts`
- `useDoubleClick`
- `useToolTip`
- `useLastUpdated`
- `useLocalStore`
- `useWindow`
- `useObserveResize`

## Stores (optional)

- `toast` store: `useToast`, `useToastActions`, `toastActions`, `getToast`
- `tip` store: `useTip`, `useTipActions`, `tipActions`, `getTip`

Example:

```ts
import { useToast, useToastActions } from '@apple-pie/slice/stores/toast';
```

## Theme exports

- Presets: `lightTheme`, `darkTheme`
- Color tokens: `light`, `dark`
- Elevation tokens: `elevations` / `Elevation`
- Types: `SliceTheme`, `Colors`, `Type`, `Corners`, `Elevations`

## Development

```bash
npm run dev               # Vite dev app
npm run storybook         # Storybook on :6006
npm run test              # Vitest tests
npm run benchmark         # Benchmarks with formatted report
npm run benchmark:raw     # Raw vitest benchmark output
npm run build             # Rollup + types + css copy
npm run lint              # Biome format + check
```

Benchmark details: `benchmarks/GUIDE.md`

Build architecture details: `devdocs/build-architecture.md`

## Build outputs

`npm run build` generates:

- `dist/esm` for ESM
- `dist/cjs` for CommonJS
- `dist/types` for `.d.ts`
- `dist/css` for shared utility css modules

## Notes

- Styling is CSS-module based and published with CSS side effects enabled (`"**/*.css"`).
- Storybook docs (`*.stories.*` and `src/stories/**`) are excluded from publishable type output.
- Named media query aliases are compiled via PostCSS custom media. Definitions live in `src/theme/breakpoints/custom-media.css` and can be used in CSS as `@media (--bp-tablet) { ... }`.
