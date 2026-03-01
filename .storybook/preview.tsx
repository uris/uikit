import { DocsContainer } from '@storybook/addon-docs/blocks';
import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { FlexDiv, darkTheme, lightTheme } from '../src';
import { ThemeProvider } from '../src/providers';

// options for theme selector
const items = [
	{ value: lightTheme.name, icon: 'circlehollow', title: 'Light theme' },
	{ value: darkTheme.name, icon: 'circle', title: 'Dark theme' },
] as any;

const preview: Preview = {
	globalTypes: {
		theme: {
			name: 'Theme',
			description: 'Global theme for components',
			defaultValue: 'light',
			toolbar: {
				icon: 'circlehollow',
				items,
			},
		},
	},
	initialGlobals: {
		theme: lightTheme.name,
	},
	decorators: [
		(Story, context) => {
			const theme = context.globals.theme;
			return (
				<ThemeProvider theme={theme}>
					<Story />
				</ThemeProvider>
			);
		},
	],
	parameters: {
		layout: 'fullscreen',
		docs: {
			container: ({ children, context }: { children: any; context: any }) => {
				const { theme } = context.store.userGlobals.globals;
				return (
					<DocsContainer context={context}>
						<ThemeProvider theme={theme}>
							<FlexDiv
								padding={'64px 88px'}
								width={'fill'}
								height={'fill'}
								maxWidth={826}
								centerSelf={true}
							>
								{children}
							</FlexDiv>
						</ThemeProvider>
					</DocsContainer>
				);
			},
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
