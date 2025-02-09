import { useTheme } from 'styled-components';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Transition, Variants } from 'framer-motion';
import { UIIcon } from '../../../uikit/UIIcon/UIIcon';
import { ProgressIndicator } from '../../Progress/ProgressIndicator/ProgressIndicator';
import { Dot } from '../../../uikit/Dot/Dot';
import { Badge } from '../../../uikit/Badge/Badge';
import { ToolTip, ToolTipType } from '../../sharedTypes';
import * as Styled from './_Styles';

export interface UIButtonProps {
  size?: 'large' | 'medium' | 'text';
  variant?: 'solid' | 'outline' | 'text';
  state?: 'normal' | 'hover' | 'disabled';
  width?: 'auto' | '100%' | 'fill' | string;
  fontSize?: 'xsmall' | 'small' | 'medium' | 'large';
  label?: string;
  iconRight?: string;
  iconLeft?: string;
  fill?: boolean;
  count?: number;
  showDot?: boolean;
  round?: boolean;
  tooltip?: string;
  link?: boolean;
  iconSize?: number;
  borderRadius?: number;
  iconColor?: string;
  bgColor?: string;
  bgColorDisabled?: string;
  labelColor?: string;
  transition?: Transition;
  variants?: Variants;
  initial?: string;
  animate?: string;
  exit?: string;
  underline?: boolean;
  progress?: boolean;
  working?: boolean;
  duration?: number;
  trigger?: boolean;
  destructive?: boolean;
  onToolTip?: (tip: ToolTip | null) => void;
  onClick?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined,
  ) => void;
}

export interface UIButtonHandle {
  triggerClick: () => void;
}

const UIButton = forwardRef<UIButtonHandle, UIButtonProps>(
  (props, buttonRef) => {
    const theme = useTheme();
    const {
      size = 'medium',
      variant = 'outline',
      label = undefined,
      iconRight = undefined,
      iconLeft = undefined,
      count = props.count !== undefined ? Number(props.count) : undefined,
      showDot = undefined,
      tooltip = undefined,
      round = false,
      state = 'normal',
      fill = false,
      link = false,
      iconSize = props.iconSize !== undefined ? Number(props.iconSize) : 20,
      width = 'auto',
      underline = false,
      borderRadius = undefined,
      iconColor = undefined,
      bgColor = undefined,
      bgColorDisabled = undefined,
      labelColor = undefined,
      fontSize = 'small',
      transition = undefined,
      variants = undefined,
      initial = undefined,
      animate = undefined,
      exit = undefined,
      progress = false,
      working = false,
      duration = undefined,
      trigger = false,
      destructive = false,
      onClick = () => null,
      onToolTip = () => null,
    } = props;

    const [btnState, setBtnState] = useState<'normal' | 'hover' | 'disabled'>(
      state,
    );
    const [playing, setPlaying] = useState<boolean>(working);
    const ref = useRef<HTMLDivElement | null>(null);
    const handleClick = useCallback(
      (e: React.MouseEvent<any> | undefined) => {
        onToolTip(null);
        if (state === 'disabled') return;
        if (progress && duration) {
          setPlaying(true);
        } else {
          onClick(e);
        }
      },
      [onToolTip, state, progress, duration, onClick],
    );
    useEffect(() => setBtnState(state), [state]);
    useEffect(() => setPlaying(working), [working]);

    useImperativeHandle(buttonRef, () => ({
      triggerClick: () => handleClick(undefined),
    }));

    useEffect(() => {
      if (trigger) handleClick(undefined);
    }, [trigger, handleClick]);

    const colorStyles: any = {
      solid: {
        border: '0px',
        iconColor: {
          normal: iconColor ? iconColor : theme.colors.white,
          hover: iconColor ? iconColor : theme.colors.white,
          disabled: iconColor ? iconColor : theme.colors.textDisabled,
        },
        background: {
          normal: bgColor
            ? bgColor
            : destructive
              ? theme.colors.labelRedBG
              : theme.colors.primaryBlue,
          hover: bgColor
            ? bgColor
            : destructive
              ? theme.colors.labelRedBG
              : theme.colors.primaryBlue,
          disabled: bgColorDisabled
            ? bgColorDisabled
            : theme.name === 'lightMode'
              ? theme.colors.bgDark
              : theme.colors.bgMedium,
        },
        borderColor: {
          normal: theme.colors.transparent,
          hover: theme.colors.transparent,
          disabled: theme.colors.transparent,
        },
        color: {
          normal: labelColor
            ? labelColor
            : destructive
              ? theme.colors.labelRedText
              : theme.colors.white,
          hover: labelColor
            ? labelColor
            : destructive
              ? theme.colors.labelRedText
              : theme.colors.white,
          disabled: theme.colors.textDisabled,
        },
      },
      outline: {
        border: '1px',
        iconColor: {
          normal: iconColor
            ? iconColor
            : destructive
              ? theme.colors.labelRedText
              : theme.colors.textPrimary,
          hover: iconColor
            ? iconColor
            : destructive
              ? theme.colors.labelRedText
              : theme.colors.primaryBlue,
          disabled: iconColor ? iconColor : theme.colors.textDisabled,
        },
        background: {
          normal: theme.colors.transparent,
          hover: theme.colors.transparent,
          disabled: theme.colors.transparent,
        },
        borderColor: {
          normal: bgColor
            ? bgColor
            : destructive
              ? theme.colors.labelRedText
              : theme.colors.lightBorder,
          hover: bgColor
            ? bgColor
            : destructive
              ? theme.colors.destructivePrimary
              : theme.colors.lightBorder,
          disabled: bgColorDisabled
            ? bgColorDisabled
            : bgColor
              ? bgColor
              : theme.colors.lightBorder,
        },
        color: {
          normal: labelColor
            ? labelColor
            : destructive
              ? theme.colors.destructivePrimary
              : theme.colors.textPrimary,
          hover: labelColor
            ? labelColor
            : destructive
              ? theme.colors.destructivePrimary
              : theme.colors.primaryBlue,
          disabled: theme.colors.textDisabled,
        },
      },
      text: {
        border: '1px',
        iconColor: {
          normal: link
            ? theme.colors.primaryBlue
            : destructive
              ? theme.colors.labelRedText
              : theme.colors.textPrimary,
          hover: theme.colors.primaryBlue,
          disabled: theme.colors.textDisabled,
        },
        background: {
          normal: theme.colors.transparent,
          hover: theme.colors.transparent,
          disabled: theme.colors.transparent,
        },
        borderColor: {
          normal: theme.colors.transparent,
          hover: theme.colors.transparent,
          disabled: theme.colors.transparent,
        },
        color: {
          normal: labelColor
            ? labelColor
            : link
              ? theme.colors.primaryBlue
              : destructive
                ? theme.colors.destructivePrimary
                : theme.colors.textPrimary,
          hover: theme.colors.primaryBlue,
          disabled: theme.colors.textDisabled,
        },
      },
    };

    const FONT_SIZES: Record<string, number> = {
      large: 16,
      medium: 15,
      small: 14,
      xsmall: 12,
    };
    const setFontSize = () => Number(FONT_SIZES[fontSize] || 16);

    const sizingStyles: any = {
      large: {
        height: 48,
        gap: 8,
        iconSize,
        paddingLeft: round ? 0 : iconLeft ? 20 : 24,
        paddingRight: round ? 0 : iconRight ? 20 : 24,
        width: round ? '48px' : width ? width : 'auto',
        fontSize: setFontSize(),
        fontWeight: 480,
        borderRadius: borderRadius ? borderRadius : '500px',
      },
      medium: {
        height: 36,
        gap: 8,
        iconSize,
        paddingLeft: round ? 0 : iconLeft ? 20 : 24,
        paddingRight: round ? 0 : iconRight ? 20 : 24,
        width: round ? '36px' : width ? width : 'auto',
        fontSize: setFontSize(),
        fontWeight: 480,
        borderRadius: borderRadius ? borderRadius : '500px',
      },
      text: {
        height: 20,
        gap: 8,
        iconSize,
        paddingLeft: 0,
        paddingRight: 0,
        width,
        fontSize: setFontSize(),
        fontWeight: 480,
        borderRadius: 0,
      },
    };

    function handleMouseEnter(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
      if (btnState !== 'disabled') setBtnState('hover');
      if (!ref || !ref.current || !tooltip) return;
      const tip: ToolTip = {
        type: ToolTipType.button,
        payload: { label: tooltip },
        event: e,
        ref,
      };
      onToolTip(tip);
    }

    function handleMouseLeave() {
      if (btnState !== 'disabled') setBtnState('normal');
      if (!ref?.current || !tooltip) return;
      if (tooltip) onToolTip(null);
    }

    function handleDidStop() {
      setPlaying(false);
      onClick(undefined);
    }

    function showLabel() {
      return !(playing && !iconLeft && !iconRight) && Boolean(label);
    }

    return (
      <Styled.Button
        ref={ref}
        onMouseEnter={(e) => handleMouseEnter(e)}
        onMouseLeave={() => handleMouseLeave()}
        className="noselect"
        $underline={underline}
        style={{
          color: colorStyles[variant].color[btnState],
          background: fill
            ? theme.colors.bgNormal
            : colorStyles[variant].background[state],
          paddingRight: sizingStyles[size].paddingRight,
          paddingLeft: sizingStyles[size].paddingLeft,
          fontFamily: 'Booton',
          fontSize: sizingStyles[size].fontSize,
          fontWeight: sizingStyles[size].fontWeight,
          borderRadius: sizingStyles[size].borderRadius,
          width: width === 'fill' ? 'unset' : sizingStyles[size].width,
          height: sizingStyles[size].height,
          minWidth: width === 'fill' ? 'unset' : sizingStyles[size].width,
          maxHeight: sizingStyles[size].height,
          minHeight: sizingStyles[size].height,
          flex: width === 'fill' ? 1 : 'unset',
          gap: sizingStyles[size].gap,
          borderWidth: colorStyles[variant].border,
          borderStyle: 'solid',
          borderColor: colorStyles[variant].borderColor[btnState],
          cursor: state === 'disabled' ? 'default' : 'pointer',
          transition: 'all 0s ease-in-out 0s',
        }}
        transition={transition}
        variants={variants}
        initial={initial}
        animate={animate}
        exit={exit}
        onClick={(e) => handleClick(e)}
      >
        {!playing && iconLeft && (
          <UIIcon
            name={iconLeft}
            size={sizingStyles[size].iconSize}
            strokeColor={
              destructive
                ? theme.colors.destructivePrimary
                : colorStyles[variant].iconColor[btnState]
            }
            pointer={state === 'disabled' ? false : true}
          />
        )}
        {playing && iconLeft && (
          <ProgressIndicator
            show={playing}
            didStop={() => handleDidStop()}
            duration={duration}
            size={sizingStyles[size].iconSize}
            color={
              destructive
                ? theme.colors.destructivePrimary
                : colorStyles[variant].color[btnState]
            }
            inline
          />
        )}
        {playing && !iconLeft && !iconRight && (
          <ProgressIndicator
            show={playing}
            didStop={() => handleDidStop()}
            duration={duration}
            size={sizingStyles[size].iconSize}
            color={
              destructive
                ? theme.colors.destructivePrimary
                : colorStyles[variant].color[btnState]
            }
            inline={false}
          />
        )}
        {showLabel() && <div className="label">{label}</div>}
        {playing && iconRight && (
          <ProgressIndicator
            show={playing}
            didStop={() => handleDidStop()}
            duration={duration}
            size={sizingStyles[size].iconSize}
            color={
              destructive
                ? theme.colors.destructivePrimary
                : colorStyles[variant].color[btnState]
            }
            inline
          />
        )}
        {!playing && iconRight && (
          <UIIcon
            name={iconRight}
            size={sizingStyles[size].iconSize}
            strokeColor={
              destructive
                ? theme.colors.destructivePrimary
                : colorStyles[variant].iconColor[btnState]
            }
            pointer={state === 'disabled' ? false : true}
          />
        )}
        <Dot show={!playing && showDot} />
        {!playing && count && (
          <div className="count">
            <Badge variant={'light'} count={Number(count)} />
          </div>
        )}
      </Styled.Button>
    );
  },
);

UIButton.displayName = 'UIButton';

export { UIButton };
