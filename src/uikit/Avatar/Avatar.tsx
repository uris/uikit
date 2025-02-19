import React, { useRef } from 'react';
import { useTheme } from 'styled-components';
import { Variants, Transition } from 'framer-motion';
import { ToolTip, ToolTipType } from '../sharedTypes';
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
  onToolTip?: (tip: ToolTip | null) => void;
}

export function Avatar(props: AvatarProps) {
  const theme = useTheme();
  const {
    first = '',
    last = '',
    image = '',
    border = 0,
    borderColor = theme.lyraColors['core-surface-primary'],
    bgColor = undefined,
    transition = undefined,
    animate = undefined,
    initial = undefined,
    exit = undefined,
    onToolTip = () => null,
  } = props;
  const { size = 34, frame = 34 } = props;
  const initials = `${first?.charAt(0)}${last.charAt(0)}`;
  const ref = useRef<HTMLDivElement>(null);
  function onMouseEnter(e: React.MouseEvent<HTMLDivElement>) {
    const tip: ToolTip = {
      type: ToolTipType.button,
      payload: { label: first },
      event: e,
      ref,
    };
    onToolTip(tip);
  }
  function onMouseLeave() {
    onToolTip(null);
  }
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
      ref={ref}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseLeave={() => onMouseLeave()}
    >
      <div className="user">{image ? null : initials}</div>
    </Styled.Avatar>
  );
}
