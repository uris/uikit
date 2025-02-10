import { useTheme } from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { Transition, Variants } from 'framer-motion';
import { UIIcon } from '../UIIcon/UIIcon';
import { Dot } from '../Dot/Dot';
import { Badge } from '../Badge/Badge';
import { ToolTip, ToolTipType } from '../sharedTypes';
import * as Styled from './_Styles';

export interface IconButtonProps {
  frameSize?: number;
  iconSize?: number;
  icon?: string;
  tooltip?: string;
  color?: string;
  colorOn?: string;
  fillColor?: string;
  disabled?: boolean;
  bgColor?: string;
  bgColorOn?: string;
  bgColorHover?: string;
  toggle?: boolean;
  hover?: boolean;
  toggleIcon?: boolean;
  isToggled?: boolean;
  showDot?: boolean;
  count?: number;
  transition?: Transition;
  label?: string;
  fill?: boolean;
  variants?: Variants;
  initial?: string;
  animate?: string;
  exit?: string;
  borderRadius?: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onToolTip?: (tip: ToolTip | null) => void;
}

export function IconButton(props: IconButtonProps) {
  const {
    frameSize = 36,
    iconSize = 20,
    icon = 'more',
    borderRadius = 4,
    tooltip = undefined,
    color = undefined,
    colorOn = undefined,
    bgColor = undefined,
    bgColorHover = undefined,
    bgColorOn = undefined,
    transition = undefined,
    variants = undefined,
    initial = undefined,
    animate = undefined,
    exit = undefined,
    fillColor = undefined,
    label = undefined,
    hover = undefined,
    count = 0,
    toggle = true,
    toggleIcon = false,
    isToggled = false,
    disabled = false,
    showDot = false,
    fill = false,
    onClick = () => null,
    onToolTip = () => null,
  } = props;
  const theme = useTheme();
  const [on, setOn] = useState<boolean>(isToggled);
  const ref = useRef<HTMLDivElement>(null);
  const styles = {
    bgColor: bgColor ? bgColor : 'transparent',
    bgColorOn: bgColorOn
      ? bgColorOn
      : theme.lyraColors['core-surface-secondary'],
    bgColorHover: hover
      ? theme.lyraColors['core-surface-secondary']
      : bgColorHover
        ? bgColorHover
        : bgColor,
    toggle,
    isToggled: toggle ? on : false,
    frameSize,
    fill,
    borderRadius,
  };
  useEffect(() => setOn(isToggled), [isToggled]);
  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (disabled) return;
    if (tooltip) onToolTip(null);
    setOn(!on);
    onClick(e);
  }

  function handleMouseEnter(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (!ref || !ref.current || !tooltip) return;
    const tip: ToolTip = {
      type: ToolTipType.button,
      payload: { label: tooltip },
      event: e,
      ref: ref,
    };
    onToolTip(tip);
  }

  function handleMouseLeave() {
    if (tooltip) onToolTip(null);
  }

  return (
    <Styled.IconButton
      $props={styles}
      onClick={(e) => handleClick(e)}
      onMouseLeave={() => handleMouseLeave()}
      onMouseEnter={(e) => handleMouseEnter(e)}
      transition={transition}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      ref={ref}
    >
      <div className="icon" style={{ opacity: disabled ? 0.3 : 1 }}>
        <UIIcon
          name={icon}
          strokeColor={color ? color : theme.lyraColors['core-icon-primary']}
          accentColor={
            colorOn ? colorOn : theme.lyraColors['core-icon-primary']
          }
          fillColor={fillColor}
          disabled={disabled}
          size={iconSize}
          toggle={toggleIcon ? isToggled : false}
          pointer
        />
      </div>
      {label && <div className="label">{label}</div>}
      <Dot show={showDot} />
      {count !== 0 && (
        <div className="count">
          <Badge variant={'light'} count={count} hideNull />
        </div>
      )}
    </Styled.IconButton>
  );
}
