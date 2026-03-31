'use client';

import type React from 'react';
import { useEffect } from 'react';
import '../theme/colors/colors.css';
import '../theme/elevations/elevation.css';
import '../theme/type/type.css';
import '../theme/breakpoints/custom-media.css';
import '../theme/motion/motion.css';
import '../theme/global/global.css';
import { type SliceTheme, darkTheme, lightTheme } from '../theme';

interface ThemeProviderProps {
	children?: React.ReactNode;
	theme?: string;
	initialTheme?: string;
	system?: boolean;
	global?: boolean;
}

// set up a media query for system theme
function getDarkModeMediaQuery() {
	if (
		typeof globalThis === 'undefined' ||
		typeof globalThis.matchMedia !== 'function'
	) {
		return null;
	}
	return globalThis.matchMedia('(prefers-color-scheme: dark)');
}

function resolveTheme(
	theme?: string,
	system?: boolean,
): SliceTheme | undefined {
	if (system) return getDarkModeMediaQuery()?.matches ? darkTheme : lightTheme;
	if (theme) return theme.includes('dark') ? darkTheme : lightTheme;

	return undefined;
}

function setDocumentTheme(name: string) {
	if (typeof document === 'undefined') return;
	document.documentElement.dataset.sliceTheme = name;
}

export function ThemeProvider(props: Readonly<ThemeProviderProps>) {
	const { children, theme, system, global, initialTheme } = props;

	// sync the explicitly provided theme to the document root
	useEffect(() => {
		if (theme || initialTheme) {
			const newTheme = resolveTheme(theme ?? initialTheme, false);
			if (!newTheme) return;
			setDocumentTheme(newTheme.name);
		}
	}, [theme, initialTheme]);

	// keep the document theme aligned with system preference when enabled
	useEffect(() => {
		if (!system) return;

		const darkModeMediaQuery = getDarkModeMediaQuery();
		if (!darkModeMediaQuery) return;
		const handleSystemThemeChange = (e: MediaQueryListEvent) => {
			if (system) {
				const autoTheme = e.matches ? darkTheme : lightTheme;
				document.documentElement.dataset.sliceTheme = autoTheme.name;
			}
		};

		// apply the current system theme on mount or when `system` changes
		if (system) {
			const autoTheme = darkModeMediaQuery.matches ? darkTheme : lightTheme;
			document.documentElement.dataset.sliceTheme = autoTheme.name;
		}

		// subscribe to OS theme changes
		darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);

		return () => {
			darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange);
		};
	}, [system]);

	// optionally mirror the active Slice surface color onto the document body
	useEffect(() => {
		if (!global) {
			document.body.classList.remove('slice-global-body');
			return;
		}
		document.body.classList.add('slice-global-body');

		return () => {
			document.body.classList.remove('slice-global-body');
		};
	}, [global]);

	return <div data-slice-theme-scope>{children}</div>;
}
