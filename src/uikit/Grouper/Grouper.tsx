import { useEffect, useState } from 'react';
import { useAnimate } from 'framer-motion';
import { useTheme } from 'styled-components';
import { UIIcon } from '../UIIcon/UIIcon';
import { Badge } from '../Badge/Badge';
import * as Styled from './_Styles';

export interface GrouperProps {
  title?: string;
  toggle?: boolean;
  open?: boolean;
  hasIcon?: boolean;
  iconName?: string;
  iconSize?: number;
  frameSize?: number;
  border?: number;
  count?: number | string;
  hideNull?: boolean;
  variant?: 'group' | 'facet';
  showFilterBadge?: boolean;
  unframed?: boolean;
  onChange?: (state: boolean) => void;
  onClick?: () => void;
}

export function Grouper(props: GrouperProps) {
  const {
    title = 'Group Title',
    toggle = true,
    open = true,
    hasIcon = true,
    iconName = 'chevron down',
    iconSize = 18,
    frameSize = 64,
    border = 0,
    count = 0,
    unframed = false,
    variant = 'group',
    hideNull = true,
    showFilterBadge = false,
    onChange = () => null,
    onClick = () => null,
  } = props;
  const theme = useTheme();
  const [state, setState] = useState<boolean>(open);
  const [icon, animateIcon] = useAnimate();
  useEffect(() => setState(open), [open]);

  function handleToggle() {
    if (!toggle) return;
    onClick();
    onChange(!state);
    animate(!state);
    setState(!state);
  }

  function animate(state: boolean) {
    const animation = { rotate: state ? 0 : 180 };
    animateIcon(
      icon.current,
      { ...animation },
      { ease: 'easeInOut', duration: 0.25 },
    );
  }

  return (
    <Styled.GroupHeader
      $frameSize={frameSize}
      $iconSize={iconSize}
      $border={border}
      $variant={variant}
      $unframed={unframed}
      onClick={() => handleToggle()}
    >
      <div className="content">
        <div className="title">
          {title}
          <Badge hideNull={hideNull} count={count} variant={'light'} />
          {showFilterBadge && (
            <UIIcon
              name="filter"
              size={16}
              strokeColor={theme.lyraColors['core-text-disabled']}
            />
          )}
        </div>
        {hasIcon && (
          <div ref={icon} className="icon">
            <UIIcon name={iconName} size={iconSize} />
          </div>
        )}
      </div>
    </Styled.GroupHeader>
  );
}
