import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';
import './fonts.css';
import '../src/theme/colors/colors.css';
import '../src/theme/type/type.css';
import { darkTheme, lightTheme, useMayaTheme } from '../src';

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
					{
						value: lightTheme.name,
						icon: 'circlehollow',
						title: 'Light theme',
					},
					{ value: darkTheme.name, icon: 'circle', title: 'Dark theme' },
				],
			},
		},
	},
	decorators: [
		(Story, context) => {
			const selectedTheme = context.globals.theme;
			const { setTheme } = useMayaTheme();

			// Update data-theme attribute for CSS variables
			useEffect(() => setTheme(selectedTheme), [selectedTheme, setTheme]);

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

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: 'todo'
        }
    },
};

export default preview;
