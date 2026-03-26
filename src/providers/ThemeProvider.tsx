import type React from 'react';
import { useEffect } from 'react';
import '../theme/colors/colors.css';
import '../theme/elevations/elevation.css';
import '../theme/type/type.css';
import '../theme/breakpoints/custom-media.css';
import '../theme/motion/motion.css';
import { type SliceTheme, darkTheme, lightTheme } from '../theme';

interface ThemeProviderProps {
	children?: React.ReactNode;
	theme?: string;
	system?: boolean;
	global?: boolean;
}

// set up a media query for system theme
const darkModeMediaQuery = globalThis.matchMedia(
	'(prefers-color-scheme: dark)',
);

function resolveTheme(
	theme?: string,
	system?: boolean,
): SliceTheme | undefined {
	if (system) return darkModeMediaQuery.matches ? darkTheme : lightTheme;
	if (theme) return theme.includes('dark') ? darkTheme : lightTheme;

	return undefined;
}

export function ThemeProvider(props: Readonly<ThemeProviderProps>) {
	const { children, theme, system, global } = props;

	// sync the explicitly provided theme to the document root
	useEffect(() => {
		if (theme) {
			const newTheme = resolveTheme(theme, false);
			if (!newTheme) return;
			document.documentElement.dataset.sliceTheme = newTheme.name;
		}
	}, [theme]);

	// keep the document theme aligned with system preference when enabled
	useEffect(() => {
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
			document.documentElement.classList.remove(
				'slice-global-background-color',
			);
			document.body.classList.remove('slice-global-background-color');
			return;
		}
		document.documentElement.classList.add('slice-global-background-color');
		document.body.classList.add('slice-global-background-color');

		return () => {
			document.documentElement.classList.remove(
				'slice-global-background-color',
			);
			document.body.classList.remove('slice-global-background-color');
		};
	}, [global]);

	return <div data-slice-theme-scope>{children}</div>;
}
