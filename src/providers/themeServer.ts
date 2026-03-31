export type SliceThemeName = 'lightMode' | 'darkMode';

type ResolveInitialThemeOptions = {
	theme?: string | null;
	cookieTheme?: string | null;
	fallbackTheme?: SliceThemeName;
};

function normalizeThemeName(theme?: string | null): SliceThemeName | undefined {
	if (!theme) return undefined;
	return theme.includes('dark') ? 'darkMode' : 'lightMode';
}

/**
 * Resolve the startup Slice theme from an explicit theme value, cookie value,
 * or fallback theme in that order.
 */
export function resolveInitialTheme(
	options: ResolveInitialThemeOptions = {},
): SliceThemeName {
	const { theme, cookieTheme, fallbackTheme = 'lightMode' } = options;

	return (
		normalizeThemeName(theme) ??
		normalizeThemeName(cookieTheme) ??
		fallbackTheme
	);
}

/**
 * Return the root HTML attributes needed to render the active Slice theme
 * before client hydration.
 */
export function getThemeHtmlAttributes(theme?: string | null) {
	const resolvedTheme = normalizeThemeName(theme) ?? 'lightMode';

	return {
		'data-slice-theme': resolvedTheme,
	} as const;
}
