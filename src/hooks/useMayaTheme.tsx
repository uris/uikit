import { type MayaTheme, darkTheme, lightTheme } from '../theme/themes';
import { useTheme } from './useTheme';

export function useMayaTheme() {
	const currentTheme = useTheme();

	const setTheme = (newTheme: MayaTheme | string) => {
		let theme: MayaTheme;
		if (typeof newTheme === 'string') {
			if (newTheme === darkTheme.name) theme = darkTheme;
			else theme = lightTheme;
		} else theme = newTheme;
		document.documentElement.dataset.theme = theme.name;
	};

	return { darkTheme, lightTheme, currentTheme, setTheme };
}
