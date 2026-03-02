import { useCallback } from 'react';
import type { SliceTheme } from '../theme';
import { darkTheme, lightTheme } from '../theme';
import { colorCssVars } from '../theme/colors/colors';
import { typeCssClasses, typeStyles } from '../theme/type/type';
import { useObserveTheme } from './useObserveTheme';

/**
 * Hook to manage Slice theming
 */
export function useTheme() {
	const current = useObserveTheme();

	const set = useCallback((newTheme: SliceTheme | string) => {
		let theme: SliceTheme;
		if (typeof newTheme === 'string') {
			if (newTheme === 'system') {
				const darkModeMediaQuery = globalThis.matchMedia(
					'(prefers-color-scheme: dark)',
				);
				const isDark = darkModeMediaQuery.matches;
				theme = isDark ? darkTheme : lightTheme;
			} else {
				theme = newTheme === darkTheme.name ? darkTheme : lightTheme;
			}
		} else theme = newTheme;
		document.documentElement.dataset.theme = theme.name;
	}, []);

	const toggleTheme = () => {
		const lightMode = current.name === lightTheme.name;
		const newTheme = lightMode ? darkTheme : lightTheme;
		set(newTheme);
	};

	return {
		/**
		 * Slice's default dark theme
		 */
		darkTheme,
		/**
		 * Slice's default light theme
		 */
		lightTheme,
		/**
		 * The currently active SliceTheme
		 */
		current,
		/**
		 * CSS variables for theme colors
		 */
		colors: colorCssVars,
		/**
		 * CSS class names for theme typefaces
		 */
		typeClass: typeCssClasses,
		/**
		 * CSS typeface styles as inline style properties
		 */
		typeStyle: typeStyles,
		/**
		 * Set a new theme by name or by passing in a SliceTheme object
		 * @param newTheme
		 */
		set,
		/**
		 * Toggle between light and dark themes
		 */
		toggleTheme,
	};
}
