import { useEffect, useState } from 'react';
import { type MayaTheme, useMayaTheme } from '../theme/useMayaTheme';

export function useTheme() {
	const themes = useMayaTheme();
	const [theme, setTheme] = useState<MayaTheme>(themes.lightTheme);

	useEffect(() => {
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.type === 'attributes' &&
					mutation.attributeName === 'data-theme'
				) {
					const newTheme = document.documentElement.dataset.theme;
					if (!newTheme || newTheme === '') setTheme(themes.lightTheme);
					else if (newTheme.includes('light')) setTheme(themes.lightTheme);
					else setTheme(themes.darkTheme);
				}
			});
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme'],
		});

		return () => observer.disconnect();
	}, []);

	return theme;
}
