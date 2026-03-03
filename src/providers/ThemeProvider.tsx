import type React from 'react';
import { useEffect } from 'react';
import '../theme/colors/colors.css';
import '../theme/type/type.css';
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

	// update active theme based on theme prop
	useEffect(() => {
		if (theme) {
			const newTheme = theme.includes('dark') ? darkTheme : lightTheme;
			document.documentElement.dataset.theme = newTheme.name;
		}
	}, [theme]);

	// update then active theme based on system changes
	useEffect(() => {
		// handler for the media query change
		const handleSystemThemeChange = (e: MediaQueryListEvent) => {
			if (system) {
				const autoTheme = e.matches ? darkTheme : lightTheme;
				document.documentElement.dataset.theme = autoTheme.name;
			}
		};

		// set the current system theme
		if (system) {
			const autoTheme = darkModeMediaQuery.matches ? darkTheme : lightTheme;
			document.documentElement.dataset.theme = autoTheme.name;
		}

		// set listener on media query
		darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);

		// clean up
		return () => {
			darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange);
		};
	}, [system]);

	return children;
}
