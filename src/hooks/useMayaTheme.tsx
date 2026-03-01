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

	const toggleTheme = () => {
		const lightMode = currentTheme.name === lightTheme.name;
		const newTheme = lightMode ? darkTheme : lightTheme;
		setTheme(newTheme);
	};

	return { darkTheme, lightTheme, currentTheme, setTheme, toggleTheme };
}
