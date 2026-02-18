import { dark, light } from "./colors/colors";
import type { LegacyColors, LyraColors } from "./colors/types";
import type { LyraCorners } from "./corners/types";
import type { LegacyTextStyles, LyraTypeStyles } from "./type/types";
import {
	type GiaTheme,
	darkTheme,
	lightTheme,
	useMayaTheme,
} from "./useMayaTheme";

export { useMayaTheme, darkTheme, lightTheme, light, dark };
export type {
	GiaTheme,
	LyraCorners,
	LyraColors,
	LyraTypeStyles,
	LegacyColors,
	LegacyTextStyles,
};
