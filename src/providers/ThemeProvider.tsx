import type React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '../hooks';
import '../theme/colors/colors.css';
import '../theme/type/type.css';
import { type SliceTheme, darkTheme, lightTheme } from '../theme';

interface ThemeProviderProps {
	children?: React.ReactNode;
	theme?: string;
	system?: boolean;
}
export function ThemeProvider(props: Readonly<ThemeProviderProps>) {
	const { children, theme, system } = props;
	const sliceTheme = useTheme();
	const darkModeMediaQuery = globalThis.matchMedia(
		'(prefers-color-scheme: dark)',
	);
	const [activeTheme, setActiveTheme] = useState<SliceTheme>(lightTheme);

	// set the active theme
	useEffect(() => {
		sliceTheme.set(activeTheme);
	}, [activeTheme, sliceTheme]);

	// update active theme based on theme prop
	useEffect(() => {
		if (theme) {
			const newTheme = theme.includes('dark') ? darkTheme : lightTheme;
			setActiveTheme(newTheme);
		}
	}, [theme]);

	// update active theme based on system theme changes
	// biome-ignore lint/correctness/useExhaustiveDependencies: on mount/unmount only
	useEffect(() => {
		// handler for the media query change
		const handleSystemThemeChange = (e: MediaQueryListEvent) => {
			if (system) {
				setActiveTheme(e.matches ? darkTheme : lightTheme);
			}
		};

		// set the current system theme
		if (system) {
			setActiveTheme(darkModeMediaQuery.matches ? darkTheme : lightTheme);
		}

		// set listener on media query
		darkModeMediaQuery.addEventListener('change', handleSystemThemeChange);

		// clean up
		return () => {
			darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange);
		};
	}, []);

	return children;
}
