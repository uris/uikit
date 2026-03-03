import { type State, addons } from 'storybook/manager-api';
import { sliceDarkTheme, sliceLightTheme } from './sliceTheme';

const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');

const applyManagerTheme = (isDark: boolean) => {
	addons.setConfig({
		theme: isDark ? sliceDarkTheme : sliceLightTheme,
		layoutCustomisations: {
			showToolbar(state: State, defaultValue: boolean) {
				if (state.viewMode === 'docs') {
					return false;
				}
				return defaultValue;
			},
		},
	});
};

applyManagerTheme(mediaQuery.matches);
mediaQuery.addEventListener('change', (event) => {
	applyManagerTheme(event.matches);
});
