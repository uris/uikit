import { useTheme } from 'styled-components';
import { Variants, Transition } from 'framer-motion';
import * as Styled from './_Styles';

export interface AvatarProps {
  size?: number;
  frame?: number;
  first?: string;
  last?: string;
  image?: string;
  border?: number;
  borderColor?: string;
  bgColor?: string;
  variants?: Variants;
  transition?: Transition;
  initial?: string;
  animate?: string;
  exit?: string;
}

export function Avatar(props: AvatarProps) {
  const theme = useTheme();
  const {
    first = '',
    last = '',
    image = '',
    border = 0,
    borderColor = theme.colors.bgNormal,
    bgColor = undefined,
    transition = undefined,
    animate = undefined,
    initial = undefined,
    exit = undefined,
  } = props;
  const { size = 34, frame = 34 } = props;
  const initials = `${first?.charAt(0)}${last.charAt(0)}`;
  return (
    <Styled.Avatar
      $size={size}
      $frame={frame}
      $image={image}
      $border={border}
      $borderColor={borderColor}
      $bgColor={bgColor}
      transition={transition}
      initial={initial}
      animate={animate}
      exit={exit}
    >
      <div className="user">{image ? null : initials}</div>
    </Styled.Avatar>
  );
}
