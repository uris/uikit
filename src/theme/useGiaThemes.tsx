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

export type GiaTheme = {
  name: string;
  colors: LegacyColors;
  lyraColors: LyraColors;
  type?: { desktop: LegacyTextStyles };
  lyraType: LyraTypeStyles;
  brand: Brand;
  lyraCorners?: { [key: string]: string };
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
  };

  const light: GiaTheme = {
    name: 'lightMode',
    colors: lightColors,
    type: { desktop: type },
    brand: brand,
    lyraColors: lyraLight,
    lyraType: lyraType,
  };

  return { dark, light };
}
