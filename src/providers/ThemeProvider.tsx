import type React from 'react';
import { useEffect } from 'react';
import '../theme/colors/colors.css';
import '../theme/elevations/elevation.css';
import '../theme/type/type.css';
import '../theme/breakpoints/custom-media.css';
import '../theme/motion/motion.css';
import { darkTheme, lightTheme } from '../theme';

interface ThemeProviderProps {
	children?: React.ReactNode;
	theme?: string;
	system?: boolean;
}

// set up media query for system theme
const darkModeMediaQuery = globalThis.matchMedia(
	'(prefers-color-scheme: dark)',
);

export function ThemeProvider(props: Readonly<ThemeProviderProps>) {
	const { children, theme, system } = props;

	// sync the explicitly provided theme to the document root
	useEffect(() => {
		if (theme) {
			const newTheme = theme.includes('dark') ? darkTheme : lightTheme;
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

	return <div data-slice-theme-scope>{children}</div>;
}
