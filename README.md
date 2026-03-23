# Slice (`@apple-pie/slice`)

Slice is a TypeScript-first React UI kit with theme tokens, utility hooks, optional Zustand stores, Storybook docs, and benchmark tooling.

## Beta and links

- This project is currently in **beta**. Until the official v1 release, breaking changes may be introduced without prior notice.
- Documentation and showcase: https://slice-uikit.com
- Repository: access is limited to authorized contributors/collaborators.

## What is included

- 30+ reusable UI components (inputs, buttons, navigation, overlays, feedback, layout, icons, upload UI, camera/stream UI)
- Theme system with light/dark presets and typed theme tokens
- React hooks for theme, window sizing, keyboard shortcuts, local storage, resize, and more
- Optional Zustand-powered stores (`tip`, `uploads`, `window`, `SSE`, `WS`)
- Utility functions and low-level objects such as `SSEConnection` and `WSConnection`
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
import { ThemeProvider, Avatar, Button, useTheme } from '@apple-pie/slice';

function ThemeToggle() {
  const theme = useTheme();
  return (
    <Button
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

- `@apple-pie/slice/components/*`
- `@apple-pie/slice/hooks`
- `@apple-pie/slice/hooks/*`
- `@apple-pie/slice/providers`
- `@apple-pie/slice/providers/*`
- `@apple-pie/slice/stores`
- `@apple-pie/slice/stores/*`
- `@apple-pie/slice/utils`
- `@apple-pie/slice/utils/objects`
- `@apple-pie/slice/workers/*`
- `@apple-pie/slice/theme`
- `@apple-pie/slice/theme/colors`
- `@apple-pie/slice/theme/corners`
- `@apple-pie/slice/theme/elevations`
- `@apple-pie/slice/theme/type`
- `@apple-pie/slice/theme/themes`

## Components

- `Avatar`, `AvatarGroup`, `Badge`, `CheckBox`, `DivInput`, `Dot`, `DropDown`
- `Camera`
- `ErrorSummary`, `FileIcon`, `FileList`, `FlexDiv`, `Grouper`, `Icon`, `IconButton`
- `PromptInput`, `Overlay`, `Pager`, `ProgressIndicator`, `DoneCheck`
- `RadioButton`, `RadioButtonList`, `Slider`, `Spacer`, `Switch`, `TabBar`
- `TextField`, `TextArea`, `Tip`, `Toast`, `Button`, `ButtonBar`
- `Chip`, `Label`, `DraggablePanel`, `UploadArea`

Example:

```tsx
import { useRef } from 'react';
import { Camera } from '@apple-pie/slice';
import type { CameraElement } from '@apple-pie/slice';

export function CameraExample() {
  const cameraRef = useRef<CameraElement | null>(null);

  return (
    <>
      <Camera
        ref={cameraRef}
        width={400}
        height={320}
        sessionSettings={{
          videoDeviceId: 'preferred-video-device-id',
          micDeviceId: 'preferred-mic-device-id',
        }}
      />
      <button onClick={() => cameraRef.current?.snapshot?.()}>
        Take Snapshot
      </button>
      <button onClick={() => cameraRef.current?.toggleVideo?.()}>
        Toggle Video
      </button>
    </>
  );
}
```

## Hooks

- `useTheme`, `useObserveTheme`
- `useKeyboardShortcuts`
- `useDoubleClick`
- `useToolTip`
- `useLastUpdated`
- `useLocalStore`
- `useWindow` with optional geolocation helpers (`geolocationSupported`, `location`, `locationError`, `gettingLocation`, `requestGeolocation`)
- `useObserveResize`

## Stores (optional)

- `tip` store: `useTip`, `useTipActions`, `tipActions`, `getTip`
- `SSE` store: `useSSEStore`, `useSSE`, `useMessage`, `useConnectionMessage`, `useConnectionClose`, `useIsConnected`
- `WS` store: `useWSStore`, `useWS`, `useMessage`, `useConnectionMessage`, `useConnectionClose`, `useIsConnected`
- `window` store: `useWindowStore`, atomic viewport/runtime hooks, imperative viewport helpers, and explicit location actions/selectors
- `uploads` store: `useUploadsStore`, `useUploads`, `useUploadsActions`, `createUploadsWorker`, `uploadsActions`

Uploads store example:

```tsx
import { UploadArea } from '@apple-pie/slice';
import {
  createUploadsWorker,
  useUploads,
  useUploadsActions,
  useUploadsWorkerStatus,
} from '@apple-pie/slice/stores/uploads';
import { useEffect, useRef } from 'react';

function UploadsExample() {
  const workerRef = useRef<Worker | null>(null);
  const uploads = useUploads();
  const workerStatus = useUploadsWorkerStatus();
  const actions = useUploadsActions();

  useEffect(() => {
    if (workerRef.current) return;
    workerRef.current = createUploadsWorker();
    actions.initialize({ uploadURL: '/api/uploads' }, workerRef.current);
  }, [actions]);

  return (
    <div>
      <UploadArea
        busy={workerStatus === 'busy'}
        files={uploads.map((upload) => ({
          id: upload.id,
          file: upload.file,
          progress: upload.progress,
          error: upload.error,
        }))}
        onUpload={(files) => actions.push(files)}
        showProgress={true}
        title={'Upload files'}
        message={'Drag and drop files here or click to upload'}
      />

      <div>worker: {workerStatus}</div>

      {uploads.map((upload) => (
        <div key={upload.id}>
          {upload.file.name} - {upload.status} - {upload.progress ?? 0}%
        </div>
      ))}
    </div>
  );
}
```

For consuming browser apps using a built worker asset, pass an explicit worker URL from your bundler:

```ts
import { createUploadsWorker, uploadsActions } from '@apple-pie/slice/stores/uploads';
import uploadsWorkerUrl from '@apple-pie/slice/workers/uploads/uploads?url';

const worker = createUploadsWorker(uploadsWorkerUrl);
uploadsActions.initialize({ uploadURL: '/api/uploads' }, worker);
```

This worker URL pattern assumes modern frontend tooling such as Vite or similar browser-focused bundlers.

## Theme exports

- Presets: `lightTheme`, `darkTheme`
- Color tokens: `light`, `dark`
- Elevation tokens: `elevations` / `Elevation`
- Types: `SliceTheme`, `Colors`, `Type`, `Corners`, `Elevations`

## Utilities

- Package utilities are published from `@apple-pie/slice/utils`
- Low-level utility objects such as `SSEConnection` and `WSConnection` are also published from `@apple-pie/slice/utils/objects`
- Internal utility source lives under `src/utils/functions/*`
- Shared utility CSS modules live under `src/utils/styling/*`

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

Build architecture details: `contributor-docs/build-architecture.md`

## Build outputs

`npm run build` generates:

- `dist/esm` for ESM
- `dist/cjs` for CommonJS
- `dist/types` for `.d.ts`
- `dist/css` for shared utility css modules

## Notes

- Styling is CSS-module based and published with CSS side effects enabled (`"**/*.css"`).
- Storybook docs (`*.stories.*` and `documentation/**`) are excluded from publishable type output.
- Named media query aliases are compiled via PostCSS custom media. Definitions live in `src/theme/breakpoints/custom-media.css` and can be used in CSS as `@media (--bp-tablet) { ... }`.
