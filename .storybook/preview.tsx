import type { Preview } from "@storybook/react-vite";
import React from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../src/theme/useMayaTheme";
import "./fonts.css";

const preview: Preview = {
	globalTypes: {
		theme: {
			name: "Theme",
			description: "Global theme for components",
			defaultValue: "light",
			toolbar: {
				// The icon for the toolbar item
				icon: "circlehollow",
				// Array of options
				items: [
					{ value: "light", icon: "circlehollow", title: "Light theme" },
					{ value: "dark", icon: "circle", title: "Dark theme" },
				],
			},
		},
	},
	decorators: [
		(Story, context) => {
			const selectedTheme = context.globals.theme;
			const theme = selectedTheme === "light" ? lightTheme : darkTheme;
			return (
				<ThemeProvider theme={theme}>
					<Story />
				</ThemeProvider>
			);
		},
	],
	parameters: {
		layout: "fullscreen",
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
