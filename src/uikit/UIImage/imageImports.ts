// Import all image variations
import auto2x from '../../assets/images/auto@2x.png';
import dark2x from '../../assets/images/dark@2x.png';
import empty1x from '../../assets/images/empty.png';
import expert11x from '../../assets/images/expert1.png';
import expert21x from '../../assets/images/expert2.png';
import expert31x from '../../assets/images/expert3.png';
import gpColor1x from '../../assets/images/gp-color@1x.png';
import gpColor2x from '../../assets/images/gp-color@2x.png';
import gpColor3x from '../../assets/images/gp-color@3x.png';
import gpMark1x from '../../assets/images/gp-mark.png';
import light2x from '../../assets/images/light@2x.png';

// Create a mapping object for easy lookup
export const imageMap: Record<string, Record<number, string>> = {
  empty: {
    1: empty1x,
    2: empty1x,
    3: empty1x,
  },
  light: {
    1: light2x,
    2: light2x,
    3: light2x,
  },
  dark: {
    1: dark2x,
    2: dark2x,
    3: dark2x,
  },
  auto: {
    1: auto2x,
    2: auto2x,
    3: auto2x,
  },
  expert1: {
    1: expert11x,
    2: expert11x,
    3: expert11x,
  },
  expert2: {
    1: expert21x,
    2: expert21x,
    3: expert21x,
  },
  expert3: {
    1: expert31x,
    2: expert31x,
    3: expert31x,
  },
  'gp-color': {
    1: gpColor1x,
    2: gpColor2x,
    3: gpColor3x,
  },
  'gp-mark': {
    1: gpMark1x,
    2: gpMark1x,
    3: gpMark1x,
  },
};
