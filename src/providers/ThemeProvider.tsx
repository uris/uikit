import type React from 'react';
import { useEffect } from 'react';
import { useMayaTheme } from '../hooks';
import '../theme/colors/colors.css';
import '../theme/type/type.css';

interface ThemeProviderProps {
	children?: React.ReactNode;
	theme?: string;
}
export function ThemeProvider(props: Readonly<ThemeProviderProps>) {
	const mayaTheme = useMayaTheme();
	const { children, theme } = props;
	useEffect(() => {
		mayaTheme.setTheme(theme ?? mayaTheme.lightTheme.name);
	}, [theme, mayaTheme]);
	return children;
}
