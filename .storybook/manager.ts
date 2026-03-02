import { type State, addons } from 'storybook/manager-api';
import sliceTheme from './sliceTheme';

addons.setConfig({
	theme: sliceTheme,
	layoutCustomisations: {
		showToolbar(state: State, defaultValue: boolean) {
			if (state.viewMode === 'docs') {
				return false;
			}
			return defaultValue;
		},
	},
});
