# Src Organization And Core Comments Plan

## Goal

Standardize the internal structure of components, hooks, providers, and stores in `src` so the core logic reads in the same order across files:

1. Imports
2. Static helpers and constants
3. Component or hook signature
4. Theme access with `useTheme()` where applicable
5. Props destructuring with default values
6. DOM attribute extraction
7. Refs
8. State
9. Derived values
10. Effects
11. Event handlers and actions
12. Style-related computations
13. Class name composition
14. Debug hooks
15. Render / return

This matches the patterns already present in files such as `Button`, `Avatar`, `TextField`, `Icon`, `Overlay`, and `FlexDiv`, but makes the order explicit and consistent.

## Scope

Apply this first to:

- `src/components/**/*.tsx`
- `src/hooks/**/*.ts`
- `src/providers/**/*.tsx`

Apply later if useful to:

- `src/stores/**/*.ts`
- `src/utils/**/*.ts`

## Canonical File Order

Use this order for React components.

### 1. Imports

Group imports in this order:

- React and external libraries
- hooks
- utils
- sibling components
- CSS modules
- local types

Example:

```tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../../hooks';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { setStyle } from '../../utils/functions/misc';
import { Icon } from '../Icon';
import css from './Component.module.css';
import type { ComponentProps } from './_types';
```

### 2. Static Helpers And Constants

Place pure helper functions, config objects, and motion constants above the component when they do not depend on props or state.

Use this for items like:

- size normalization helpers
- icon maps
- fixed animation configs
- prop-independent style translators

This is already a good fit for patterns like `FlexDiv` helper functions.

### 3. Component Signature

Keep the component wrapper near the top:

- `React.memo(...)`
- `forwardRef(...)`
- plain `export function ...`

### 4. Theme Access

If the component depends on theme colors, type styles, or dark-mode branching, initialize `useTheme()` immediately inside the component before props destructuring.

Example:

```tsx
const theme = useTheme();
```

Use this only where theme values are actually consumed. Do not add it to components that only use CSS variables and have no theme-dependent branching.

### 5. Props Destructuring With Defaults

Keep all defaults together in one block. This is the main readability anchor.

Rules:

- Put required props first
- Then behavioral props
- Then appearance props
- Then callback props
- End with `...divAttributes` or equivalent spread
- Prefer direct default values over later fallback reassignment

Suggested order inside props:

1. content props
2. controlled value props
3. behavioral toggles
4. theme or appearance props
5. motion props
6. callbacks
7. DOM passthrough

### 6. DOM Attribute Extraction

Immediately normalize passthrough props after destructuring.

Example:

```tsx
const { id: divId, className, style, ...rest } = divAttributes;
const divStyle = style ?? ({} as React.CSSProperties);
const divClass = className ? ` ${className}` : '';
```

### 7. Refs

Declare refs before state when they support lifecycle or event logic.

Examples:

- DOM refs
- imperative handle refs
- timer refs
- observer refs

### 8. State

Group all `useState` calls together.

Recommended order:

1. controlled mirror state
2. UI state
3. async or transient state

### 9. Derived Values

Use `useMemo` or direct constants for values derived from props, theme, state, or refs.

Typical items:

- `show`
- `initials`
- resolved icon variants
- resolved status values
- display text

### 10. Effects

Group `useEffect` calls together and order them by responsibility:

1. prop-to-state sync
2. DOM sync
3. subscriptions and listeners
4. cleanup-sensitive effects

### 11. Event Handlers And Actions

Group `useCallback` blocks together after effects.

Typical items:

- click handlers
- blur or focus handlers
- keyboard handlers
- clear and submit actions
- toggle helpers

This is the section where the component behavior should be most readable without scrolling into styling logic.

### 12. Style-Related Computations

Keep all style resolution together. This is the section you specifically called out, and it should be consistently grouped.

Recommended order:

1. primitive style resolvers
2. theme-derived style values
3. visual mode variants
4. CSS variable maps
5. inline style objects

Typical labels:

- `// resolve color tokens`
- `// resolve variant styles`
- `// compose css vars`

Examples from the current codebase:

- `Avatar`: `avatarVars`
- `Toast`: `defaultPadding`, color scheme, css vars, class names
- `TextField`: background, border, box-shadow, text color, css vars
- `Button`: destructive colors, variant styles, sizing styles

### 13. Class Name Composition

Keep class name composition after style calculations and before debug or render.

Examples:

```tsx
const classNames = useMemo(() => {
	return `${css.wrapper}${divClass}`;
}, [divClass]);
```

If a class string is trivial, a direct string is fine. Use `useMemo` only when the file already follows that pattern or the composition is non-trivial.

### 14. Debug Hooks

Keep render tracking isolated near the end:

```tsx
/* START.DEBUG */
useTrackRenders(props, 'ComponentName');
/* END.DEBUG */
```

If the debug block is intentionally disabled, keep the wrapper comments intact for consistency.

### 15. Render / Return

The JSX should mostly read as assembly, not business logic.

Avoid:

- large inline ternaries for style logic
- repeated fallback chains inside JSX
- event handlers defined inline when they contain logic

## Commenting Rules For Core Sections

Comments should label intent, not narrate syntax.

Good section comments:

- `// sync external value into local state`
- `// resolve button colors for each visual variant`
- `// compose css custom properties for the wrapper`
- `// handle enter key submission`

Avoid low-value comments:

- `// set state`
- `// memo useMemo`
- `// render div`

Use comments mainly for:

- effect purpose
- non-obvious event flows
- style-resolution blocks
- accessibility decisions
- debug-only sections

## Hook File Order

For hooks such as `useTheme`, `useObserveTheme`, `useWindow`, and similar files, use this order:

1. imports
2. shared helpers and constants
3. hook signature
4. refs
5. state
6. derived values
7. effects
8. exposed callbacks
9. returned API object

For `useTheme`, specifically keep:

1. observed current theme
2. theme mutation callbacks like `set` and `toggle`
3. derived flags like `isDark`
4. returned theme API grouped by purpose

## Provider File Order

For providers such as `ThemeProvider`:

1. imports
2. local prop types
3. file-level constants
4. provider signature
5. props destructuring
6. theme or environment setup
7. effects
8. return

`ThemeProvider.tsx` is a strong candidate for cleanup because its file-level media query setup and effect logic are already simple enough to standardize quickly.

## Recommended Rollout

### Phase 1: Define The Standard

Create and follow a single ordering rule for all React files in `src`.

Target first:

- `src/hooks/useTheme/useTheme.tsx`
- `src/providers/ThemeProvider.tsx`
- 3 to 5 representative components:
  - `src/components/Button/Button.tsx`
  - `src/components/Textfield/TextField.tsx`
  - `src/components/Avatar/Avatar.tsx`
  - `src/components/Icon/Icon.tsx`
  - `src/components/Overlay/Overlay.tsx`

Reason:

- they cover theme access, event handlers, refs, effects, css vars, and class composition

### Phase 2: Apply To Small And Medium Components

Refactor simpler components first to make the pattern stick:

- `Badge`
- `Card`
- `Dot`
- `Pager`
- `Switch`
- `AvatarGroup`
- `IconButton`
- `Label`

Goal:

- normalize section order
- add or tighten section comments
- keep behavior unchanged

### Phase 3: Apply To Complex Interactive Components

Handle the heavier files after the standard is stable:

- `Button`
- `TextField`
- `DivInput`
- `DropDown`
- `Camera`
- `TabBar`
- `DraggablePanel`
- `UploadArea`

Goal:

- separate behavior from style logic
- move helper functions out when possible
- reduce long uninterrupted blocks

### Phase 4: Hooks And Providers

Normalize the internal order of hooks and providers:

- `useTheme`
- `useObserveTheme`
- `useWindow`
- `useToolTip`
- `ThemeProvider`

### Phase 5: Optional Store Cleanup

If the same readability issue exists in stores, apply a lighter structure:

1. imports
2. types
3. store shape and defaults
4. actions
5. selectors or helpers
6. exports

## Practical Editing Rules

When applying this plan:

- do not change component behavior during organization passes
- avoid mixing refactors with feature work
- keep prop names and public types stable
- preserve existing debug markers
- preserve existing CSS variable names unless there is a separate style cleanup task
- move helpers out of the component only when they do not need closure state

## Suggested Review Checklist

Use this checklist for each file during cleanup:

- Is `useTheme()` at the top when the file actually uses theme data?
- Are default props grouped in one destructuring block?
- Are refs and state declared before effects and handlers?
- Are effects grouped together and commented by purpose?
- Are handlers grouped together and named consistently?
- Are style-related calculations grouped into one area?
- Are CSS vars and class names near the bottom of the logic section?
- Is the JSX mostly free of fallback or branching logic?
- Are comments explaining intent instead of restating code?

## Suggested Naming For Section Comments

Use short, repeatable labels:

- `// sync prop-driven state`
- `// derive display state`
- `// handle user actions`
- `// resolve visual styles`
- `// compose css vars`
- `// compose class names`

## Recommendation

Start with a small standardization pass on `useTheme`, `ThemeProvider`, `Icon`, and `Avatar` first. They are compact enough to establish the pattern cleanly, and that gives a stable template before touching larger files like `Button` and `TextField`.
