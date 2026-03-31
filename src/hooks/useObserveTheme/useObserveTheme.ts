'use client';

import { useEffect, useState } from 'react';
import { type SliceTheme, darkTheme, lightTheme } from '../../theme';

function resolveTheme(themeName: string | undefined): SliceTheme {
	if (!themeName || themeName === '' || themeName.includes(lightTheme.name)) {
		return lightTheme;
	}
	return darkTheme;
}

export function useObserveTheme() {
	const [theme, setTheme] = useState<SliceTheme>(() => {
		if (typeof document === 'undefined') return lightTheme;
		return resolveTheme(document.documentElement.dataset.sliceTheme);
	});

	useEffect(() => {
		// Sync once on mount in case the theme was set before this hook subscribed.
		setTheme(resolveTheme(document.documentElement.dataset.sliceTheme));

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (
					mutation.type === 'attributes' &&
					mutation.attributeName === 'data-slice-theme'
				) {
					const newTheme = document.documentElement.dataset.sliceTheme;
					setTheme(resolveTheme(newTheme));
				}
			}
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-slice-theme'],
		});

		return () => observer.disconnect();
	}, []);

	return theme;
}
