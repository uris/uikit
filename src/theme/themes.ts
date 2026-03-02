import { coreColors, dark, light } from './colors/colors';
import type { Colors, CoreColors } from './colors/types';
import { corners } from './corners/corners';
import type { Corners } from './corners/types';
import { type } from './type/type';
import type { Type } from './type/types';

export type SliceTheme = {
	name: string;
	coreColors: CoreColors;
	colors: Colors;
	type: Type;
	corners: Corners;
};

export const lightTheme: SliceTheme = {
	name: 'lightMode',
	coreColors,
	colors: light,
	type,
	corners,
};

export const darkTheme: SliceTheme = {
	name: 'darkMode',
	coreColors,
	colors: dark,
	type,
	corners,
};
