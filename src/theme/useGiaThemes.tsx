import {
  brand,
  dark as darkColors,
  light as lightColors,
  lyraDark,
  lyraLight,
} from './colors/colors';
import { lyraType, type } from './type/type';
import { Brand, LegacyColors, LyraColors } from './colors/types';
import { LegacyTextStyles, LyraTypeStyles } from './type/types';
import { LyraCorners } from './corners/types';
import { lyraCorners } from './corners/corners';

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

export function useGiaThemes(): { dark: GiaTheme; light: GiaTheme } {
  const dark: GiaTheme = {
    name: 'darkMode',
    colors: darkColors,
    type: { desktop: type },
    brand: brand,
    lyraColors: lyraDark,
    lyraType: lyraType,
    lyraCorners: lyraCorners,
  };

  const light: GiaTheme = {
    name: 'lightMode',
    colors: lightColors,
    type: { desktop: type },
    brand: brand,
    lyraColors: lyraLight,
    lyraType: lyraType,
    lyraCorners: lyraCorners,
  };

  return { dark, light };
}
