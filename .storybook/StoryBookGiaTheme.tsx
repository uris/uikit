import React from "react";
import { ThemeProvider } from "styled-components";
import { useGiaThemes } from "../src/theme/useGiaThemes";

interface Props {
	children?: any;
	theme?: string;
}
export function StoryBookGiaTheme(props: Props) {
	const { children, theme = "light" } = props;
	const themes = useGiaThemes();
	return (
		<ThemeProvider
			theme={theme && theme === "light" ? themes.lightTheme : themes.darkTheme}
		>
			{children}
		</ThemeProvider>
	);
}
