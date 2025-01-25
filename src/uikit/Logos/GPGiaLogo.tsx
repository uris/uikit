import { useTheme } from 'styled-components';
import logoColor from '../Images/GPGiaLogoColor.png';
import { Logos } from './Logos';

export interface GPGiaLogoProps {
  height?: number;
  color?: 'full' | 'bw' | string;
}

export function GPGiaLogo(props: GPGiaLogoProps) {
  const { height = 52, color = 'bw' } = props;
  const theme = useTheme();

  if (color === 'full')
    return <img src={logoColor} height={height} alt={'GP Assist'} />;
  return (
    <Logos
      image={'gpgia'}
      height={height}
      color={color === 'bw' ? theme.colors.textPrimary : color}
    />
  );
}
