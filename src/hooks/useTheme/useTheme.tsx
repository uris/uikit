'use client';

import { useCallback, useMemo } from 'react';
import type { SliceTheme } from '../../theme';
import { darkTheme, lightTheme } from '../../theme';
import { colorClass, colorCssVars } from '../../theme/colors/colors';
import { typeCssClasses, typeStyles } from '../../theme/type/type';
import { useObserveTheme } from '../useObserveTheme/useObserveTheme';

/**
 * Hook to manage Slice theming
 */
export function useTheme() {
	// observe the currently applied theme
	const current = useObserveTheme();

	// set the active theme from a theme object or supported theme name
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
		document.documentElement.dataset.sliceTheme = theme.name;
	}, []);

	// toggle between the default light and dark themes
	const toggle = () => {
		const lightMode = current.name === lightTheme.name;
		const newTheme = lightMode ? darkTheme : lightTheme;
		document.documentElement.dataset.sliceTheme = newTheme.name;
	};

	// expose a convenient dark-mode flag for consumers
	const isDark = useMemo(() => {
		return current.name === darkTheme.name;
	}, [current]);

	return {
		// default theme objects
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
		// theme styling helpers
		/**
		 * CSS variables for theme colors
		 */
		colors: colorCssVars,
		/**
		 * CSS Class names for the theme colors
		 */
		colorsClass: colorClass,
		/**
		 * CSS class names for theme typefaces
		 */
		typeClass: typeCssClasses,
		/**
		 * CSS typeface styles as inline style properties
		 */
		typeStyle: typeStyles,
		// theme actions and derived state
		/**
		 * Set a new theme by name or passing in a SliceTheme object
		 * @param newTheme
		 */
		set,
		/**
		 * Toggle between light and dark themes
		 */
		toggle,
		/**
		 * If the currently active theme is the Slice's default dark theme'
		 */
		isDark,
	};
}
