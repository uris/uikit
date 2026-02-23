import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import './fonts.css';
import '../src/theme/colors/colors.css';
import '../src/theme/type/type.css';

const preview: Preview = {
	globalTypes: {
		theme: {
			name: 'Theme',
			description: 'Global theme for components',
			defaultValue: 'light',
			toolbar: {
				// The icon for the toolbar item
				icon: 'circlehollow',
				// Array of options
				items: [
					{ value: 'light', icon: 'circlehollow', title: 'Light theme' },
					{ value: 'dark', icon: 'circle', title: 'Dark theme' },
				],
			},
		},
	},
	decorators: [
		(Story, context) => {
			const selectedTheme = context.globals.theme;

			// Update data-theme attribute for CSS variables
			useEffect(() => {
				document.documentElement.dataset.theme = selectedTheme;
			}, [selectedTheme]);

			return <Story />;
		},
	],
	parameters: {
		layout: 'fullscreen',
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
