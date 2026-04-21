# @apple-pie/slice — Portfolio Project Review

## Project Overview

**@apple-pie/slice** is a production-grade React UI library published to npm, featuring 40+ themed components, real-time communication primitives, browser storage abstractions, and media stream management. Built with TypeScript, it provides dual CJS/ESM builds, granular tree-shakeable exports, and comprehensive Storybook documentation.

**Live Documentation:** https://slice-uikit.com
**npm Package:** `@apple-pie/slice` (v0.1.34)
**GitHub:** https://github.com/uris/uikit

---

## 1. Hero / Project Headline

**Full-stack frontend SDK: Design language + Component library + Real-time communication infrastructure**

Built and maintained as a public npm package with support for both SSR and client-side rendering contexts.

```bash
npm install @apple-pie/slice react react-dom motion
```

**Key Links:**
- 📦 [npm package](https://www.npmjs.com/package/@apple-pie/slice)
- 📖 [Documentation site](https://slice-uikit.com) (Storybook)
- 🔧 Dual format builds (CJS + ESM)
- 🎨 98+ granular export paths for optimal tree-shaking

---

## 2. Project Visual

The deliverable IS the documentation site — a fully interactive Storybook deployment showcasing:
- Component playground with live code examples
- Theme customization interface
- Accessibility testing integration (a11y addon)
- Real-time API demonstrations (WebRTC, WebSocket, SSE)

**Screenshot opportunity:** The Storybook UI itself demonstrates the quality of the system.

---

## 3. Context & Problem Statement

**The Problem:**
Modern frontend applications need three distinct layers that are rarely unified:

1. **Design system** — Consistent visual language and theme tokens
2. **Component library** — Reusable UI primitives
3. **Infrastructure layer** — Real-time communication, media handling, browser storage

Most design systems stop at layers 1-2. Teams then build custom (often brittle) implementations of WebRTC, WebSocket management, IndexedDB wrappers, and media stream handling for each project.

**The Solution:**
A unified SDK that provides all three layers with a consistent API surface, eliminating the need to reinvent complex browser API abstractions while maintaining full SSR compatibility for Next.js/Remix applications.

---

## 4. Tech Stack

### Core Technologies
- **React 18/19** — SSR + client-side rendering support
- **TypeScript** — Strict mode, full type coverage
- **Motion (Framer Motion)** — Animation library integration
- **Zustand** — Optional peer dependency for global state

### Build & Publishing
- **Rollup** — Dual CJS/ESM builds with custom entry point generation
- **Terser** — Minification with JSDoc preservation
- **PostCSS** — CSS extraction with nested syntax, custom media queries
- **TypeScript Compiler** — .d.ts generation for 98+ export paths
- **npm** — Public package distribution

### Developer Experience
- **Storybook** — Documentation site and component playground
- **Biome** — Linting and formatting
- **Vitest** — Testing framework with browser support (Playwright)
- **Chromatic** — Visual regression testing integration (via addon)

### Testing & Quality
- **Vitest + Playwright** — Browser-based component testing
- **@vitest/coverage-v8** — Code coverage reporting
- **Benchmark suite** — Performance tracking across versions
- **Bundle analyzer** — Size visualization with gzip/brotli metrics

### DevOps
- **GitHub Actions** — CI/CD workflows
- **Docker** — Containerized development environment

---

## 5. Architecture & Key Design Decisions

### 5a. Package Architecture

#### Granular Export Strategy
98 export paths enable precise imports and optimal tree-shaking:

```typescript
// Main entry
import { Avatar, Button, ThemeProvider } from '@apple-pie/slice';

// Component-specific imports
import { IconButton } from '@apple-pie/slice/components/IconButton';

// Hook subpaths
import { useMicrophone } from '@apple-pie/slice/hooks/useMicrophone';

// Theme token subpaths
import { colors } from '@apple-pie/slice/theme/colors';
import { motion } from '@apple-pie/slice/theme/motion';

// Store singletons
import { useWebRTC } from '@apple-pie/slice/stores/WebRTC';

// Worker threads
import uploadWorker from '@apple-pie/slice/workers/uploads';

// Styles
import '@apple-pie/slice/styles.css';
```

**Why this matters:**
Most libraries force users to import everything through a single barrel file. This approach provides:
- Smaller bundle sizes (only import what you use)
- Faster IDE autocomplete (smaller module graphs)
- Clear dependency boundaries
- Better code splitting in bundlers

#### Dual-Format Build System
Custom Rollup configuration (`rollup.config.js:21-109`) dynamically generates 98+ entry points across:
- Components (40+ individual entries)
- Hooks (13+ individual entries)
- Theme subpaths (colors, corners, elevations, motion, type)
- Stores (11 Zustand store modules)
- Workers (background thread modules)

**Technical complexity:**
The build system maintains perfect alignment between:
- `package.json` exports map (98 entries)
- Generated `.d.ts` TypeScript definitions
- CJS and ESM output paths
- Chunk splitting strategy

#### Optional Peer Dependencies
Zustand is marked optional (`package.json:181-185`), allowing consumers to:
- Use components without global state management
- Opt into stores only when needed
- Reduce bundle size for simple use cases

**Design decision:**
Rather than bundling Zustand or making it required, the library gracefully degrades. Store modules are isolated to `@apple-pie/slice/stores/*`, so tree-shaking eliminates them entirely if unused.

---

### 5b. Component System

#### 40+ Components Across Categories

**Inputs & Controls:**
- Button, IconButton, ToggleButton, ButtonBar
- Textfield, TextArea, DivInput, PromptInput
- CheckBox, RadioButton, RadioButtonList, Switch
- Slider, Chip, Dropdown

**Layout & Structure:**
- FlexDiv, Spacer, Level, Grouper
- DraggablePanel, TabBar, Pager

**Media & Rich Content:**
- Avatar, AvatarGroup, Badge, Dot
- Camera, AudioBubble, FileIcon, FileList
- Icon, Label

**Feedback & Overlays:**
- Toast, Tip (tooltips), Modal, ModalController
- Overlay, Progress, ErrorSummary

**Upload Handling:**
- UploadArea (with worker-backed processing)

#### Theme Token System
Exported as consumable subpaths (`src/theme/`):

- **Colors** — Light/dark theme palettes with semantic naming
- **Corners** — Border radius scales
- **Elevations** — Shadow depth system
- **Motion** — Animation timing and easing curves
- **Type** — Typography scale and font settings

**SSR Compatibility:**
All components support server-side rendering (React 18+ RSC patterns). The `'use client'` directive is preserved via `rollup-preserve-directives` plugin.

---

### 5c. Platform Integration Layer ⭐

**This is the key differentiator.** Most UI libraries stop at components. Slice provides production-grade abstractions over complex browser APIs.

#### Real-Time Communication Classes

##### `WebRTCConnection` (`src/utils/objects/WebRTCConnection/`)
Abstraction over the notoriously complex WebRTC API:

**Features:**
- Peer connection management with automatic ICE negotiation
- Bidirectional audio/video (microphone, camera, screen share)
- RTCDataChannel management with typed event handlers
- Automatic volume control and audio element binding
- Track replacement without renegotiation (advanced pattern)
- Connection state tracking: `connected`, `audioConnected`, `videoConnected`, `dataConnected`

**Real-world use cases:**
Build Zoom-like video calls, voice chat, peer-to-peer data transfer, collaborative whiteboards.

```typescript
import { WebRTCConnection } from '@apple-pie/slice';

const connection = new WebRTCConnection({
  connectionUrl: 'wss://signaling.example.com',
  micStream: audioStream,
  audioElement: audioRef.current,
  autoPlayAudio: true,
  dataChannels: ['chat', 'events'],
  onRemoteVideoStream: (streams) => {
    // Handle incoming video
  },
});

await connection.initialize();
```

##### `WSConnection` (`src/utils/objects/WSConnection/`)
WebSocket wrapper with enterprise-grade reliability:

**Features:**
- Auto-reconnect with exponential backoff
- Configurable retry limits and intervals
- Keep-alive ping/pong mechanism
- Token-based authentication (static or async function)
- Manual close detection (prevents unwanted reconnects)
- **Unified message interface** — Type-discriminated unions for `message | open | close | error`

**Design pattern:**
Provides both standard mode (data-only callbacks) and unified mode (all events through single typed callback):

```typescript
import { WSConnection } from '@apple-pie/slice';

const ws = new WSConnection({
  url: 'wss://api.example.com',
  autoReconnect: true,
  reconnectAttempts: 5,
  reconnectFalloff: true,
  keepAlive: true,
  token: async () => await getAuthToken(),
  unifiedMessages: true, // Type-safe event discrimination
  onMessageCallback: (event) => {
    switch (event.type) {
      case 'message':
        // event.data is typed
        break;
      case 'open':
        // event.event is Event
        break;
      case 'close':
        // event.event is CloseEvent
        break;
    }
  },
});
```

##### `SSEConnection` (`src/utils/objects/SSEConnection/`)
Server-Sent Events with custom event type support:

**Features:**
- Type-safe custom event map with discriminated unions
- Unified callback pattern matching WebSocket API (consistency)
- Close event detection via custom events or message content
- Auto-parsing of JSON payloads with fallback to raw strings

**Type safety example:**

```typescript
interface MyEventMap {
  'user-joined': { userId: string; name: string };
  'message': { text: string; timestamp: number };
}

const sse = new SSEConnection<MyEventMap>({
  url: '/api/events',
  customEvents: [
    { name: 'user-joined', handler: (data) => {
      // data is typed as { userId: string; name: string }
    }},
  ],
});
```

#### Browser Storage Abstraction

##### `IndexedDB` (`src/utils/objects/IndexedDB/`)
Promise-based wrapper that eliminates IDBRequest callback hell:

**Features:**
- Generic type safety: `IndexedDB<T>`
- Full CRUD operations: `get`, `set`, `add`, `update`, `remove`, `clear`
- Automatic schema versioning and upgrade handling
- Transaction mode abstraction
- Connection lifecycle management

**Before (raw IndexedDB):**
```javascript
const request = indexedDB.open('myDB', 1);
request.onupgradeneeded = () => { /* setup */ };
request.onsuccess = () => {
  const db = request.result;
  const tx = db.transaction('store', 'readwrite');
  const store = tx.objectStore('store');
  const getRequest = store.get(key);
  getRequest.onsuccess = () => { /* finally got data */ };
};
```

**After (with Slice):**
```typescript
const db = new IndexedDB<User>('users', { key: 'id' });
await db.initialize();
const user = await db.get(userId);
```

#### Media Stream Management

##### `useMicrophone` Hook (`src/hooks/useMicrophone/`)
Complete microphone handling with Web Audio API processing:

**Features:**
- MediaStream permission flows
- **Dual stream architecture**: raw stream + gain-processed stream
- Web Audio API processing chain (AudioContext, GainNode, MediaStreamAudioDestinationNode)
- Device enumeration and hot-swapping
- Mute/unmute with volume control
- Input level metering
- Browser compatibility detection

**Technical depth:**
Maintains two separate `MediaStream` instances:
1. `micStream` — Raw browser microphone input
2. `processedMicStream` — Gain-adjusted output for downstream consumers (WebRTC, recording, etc.)

Uses `RefObject` instead of state to prevent re-render storms when stream tracks update.

```typescript
const {
  micStream,
  processedMicStream,
  microphones,
  isActive,
  muted,
  inputVolume,
  requestMicrophone,
  setInputVolume,
  toggleMute,
} = useMicrophone();
```

#### Multi-Store Coordination

##### `useBindWebRTC` Hook (`src/hooks/useBindWebRTC/`)
Orchestrates **three separate Zustand stores** with lifecycle management:

**Coordinated systems:**
1. **WebRTC store** — Connection registry
2. **Microphone store** — Media stream source
3. **Volume store** — Audio output level

**Complex concerns handled:**
- Connection ownership tracking (`ownsConnectionRef`) — Prevents multiple components from destroying shared connections
- Automatic cleanup on unmount
- Error boundary handling
- Stream synchronization (updates WebRTC when mic stream changes)
- Volume reactivity (updates WebRTC when global volume changes)

**Pattern:**
This hook shows deep understanding of React's lifecycle combined with imperative browser APIs. It bridges:
- Declarative React (functional components, hooks)
- Imperative WebRTC (connection objects, event handlers)
- Global state (Zustand stores)
- Cleanup semantics (prevent memory leaks)

---

### 5d. Worker-Backed Upload System ⭐

The uploads store (`src/stores/uploads/` + `src/workers/uploads/`) demonstrates **production-grade performance engineering** for real-world file handling.

#### Architecture

**Main Thread (Zustand Store):**
- Exposes React hooks: `useUploadsStore`, `useUploadActions`
- Sends commands to worker: `initialize`, `add-files`, `clear-uploads`
- Receives status updates: upload progress, worker busy/idle state

**Worker Thread (`UploadsWorker` class):**
- Queue management with concurrent upload limits (default: 5 simultaneous)
- File validation (size limits, MIME type filtering)
- XHR-based uploads with **granular progress tracking**
- Status broadcasting back to main thread (queued → uploading → completed/failed)

#### Why This Matters: User Experience

**The Problem:**
Uploading large files or file sets (e.g., 50 photos from a camera) blocks the JavaScript main thread during:
- File reading (`FileReader` operations)
- FormData construction
- Progress event handling
- Network I/O coordination

This causes:
- UI freezes (buttons don't respond, animations stutter)
- Delayed user interactions (typing in forms feels laggy)
- Poor perception of app quality

**The Solution:**
By running uploads in a **dedicated Web Worker thread**, the main thread remains free for:
- Rendering UI updates
- Handling user input (clicks, typing, scrolling)
- Running animations smoothly
- Processing other application logic

**Real-world comparison:**
This is the same pattern Dropbox, Google Drive, and other file sync applications use — the app stays responsive while uploads happen in the background.

#### Technical Features

**Queue Management** (`uploads-worker.ts:110-113`):
```typescript
private readonly queue: Map<string, Upload> = new Map();
private readonly active: Map<string, Upload> = new Map();
private readonly completed: Map<string, Upload> = new Map();
private readonly failed: Map<string, Upload> = new Map();
```

Four separate tracking maps enable:
- **Concurrent upload limits** — Process 5 files simultaneously, queue the rest
- **Progress reporting per file** — Each upload has individual status (0-100%)
- **Error isolation** — One failed upload doesn't stop the queue
- **Queue size limits** — Prevent memory exhaustion from massive batches

**Progress Tracking** (`uploads-worker.ts:291-296`):
```typescript
request.upload.addEventListener('progress', (event) => {
  if (!event.lengthComputable || event.total === 0) return;

  upload.progress = Math.round((event.loaded / event.total) * 100);
  this.updateUploadStatus(upload);
});
```

The worker listens to XHR upload progress events and **broadcasts updates to the main thread**, enabling real-time UI updates:
- Individual file progress bars
- Overall batch completion percentage
- Estimated time remaining (can be calculated from progress deltas)

**File Validation** (`uploads-worker.ts:204-216`):
Before uploading, the worker validates:
- **File size limits** — Reject files exceeding `maxFileSize` (default: 5MB)
- **MIME type filtering** — Only accept specified extensions/types
- **Queue capacity** — Enforce `maxQueueSize` to prevent memory issues

This prevents wasted network bandwidth and provides **immediate user feedback** (errors appear instantly, not after upload fails).

**HTTP Status Mapping** (`uploads-worker.ts:298-328`):
The worker maps HTTP status codes to user-friendly error enums:
- `401` → `NotAuthorized` (re-authenticate user)
- `413` → `TooLarge` (file exceeds server limit)
- `415` → `MediaNotSupported` (wrong file type)
- `500` → `InternalError` (server-side problem)

This enables **actionable error UI** — instead of "Upload failed", show "File too large. Maximum size is 10MB."

#### Concurrent Upload Strategy

**Automatic queue processing** (`uploads-worker.ts:186-194`):
```typescript
while (
  this.active.size < this.maxConcurrentUploads &&
  this.queue.size > 0
) {
  const nextUpload = this.queue.values().next().value;
  if (!nextUpload) break;

  void this.startUpload(nextUpload);
}
```

When a user drops 20 files:
1. First 5 start uploading immediately
2. Next 15 enter the queue
3. As each upload completes, the next queued file starts automatically
4. The UI shows:
   - 5 progress bars (active uploads)
   - 15 "pending" badges (queued)
   - Real-time updates as queue drains

**Worker status tracking** (`uploads-worker.ts:75-78`):
```typescript
enum WorkerStatus {
  Idle = 'idle',
  Busy = 'busy',
}
```

The main thread can:
- Show a global "uploading..." indicator when `status === 'busy'`
- Enable/disable navigation when uploads are active
- Warn users before closing the tab ("Uploads in progress will be lost")

#### Performance Impact

**Without worker thread:**
- Large file uploads freeze UI for 500ms-2s per file
- User interactions feel sluggish during batch uploads
- Animations drop frames
- Main thread CPU maxes out

**With worker thread:**
- UI stays at 60fps throughout upload process
- User can navigate, edit forms, trigger actions normally
- CPU load distributed across threads
- Only main thread task: updating progress UI (lightweight)

This is **crucial for mobile devices** where CPU is limited. A single-threaded upload can make the entire app unusable.

#### Real-World Use Cases Enabled

- **Photo gallery uploads** — Drop 100 photos, app stays responsive
- **Document management** — Bulk resume uploads for HR systems
- **Media production** — Video file uploads while editing metadata
- **Backup tools** — Background sync like Dropbox
- **Form submissions** — Multi-file attachments without UI lockup

---

### 5e. Zustand Store Architecture

**11 global state modules** wrapping complex systems:

#### Infrastructure Stores
- **`stores/WebRTC/`** — Multi-connection WebRTC registry with named connections
- **`stores/WS/`** — WebSocket connection pool with unified message events
- **`stores/SSE/`** — Server-Sent Events connection manager
- **`stores/LocalDB/`** — IndexedDB wrapper with React hooks (`useLocalDB`, `useLocalDBValues`)
- **`stores/microphone/`** — Global microphone permission and stream state
- **`stores/volume/`** — Audio output volume management
- **`stores/uploads/`** — Worker-backed file upload queue

#### UI State Stores
- **`stores/window/`** — Window dimensions and scroll position
- **`stores/modal/`** — Global modal stack
- **`stores/toast/`** — Toast notification queue
- **`stores/tip/`** — Tooltip positioning state

**Design philosophy:**
These stores follow a **singleton pattern** — one global instance per system. This prevents:
- Multiple WebRTC connections to the same endpoint
- Duplicate microphone permission prompts
- Conflicting toast notifications
- Modal z-index battles

Each store exports:
1. The store hook (`useWebRTC`, `useWS`, etc.)
2. Selector hooks for specific state slices (`useIsConnected`, `useLastMessage`)
3. Action hooks (`useWebRTCActions`, `useWSActions`)
4. Standalone action functions (for use outside React)

---

### 5e. Worker-Backed Processing

**Upload worker** (`src/workers/uploads/`) handles file processing in background threads:

**Why workers matter:**
Large file uploads (images, videos) block the main thread during:
- File reading (`FileReader`)
- Hashing (for deduplication)
- Image resizing/compression
- Chunking for resumable uploads

By offloading to Web Workers, the UI remains responsive during heavy I/O.

---

## 6. Challenges & What I Learned

### 1. WebRTC State Synchronization in React

**Problem:**
React's re-render model conflicts with WebRTC's stateful connection objects. A naive implementation causes:
- Peer connection renegotiation on every render
- ICE candidate gathering storms
- Memory leaks from unclosed connections

**Solution:**
`useBindWebRTC` uses the **ownership pattern** (`src/hooks/useBindWebRTC/useBindWebRTC.ts:56`):

```typescript
const ownsConnectionRef = useRef(false);

const bind = async () => {
  addConnection(connectionName, options);
  ownsConnectionRef.current = true; // This component owns cleanup
};

useEffect(() => {
  return () => {
    if (!ownsConnectionRef.current) return; // Don't clean up if we don't own it
    removeConnection(connectionName);
  };
}, []);
```

This prevents multiple components from destroying a shared connection while ensuring proper cleanup when the owning component unmounts.

---

### 2. Web Audio API Lifecycle in React

**Problem:**
`AudioContext`, `GainNode`, and `MediaStreamAudioDestinationNode` are **imperative objects** that must persist across renders. Creating new nodes on each render causes:
- Audio crackling/dropouts
- Memory leaks (nodes aren't garbage collected)
- Multiple processing chains running simultaneously

**Solution:**
`useMicrophone` (`src/hooks/useMicrophone/useMicrophone.ts:72-80`) uses `useRef` for stable instances:

```typescript
const audioContextRef = useRef<AudioContext | null>(null);
const gainNodeRef = useRef<GainNode | null>(null);
const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);

// Only create once
if (!audioContextRef.current) {
  audioContextRef.current = new AudioContext();
  gainNodeRef.current = audioContextRef.current.createGain();
  // ... connect nodes
}
```

**Effect cleanup** properly disconnects and closes nodes:

```typescript
useEffect(() => {
  return () => {
    gainNodeRef.current?.disconnect();
    sourceNodeRef.current?.disconnect();
    audioContextRef.current?.close();
  };
}, []);
```

---

### 3. Dual-Format Build Complexity

**Problem:**
Publishing a library that works in both CommonJS (Next.js, Jest) and ESM (Vite, modern bundlers) environments requires:
- Separate output directories (`dist/cjs/`, `dist/esm/`)
- Different file extensions (`.js` vs `.mjs`)
- Preserved React directives (`'use client'` for RSC)
- Aligned TypeScript definitions (`.d.ts` must match both formats)

**Solution:**
Custom Rollup config (`rollup.config.js:111-145`) with:
- Dynamic entry point generation (scans `src/` directories)
- Format-specific file naming (`entryFileName` function)
- Directive preservation plugin (`rollup-preserve-directives`)
- Post-build TypeScript compilation with custom tsconfig

**Why this was hard:**
The `package.json` exports map has **98 entries** that must perfectly align with generated files. One mismatch breaks imports for consumers. Automated testing via `npm pack` was essential.

---

### 4. Type-Safe Event Discrimination

**Problem:**
WebSocket and SSE emit different event types (`message`, `open`, `close`, `error`), but TypeScript can't infer which type a callback receives without runtime checks.

**Solution:**
**Discriminated unions** with a `type` field:

```typescript
type UnifiedMessageEvent<TMessage> =
  | { type: 'message'; data: TMessage; event: MessageEvent }
  | { type: 'open'; event: Event }
  | { type: 'close'; event: CloseEvent }
  | { type: 'error'; event: ErrorEvent };

// TypeScript narrows types based on the discriminator
onMessageCallback: (event) => {
  if (event.type === 'message') {
    event.data // TypeScript knows this exists
    event.event // TypeScript knows this is MessageEvent
  }
}
```

This pattern provides **exhaustive checking** — if you forget to handle a case, TypeScript errors.

---

### 5. IndexedDB Promise Wrapper Design

**Problem:**
IndexedDB uses a request-based callback API with multiple success/error paths:
- `open` request can trigger `onupgradeneeded`, `onsuccess`, `onerror`
- Transactions can succeed but object store operations can fail
- Version conflicts require retry logic

**Solution:**
`IndexedDB.initialize()` (`src/utils/objects/IndexedDB/IndexedDB.tsx:27-79`) wraps the entire flow in a single `Promise`:

```typescript
this.db = await new Promise<IDBDatabase>((resolve, reject) => {
  const request = indexedDB.open(this.databaseName, this.version);
  let settled = false;

  const rejectOnce = (error: Error) => {
    if (settled) return;
    settled = true;
    reject(error);
  };

  request.onerror = () => rejectOnce(request.error);
  request.onupgradeneeded = () => { /* create schema */ };
  request.onsuccess = () => resolve(request.result);
});
```

The `settled` flag prevents race conditions where both `onsuccess` and `onerror` fire (rare but possible in some browsers).

---

### 6. Granular Exports and Tree-Shaking

**Problem:**
A single barrel export (`index.ts` re-exporting everything) forces bundlers to include the entire library even if you only use one component.

**Solution:**
98 explicit `package.json` exports entries:

```json
{
  "exports": {
    "./components/Button": {
      "types": "./dist/types/components/Button/index.d.ts",
      "import": "./dist/esm/components/Button/index.mjs",
      "require": "./dist/cjs/components/Button/index.js"
    }
    // ... 97 more
  }
}
```

**Tradeoff:**
This required building custom Rollup logic to generate all entry points dynamically (`rollup.config.js:21-109`). The build time is longer, but consumer bundle sizes are dramatically smaller.

---

## 7. Impact & Metrics

### Package Metrics
- **Package version:** v0.1.34 (active development, pre-1.0 beta)
- **Components:** 40+
- **Custom hooks:** 13+
- **Zustand stores:** 11
- **Utility classes:** 6 (WebRTC, WS, SSE, IndexedDB, AudioVisualizer, MdBuffer)
- **Export paths:** 98 granular entries
- **Real-time protocols:** 3 (WebRTC, WebSocket, SSE)

### Code Quality
- **TypeScript strict mode:** ✅ Full type coverage
- **Test coverage:** Vitest with browser testing (Playwright)
- **Bundle analysis:** Automated size reports with gzip/brotli metrics (`reports/package-size-visualizer.html`)
- **Benchmarks:** Performance tracking suite for regression detection
- **Accessibility:** Storybook a11y addon integration

### Build System
- **Build formats:** CJS + ESM dual output
- **Build time optimizations:** Terser with configurable minification, JSDoc preservation
- **CSS handling:** Extracted stylesheet + CSS modules for typography and flexbox utilities
- **Asset handling:** SVGR for SVG-as-components, URL plugin for image assets

### Developer Experience
- **Documentation:** Comprehensive Storybook site with live examples
- **Contributor docs:** `CONTRIBUTING.md`, `contributor-docs/build-architecture.md`
- **Formatting:** Automated via Biome
- **Local development:** Docker support for consistent environments
- **Scripts:** Dedicated commands for `lint`, `test`, `benchmark`, `build`, `storybook`

---

## 8. Your Role

**Sole author and maintainer** of the entire system:

- **Design & architecture** — Component API design, store patterns, class abstractions
- **Implementation** — All code across components, hooks, stores, utilities
- **Build engineering** — Rollup configuration, dual-format publishing, npm lifecycle
- **Documentation** — Storybook stories, MDX docs, contributor guides
- **DevOps** — GitHub workflows, Docker setup, npm publishing pipeline
- **Testing** — Vitest test suites, benchmark infrastructure
- **Maintenance** — Ongoing version updates, dependency management (34 releases to date)

---

## 9. Open Source Maintenance

Active maintenance demonstrated through:

- **Versioning discipline:** v0.1.34 shows iterative development with semantic versioning
- **Contributor guidelines:** Formal `CONTRIBUTING.md` with code standards
- **Architecture documentation:** `contributor-docs/build-architecture.md` for onboarding
- **Benchmark tracking:** Performance regression detection across versions
- **Code quality tooling:** Pre-commit hooks, Biome formatting, TypeScript strict mode
- **Docker containerization:** Reproducible development environments
- **GitHub workflows:** Automated CI/CD for testing and deployment

---

## 10. What This Project Demonstrates

### Technical Breadth
- **UI engineering:** Component systems, theming, animation
- **Platform engineering:** Browser API abstractions, worker threads
- **Real-time systems:** WebRTC, WebSocket, SSE protocols
- **State management:** Zustand architecture, multi-store coordination
- **TypeScript mastery:** Generics, discriminated unions, mapped types, conditional types
- **Build tooling:** Rollup, PostCSS, TypeScript compiler configuration
- **Testing:** Unit, integration, browser, performance benchmarking

### System Design Skills
- **Separation of concerns:** Framework-agnostic utilities wrapped in React-specific hooks
- **API ergonomics:** Consistent patterns across WS/SSE/WebRTC (unified events)
- **Performance optimization:** Tree-shaking via granular exports, worker offloading
- **Developer experience:** Typed generics, exhaustive error handling, clear documentation

### Production Readiness
- **npm publishing lifecycle:** Proper versioning, peer dependencies, exports maps
- **SSR compatibility:** React 18/19 RSC support, directive preservation
- **Accessibility:** Storybook a11y integration, semantic HTML
- **Bundle size awareness:** Visualizer reports, optional dependencies, code splitting

---

## 11. Use Cases Enabled

Applications you can build with this library:

### Real-Time Communication
- Video conferencing (Zoom-like)
- Voice chat rooms (Discord-like)
- Peer-to-peer file sharing
- Collaborative whiteboards
- Live streaming with chat

### Data-Intensive UIs
- Real-time dashboards (WebSocket feeds)
- Live notifications (SSE streams)
- Offline-first applications (IndexedDB)
- Progressive Web Apps with local caching

### Media Applications
- Podcast recording interfaces
- Audio transcription tools
- Voice note capture
- Camera/video recording
- Screen sharing applications

### AI/LLM Interfaces
- Streaming chat UIs (Markdown buffer for partial responses)
- Voice-to-text pipelines
- Real-time model inference displays

---

## Installation & Quick Start

```bash
npm install @apple-pie/slice react react-dom motion
```

Optional store integration:
```bash
npm install zustand
```

### Basic Usage

```tsx
import '@apple-pie/slice/styles.css';
import { Avatar, Button, ThemeProvider, useTheme } from '@apple-pie/slice';

function ThemeToggle() {
  const theme = useTheme();
  return (
    <Button
      label={theme.isDark ? 'Light Mode' : 'Dark Mode'}
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

### Advanced: WebRTC Voice Chat

```tsx
import { useBindWebRTC } from '@apple-pie/slice/hooks/useBindWebRTC';
import { useMicrophone } from '@apple-pie/slice/hooks/useMicrophone';

function VoiceChat() {
  const { requestMicrophone, isActive } = useMicrophone();
  const { bind, unbind, bound, error } = useBindWebRTC({
    connectionName: 'voice-chat',
    connectionUrl: 'wss://signaling.example.com',
  });

  return (
    <div>
      <button onClick={requestMicrophone} disabled={isActive}>
        Enable Microphone
      </button>
      <button onClick={bind} disabled={!isActive || bound}>
        Join Call
      </button>
      <button onClick={unbind} disabled={!bound}>
        Leave Call
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

---

## Links & Resources

- **Documentation:** https://slice-uikit.com
- **npm Package:** https://www.npmjs.com/package/@apple-pie/slice
- **GitHub Repository:** https://github.com/uris/uikit
- **Contributing Guide:** [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Architecture Docs:** [contributor-docs/build-architecture.md](./contributor-docs/build-architecture.md)

---

## Positioning for Recruiters

This project demonstrates capabilities expected at **senior/staff frontend engineer** levels:

✅ **Can build reusable infrastructure** (not just consume it)
✅ **Understands complex browser APIs** (WebRTC, Web Audio, IndexedDB)
✅ **Designs type-safe abstractions** (generics, discriminated unions)
✅ **Manages build complexity** (dual-format publishing, 98 export paths)
✅ **Writes production-ready code** (error handling, cleanup, SSR compatibility)
✅ **Documents and maintains open source** (Storybook, contributor guides, versioning)

**Most candidates can use WebRTC. This project shows the ability to abstract it into a reusable system.**
