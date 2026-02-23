import { coreColors, dark, light } from './colors/colors';
import type { Colors, CoreColors } from './colors/types';
import { corners } from './corners/corners';
import type { Corners } from './corners/types';
import { type } from './type/type';
import type { Type } from './type/types';

export type MayaTheme = {
	name: string;
	coreColors: CoreColors;
	colors: Colors;
	type: Type;
	corners: Corners;
};

export const lightTheme: MayaTheme = {
	name: 'lightMode',
	coreColors,
	colors: light,
	type,
	corners,
};

export const darkTheme: MayaTheme = {
	name: 'darkMode',
	coreColors,
	colors: dark,
	type,
	corners,
};

export function useMayaTheme(): {
	darkTheme: MayaTheme;
	lightTheme: MayaTheme;
} {
	return { darkTheme, lightTheme };
}
