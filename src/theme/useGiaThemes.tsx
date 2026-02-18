import {
	brand,
	dark as darkColors,
	light as lightColors,
	lyraDark,
	lyraLight,
} from "./colors/colors";
import type { Brand, LegacyColors, LyraColors } from "./colors/types";
import { lyraCorners } from "./corners/corners";
import type { LyraCorners } from "./corners/types";
import { lyraType, type } from "./type/type";
import type { LegacyTextStyles, LyraTypeStyles } from "./type/types";

export type GiaTheme = {
	name: string;
	colors: LegacyColors;
	lyraColors: LyraColors;
	type?: { desktop: LegacyTextStyles };
	lyraType: LyraTypeStyles;
	brand: Brand;
	lyraCorners: LyraCorners;
	lyraTransitions?: { [key: string]: string };
};

export const lightTheme: GiaTheme = {
	name: "lightMode",
	colors: lightColors,
	type: { desktop: type },
	brand: brand,
	lyraColors: lyraLight,
	lyraType: lyraType,
	lyraCorners: lyraCorners,
};

export const darkTheme: GiaTheme = {
	name: "darkMode",
	colors: darkColors,
	type: { desktop: type },
	brand: brand,
	lyraColors: lyraDark,
	lyraType: lyraType,
	lyraCorners: lyraCorners,
};

export function useGiaThemes(): {
	darkTheme: GiaTheme;
	lightTheme: GiaTheme;
} {
	return { darkTheme, lightTheme };
}
