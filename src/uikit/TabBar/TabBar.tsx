import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { IconButton } from '../IconButton';
import { UIIcon } from '../UIIcon/UIIcon';
import { Badge } from '../Badge/Badge';
import { ToolTip, ToolTipType } from '../sharedTypes';
import { TabOption } from './_Types';
import * as Styled from './Styles';

export const placeholderOptions: TabOption[] = [
  { name: 'Option 1', value: 'Option 1', icon: null },
  { name: 'Option 2', value: 'Option 2', icon: 'check' },
];

export interface TabBarProps {
  options?: TabOption[];
  selected?: number;
  border?: boolean;
  selectedValue?: any;
  height?: number | string;
  width?: number | string;
  closeWidth?: number | string;
  padding?: number | string;
  textStyle?:
    | 'textXLarge'
    | 'textLarge'
    | 'textRegular'
    | 'textMedium'
    | 'textSmall'
    | 'textXSmall'
    | null;
  iconSize?: number;
  iconGap?: number;
  tabGap?: number;
  dragsApp?: boolean;
  disabled?: boolean;
  hasClose?: boolean;
  state?: any;
  size?: number;
  onToolTip?: (tip: ToolTip | null) => void;
  onChange?: (index: number) => void;
  onTabChange?: (option: TabOption) => void;
  onClose?: () => void;
}

export function TabBar(props: TabBarProps) {
  const {
    options = placeholderOptions,
    selected = 0,
    border = true,
    height = '100%',
    width = '100%',
    padding = 8,
    textStyle = 'textRegular',
    iconSize = 20,
    iconGap = 4,
    tabGap = 0,
    dragsApp = false,
    disabled = false,
    hasClose = false,
    closeWidth = 'auto',
    selectedValue = null,
    state = null,
    size = 1,
    onChange = () => null,
    onTabChange = () => null,
    onClose = () => null,
    onToolTip = () => null,
  } = props;
  const [index, setIndex] = useState<number>(selected);

  useEffect(() => {
    let selectedIndex = 0;
    if (selectedValue && options) {
      const selection = (option: TabOption) => {
        return option.value === selectedValue;
      };
      selectedIndex = options.findIndex(selection);
      setIndex(selectedIndex !== -1 ? selectedIndex : selected);
    } else {
      setIndex(selected);
    }
  }, [selected, selectedValue, options]);

  const handleClick = (i: number) => {
    setIndex(i);
    onChange(i);
    onTabChange(options[i]);
  };

  return (
    <Styled.Wrapper
      $height={height}
      $width={width}
      $border={border}
      $gap={tabGap}
    >
      {options.map((option: TabOption, i: number) => {
        return (
          <Option
            key={i + '_option_' + option.name}
            label={option.name}
            value={i}
            showToolTip={option.toolTip}
            selected={i === index}
            onClick={() => {
              onToolTip(null);
              handleClick(i);
            }}
            padding={padding}
            textStyle={textStyle}
            icon={option.icon}
            iconSize={iconSize}
            iconGap={iconGap}
            dragsApp={dragsApp}
            disabled={disabled}
            state={state}
            size={size}
            count={option.count}
            onToolTip={(tip) => onToolTip(tip)}
          />
        );
      })}
      {hasClose && (
        <Styled.CloseButton
          $padding={padding}
          onClick={() => onClose()}
          $closeWidth={closeWidth}
        >
          <IconButton
            iconSize={iconSize - 4}
            frameSize={iconSize}
            toggle={false}
            hover={true}
            icon={'x'}
            onClick={() => onClose()}
          />
        </Styled.CloseButton>
      )}
    </Styled.Wrapper>
  );
}

interface TabOptionProps {
  label?: string;
  value?: number;
  icon?: string | null;
  showToolTip?: string | null;
  selected?: boolean;
  padding?: number | string;
  textStyle?:
    | 'textXLarge'
    | 'textLarge'
    | 'textRegular'
    | 'textMedium'
    | 'textSmall'
    | 'textXSmall'
    | null;
  iconSize?: number;
  iconGap?: number;
  dragsApp?: boolean;
  disabled?: boolean;
  size?: number;
  count?: number;
  state?: any;
  toolTipTimer?: React.RefObject<any>;
  onClick?: (value: number) => void;
  onToolTip?: (tip: ToolTip | null) => void;
}

function Option(props: TabOptionProps) {
  const theme = useTheme();
  const {
    label = 'Option',
    value = 0,
    icon = null,
    selected = false,
    onClick = () => null,
    onToolTip = () => null,
    padding = 8,
    iconSize = 24,
    iconGap = 6,
    dragsApp = false,
    textStyle = 'textRegular',
    disabled = false,
    showToolTip = null,
    state = null,
    size = 1,
    count = 0,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const doDrag = useRef<boolean | null>(null);
  const xStart = useRef<number | null>(null);
  const yStart = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      doDrag.current = true;
      if (dragsApp && xStart.current && yStart.current) {
        const win: any = window;
        const x = e.clientX - xStart.current;
        const y = e.clientY - yStart.current;
        win.electronAPI.appDrag({ x, y }); // sends electron the x/y mouse move deltas
      }
    },
    [dragsApp],
  );

  // end of function to allow tab bar area to be dragged and drag the
  // electron app window.
  // ****
  const handleMouseUp = useCallback(() => {
    if (doDrag.current !== true || !dragsApp) {
      if (!disabled) onClick(value);
    }
    doDrag.current = null;
    xStart.current = null;
    yStart.current = null;
    const docEl = document.documentElement;
    docEl?.removeEventListener('mousemove', handleMouseMove, false);
    docEl?.removeEventListener('mouseup', handleMouseUp, false);
  }, [disabled, dragsApp, handleMouseMove, onClick, value]);

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      doDrag.current = null;
      xStart.current = e.clientX;
      yStart.current = e.clientY;
      const docEl = document.documentElement;
      docEl?.addEventListener('mousemove', handleMouseMove, false);
      docEl?.addEventListener('mouseup', handleMouseUp, false);
    },
    [handleMouseMove, handleMouseUp],
  );

  // ****
  // we use this to move the app window if electron and dragsApp set to true
  // this enables the user to use the tab bar area to drag the electron app window
  useEffect(() => {
    const el = ref.current;
    el?.addEventListener('mousedown', handleMouseDown, false);
    return () => {
      el?.removeEventListener('mousedown', handleMouseDown, false);
    };
  }, [disabled, state, handleMouseDown]);

  const iconColor = () => {
    if (!disabled && selected) return theme.lyraColors['core-button-primary'];
    return theme.lyraColors['core-text-primary'];
  };

  function handleMouseOver(e: any) {
    onToolTip(null);
    if (showToolTip && ref && ref.current) {
      const tip: ToolTip = {
        type: ToolTipType.button,
        payload: { label: showToolTip },
        event: e,
        ref,
      };
      onToolTip(tip);
    }
  }

  function handleMouseLeave(_e: any) {
    if (showToolTip) onToolTip(null);
  }
  return (
    <Styled.Option
      ref={ref}
      $padding={padding}
      $selected={disabled ? false : selected}
      $disabled={disabled}
      $textStyle={textStyle ? textStyle : theme.lyraType['body-l-regular']}
      $gap={iconGap}
      $size={size}
      $iconSize={iconSize}
      className={'noDrag'}
      onMouseEnter={(e) => handleMouseOver(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
      onMouseDown={() => (doDrag.current = null)}
      onMouseUp={() => (doDrag.current = null)}
    >
      {icon && (
        <div className="icon">
          <UIIcon name={icon} size={iconSize} strokeColor={iconColor()} />
        </div>
      )}

      {label}
      {count !== 0 && (
        <Badge variant={'light'} hideNull={false} count={count} />
      )}
    </Styled.Option>
  );
}
