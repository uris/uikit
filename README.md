# Slice (`@apple-pie/slice`)

Slice is a TypeScript-first React UI kit with typed theme tokens, composable components, hooks, optional Zustand stores, worker-backed uploads, Storybook documentation, and benchmark tooling.

The package is currently in beta. Until `1.0.0`, breaking API changes may still happen.

Docs and showcase: https://slice-uikit.com

## Installation

```bash
npm install @apple-pie/slice
```

Required peer dependencies:

```bash
npm install react react-dom motion
```

Optional peer dependency for store APIs:

```bash
npm install zustand
```

## Quick Start

```tsx
import { Avatar, Button, ThemeProvider, useTheme } from '@apple-pie/slice';

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
		<ThemeProvider system global>
			<Avatar size={32} first="John" last="Appleseed" />
			<ThemeToggle />
		</ThemeProvider>
	);
}
```

`ThemeProvider` is the default theme bootstrap for the library. It sets the active `data-slice-theme` value on the document root, renders a `data-slice-theme-scope` wrapper, and pulls in the packaged theme CSS token files used by components and Storybook. When `global` is enabled, it also applies the active theme's `core-surface-primary` color to the root document element and `document.body` backgrounds.

## Package Surface

Primary entrypoint:

```ts
import { Avatar, ThemeProvider, useTheme } from '@apple-pie/slice';
```

Published subpaths:

- `@apple-pie/slice/components/*`
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
- `@apple-pie/slice/theme/motion`
- `@apple-pie/slice/theme/type`
- `@apple-pie/slice/theme/themes`
- `@apple-pie/slice/utils`
- `@apple-pie/slice/utils/objects`
- `@apple-pie/slice/workers/*`

Example subpath imports:

```ts
import { Avatar } from '@apple-pie/slice/components/Avatar';
import { useTheme } from '@apple-pie/slice/hooks/useTheme';
import { ThemeProvider } from '@apple-pie/slice/providers/ThemeProvider';
import { useUploadsActions } from '@apple-pie/slice/stores/uploads';
import { lightTheme } from '@apple-pie/slice/theme/themes';
import { IndexedDB } from '@apple-pie/slice/utils/objects';
```

## What’s Included

- 30+ React components covering inputs, navigation, overlays, feedback, media, layout, upload, and utility UI
- Theme tokens and presets for colors, corners, elevations, motion, typography, and full light/dark themes
- React hooks for theme state, resize observation, keyboard shortcuts, local storage, double-click, tooltips, and window helpers
- Optional Zustand stores for `LocalDB`, `SSE`, `WS`, `tip`, `toast`, `uploads`, and `window`
- Worker-backed uploads via `@apple-pie/slice/workers/uploads`
- Utility functions plus low-level `IndexedDB`, `SSEConnection`, and `WSConnection` helpers

## Upload Worker Example

```tsx
import { useEffect, useRef } from 'react';
import { UploadArea } from '@apple-pie/slice';
import {
	createUploadsWorker,
	useUploads,
	useUploadsActions,
	useUploadsWorkerStatus,
} from '@apple-pie/slice/stores/uploads';

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
		</div>
	);
}
```

If your app needs an explicit worker URL, import the built worker asset from the worker subpath:

```ts
import { createUploadsWorker, uploadsActions } from '@apple-pie/slice/stores/uploads';
import uploadsWorkerUrl from '@apple-pie/slice/workers/uploads/uploads?url';

const worker = createUploadsWorker(uploadsWorkerUrl);
uploadsActions.initialize({ uploadURL: '/api/uploads' }, worker);
```

## Development

```bash
npm run dev
npm run storybook
npm run test
npm run benchmark
npm run build
npm run build:min
npm run lint
```

`npm run build` produces:

- CommonJS in `dist/cjs`
- ESM in `dist/esm`
- type declarations in `dist/types`
- shared CSS modules in `dist/css`

## Contributors

Contribution setup and workflow: [CONTRIBUTING.md](./CONTRIBUTING.md)

Build and publish architecture details: [contributor-docs/build-architecture.md](./contributor-docs/build-architecture.md)
