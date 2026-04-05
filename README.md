# Slice (`@apple-pie/slice`)

Slice is a TypeScript-first React UI kit with typed theme tokens, composable components, hooks, optional Zustand stores, worker-backed uploads, Storybook documentation, and benchmark tooling.

The package is currently in beta. Until `1.0.0`, breaking API changes may still happen.

Docs and showcase: https://slice-uikit.com

## Installation Test

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

`ThemeProvider` is the default theme bootstrap for the library. It sets the active `data-slice-theme` value on the document root, renders a `data-slice-theme-scope` wrapper, and pulls in the packaged theme CSS token files used by components and Storybook. When `global` is enabled, it also applies the active theme's `core-surface-primary` color to the root document element and `document.body` backgrounds. In Safari, this also drives the browser header color.

## Modal System

Slice includes a presentational `Modal`, a `ModalController` for global rendering and overlay management, and an optional Zustand `ModalStore` for imperative `show`, `hide`, and promise-based modal flows.

```tsx
import { Button, FlexDiv, Modal, ModalController } from '@apple-pie/slice';
import { useModalActions } from '@apple-pie/slice/stores/modal';
import { useRef } from 'react';

export function ConfirmExample() {
	const actions = useModalActions();
	const boundsRef = useRef<HTMLDivElement>(null);

	const openModal = async () => {
		try {
			const result = await actions.modalResponse<'yes' | 'no'>({
				component: Modal,
				props: {
					title: 'Continue?',
					children: 'Are you sure you want to continue?',
					actions: [
						{ id: 'no', label: 'No', value: 'no' },
						{ id: 'yes', label: 'Yes', value: 'yes', primary: true },
					],
				},
			});
			console.log(result);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<FlexDiv ref={boundsRef} height={320} justify="center" align="center">
			<Button onClick={openModal}>Open Modal</Button>
			<ModalController dragConstraintsRef={boundsRef} />
		</FlexDiv>
	);
}
```

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
import { ModalController } from '@apple-pie/slice/components/ModalController';
import { ThemeProvider } from '@apple-pie/slice/providers/ThemeProvider';
import { useModalActions } from '@apple-pie/slice/stores/modal';
import { useUploadsActions } from '@apple-pie/slice/stores/uploads';
import { lightTheme } from '@apple-pie/slice/theme/themes';
import { IndexedDB } from '@apple-pie/slice/utils/objects';
```

## What’s Included

- 35+ exported React UI components covering input, feedback, modal, overlay, media, layout, and upload flows
- Theme tokens and presets for colors, corners, elevations, motion, typography, and full light/dark themes
- Exported React hooks for theme state, resize observation, keyboard shortcuts, local storage, audio, microphone, tooltips, and window helpers
- Optional Zustand stores for `LocalDB`, `modal`, `microphone`, `SSE`, `WS`, `tip`, `toast`, `uploads`, `volume`, and `window`
- Worker-backed uploads via `@apple-pie/slice/workers/uploads`
- Utility functions plus low-level `IndexedDB`, `SSEConnection`, and `WSConnection` helpers

## Exported Components

Top-level component exports currently include:

- `AudioBubble`
- `Avatar`
- `AvatarGroup`
- `Badge`
- `Button`
- `ButtonBar`
- `Camera`
- `CheckBox`
- `Chip`
- `DivInput`
- `DoneCheck`
- `Dot`
- `DraggablePanel`
- `DropDown`
- `ErrorSummary`
- `FileIcon`
- `FlexDiv`
- `Grouper`
- `Icon`
- `IconButton`
- `Label`
- `Modal`
- `ModalController`
- `Overlay`
- `Pager`
- `ProgressIndicator`
- `PromptInput`
- `RadioButton`
- `RadioButtonList`
- `Slider`
- `Spacer`
- `Switch`
- `TabBar`
- `TextArea`
- `TextField`
- `Tip`
- `Toast`
- `ToggleButton`
- `UploadArea`

Supporting exports also include:

- `ThemeProvider`
- `ToastType`
- `FileIconNames`
- `SliceIcons`
- `LabelBackground`

## Exported Hooks

Top-level hook exports currently include:

- `useAudioRecorder`
- `useDoubleClick`
- `useKeyboardShortcuts`
- `useLastUpdated`
- `useLocalStore`
- `useMDStreamBuffer`
- `useMicrophone`
- `useObserveResize`
- `useObserveTheme`
- `useTheme`
- `useToolTip`
- `useWindow`

Type exports alongside hooks include:

- `KeyboardShortcut`
- `KeyboardShortcuts`
- `MicOption`
- `UseMicrophoneReturn`
- `WindowGeolocation`
- `WindowGeolocationError`
- `BreakPoints`

## Exported Stores

Store subpaths currently include:

- `@apple-pie/slice/stores/LocalDB`
- `@apple-pie/slice/stores/modal`
- `@apple-pie/slice/stores/microphone`
- `@apple-pie/slice/stores/SSE`
- `@apple-pie/slice/stores/WS`
- `@apple-pie/slice/stores/tip`
- `@apple-pie/slice/stores/toast`
- `@apple-pie/slice/stores/uploads`
- `@apple-pie/slice/stores/volume`
- `@apple-pie/slice/stores/window`

The shared stores barrel is also available at:

- `@apple-pie/slice/stores`

## Theme Exports

Theme exports currently include:

- `light`
- `dark`
- `lightTheme`
- `darkTheme`
- `motion`
- `elevations`
- `Elevation`

Type exports alongside theme values include:

- `SliceTheme`
- `Colors`
- `Corners`
- `Type`
- `Elevations`

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

## Site Deployment

The public `slice-uikit.com` site is deployed as a static Storybook build served from Docker with nginx.

Production image build:

```bash
docker build -t slice-uikit-site .
```

Local container run:

```bash
docker run --rm -p 8090:80 slice-uikit-site
```

The GitHub Actions workflow at [`.github/workflows/deploy-site.yml`](./.github/workflows/deploy-site.yml) deploys using the same SSH-on-VM pattern as the existing website project: it connects to the VM, pulls or clones the repo, then rebuilds the `uikit` service from the shared `~/projects/docker-compose.yml` file on the VM.

Configure these repository secrets before enabling it:

- `VM_HOST`
- `VM_USER`
- `SSH_PRIVATE_KEY`

## Contributors

Contribution setup and workflow: [CONTRIBUTING.md](./CONTRIBUTING.md)

Build and publish architecture details: [contributor-docs/build-architecture.md](./contributor-docs/build-architecture.md)
