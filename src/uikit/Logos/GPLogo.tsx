import { useTheme } from 'styled-components';
import mark2x from '../UIImage/images/gp-mark.png';
import logo3x from '../UIImage/images/gp-color@3x.png';
import logo2x from '../UIImage/images/gp-color@2x.png';
import logo1x from '../UIImage/images/gp-color@1x.png';
import { Logos } from './Logos';

export interface GPLogoProps {
  height?: number;
  markonly?: boolean;
  retina?: '1x' | '2x' | '3x';
  type?: 'png' | 'vector' | 'mixed';
  color?: 'full' | 'bw' | string;
  gap?: number;
}

export function GPLogo(props: GPLogoProps) {
  const {
    height = 52,
    markonly = false,
    retina = '2x',
    color = 'bw',
    type = 'png',
    gap = 8,
  } = props;
  const theme = useTheme();
  function setLogo() {
    if (retina === '1x') return logo1x;
    if (retina === '2x') return logo2x;
    if (retina === '3x') return logo3x;
  }
  if (type === 'png')
    return <img src={setLogo()} height={height} alt={'logo'} />;
  if (type === 'mixed')
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap,
        }}
      >
        <img src={mark2x} height={height} alt={'GP logo'} />{' '}
        <Logos
          image={'gptype'}
          height={height * 0.5}
          color={color === 'bw' ? theme.colors.textPrimary : color}
        />
      </div>
    );
  else
    return (
      <Logos
        image={markonly ? 'gpmark' : 'gp'}
        height={height}
        color={color === 'bw' ? theme.colors.textPrimary : color}
      />
    );
}
