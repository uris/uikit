import { useEffect, useState } from 'react';
import { type MayaTheme, darkTheme, lightTheme } from '../theme/themes';

export function useTheme() {
	const [theme, setTheme] = useState<MayaTheme>(lightTheme);

	useEffect(() => {
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (
					mutation.type === 'attributes' &&
					mutation.attributeName === 'data-theme'
				) {
					const newTheme = document.documentElement.dataset.theme;
					if (
						!newTheme ||
						newTheme === '' ||
						newTheme.includes(lightTheme.name)
					)
						setTheme(lightTheme);
					else {
						setTheme(darkTheme);
					}
				}
			}
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme'],
		});

		return () => observer.disconnect();
	}, []);

	return theme;
}
