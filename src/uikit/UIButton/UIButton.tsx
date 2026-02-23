import { type Transition, type Variants, motion } from 'motion/react';
import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTheme } from '../../hooks';
import { Badge } from '../Badge';
import { Dot } from '../Dot';
import { Icon } from '../Icon';
import { ProgressIndicator } from '../Progress';
import { type ToolTip, ToolTipType } from '../sharedTypes';
import css from './UIButton.module.css';

export interface UIButtonProps {
	size?: 'large' | 'medium' | 'text';
	variant?: 'solid' | 'outline' | 'text';
	state?: 'normal' | 'hover' | 'disabled';
	width?: string;
	label?: string;
	iconRight?: string;
	iconLeft?: string;
	fill?: boolean;
	count?: number;
	showDot?: boolean;
	round?: boolean;
	tooltip?: string;
	iconSize?: number;
	borderRadius?: number;
	iconColor?: string;
	bgColor?: string;
	bgColorDisabled?: string;
	labelColor?: string;
	labelSize?: 's' | 'm' | 'l';
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
	paddingRight?: number;
	paddingLeft?: number;
	onToolTip?: (tip: ToolTip | null) => void;
	onClick?: (
		e: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined,
	) => void;
}

export interface UIButtonHandle {
	triggerClick: () => void;
}

const UIButtonComponent = forwardRef<UIButtonHandle, UIButtonProps>(
	(props, buttonRef: React.Ref<UIButtonHandle>) => {
		const theme = useTheme();
		const {
			size = 'medium',
			variant = 'outline',
			label = undefined,
			labelSize = 'm',
			iconRight = undefined,
			iconLeft = undefined,
			count = props.count === undefined ? undefined : Number(props.count),
			showDot = undefined,
			tooltip = undefined,
			round = false,
			state = 'normal',
			fill = false,
			iconSize = props.iconSize === undefined ? 20 : Number(props.iconSize),
			width = 'auto',
			underline = false,
			borderRadius = undefined,
			iconColor = undefined,
			bgColor = undefined,
			bgColorDisabled = undefined,
			labelColor = undefined,
			transition = undefined,
			variants = undefined,
			initial = undefined,
			animate = undefined,
			exit = undefined,
			paddingRight = undefined,
			paddingLeft = undefined,
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
		const [btnWidth, setBtnWidth] = useState<number | string | undefined>(
			undefined,
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

		// memo button width - note the inclusion of unnecessary dependencies for story book purposes
		// biome-ignore lint/correctness/useExhaustiveDependencies: avoid expensive observers
		useEffect(() => {
			if (!variant || !size || !labelSize) return;
			if (ref?.current) setBtnWidth(ref.current.offsetWidth);
			else setBtnWidth(width);
		}, [width, variant, labelSize, size, iconLeft, iconRight]);

		useImperativeHandle(buttonRef, () => ({
			triggerClick: () => handleClick(undefined),
		}));

		useEffect(() => {
			if (trigger) handleClick(undefined);
		}, [trigger, handleClick]);

		// memo destructive check
		const destructiveColor = useCallback(
			(icon: boolean) => {
				if (icon && variant === 'solid') {
					return theme.colors['core-text-light'];
				}
				if (destructive) return theme.colors['feedback-warning'];
				return theme.colors['core-text-primary'];
			},
			[destructive, theme, variant],
		);

		// memo solid styles
		const solid = useMemo(() => {
			return {
				border: '0px',
				iconColor: {
					normal: iconColor || destructiveColor(true),
					hover: iconColor || destructiveColor(true),
					disabled: iconColor || destructiveColor(true),
				},
				background: {
					normal:
						bgColor ||
						(destructive
							? 'var(--feedback-warning)'
							: 'var(--core-button-primary)'),
					hover:
						bgColor ||
						(destructive
							? 'var(--feedback-warning)'
							: 'var(--core-button-primary)'),
					disabled: bgColorDisabled || 'var(--core-button-disabled)',
				},
				borderColor: {
					normal: 'transparent',
					hover: 'transparent',
					disabled: 'transparent',
				},
				color: {
					normal:
						labelColor || (destructive ? 'white' : 'var(--core-text-light)'),
					hover:
						labelColor || (destructive ? 'white' : 'var(--core-text-light)'),
					disabled: 'var(--core-text-disabled)',
				},
			};
		}, [
			labelColor,
			destructive,
			destructiveColor,
			bgColor,
			bgColorDisabled,
			iconColor,
		]);

		// memo outline styles
		const outline = useMemo(() => {
			return {
				border: '1px',
				iconColor: {
					normal: iconColor || destructiveColor(true),
					hover: iconColor || destructiveColor(true),
					disabled: iconColor || 'var(--core-text-disabled)',
				},
				background: {
					normal: bgColor || 'var(--core-surface-primary)',
					hover: bgColor || 'var(--core-surface-primary)',
					disabled: bgColorDisabled || 'var(--core-surface-primary)',
				},
				borderColor: {
					normal: destructive
						? 'var(--feedback-warning)'
						: 'var(--core-outline-primary)',
					hover: destructive
						? 'var(--feedback-warning)'
						: 'var(--core-outline-primary)',
					disabled: 'var(--core-outline-primary)',
				},
				color: {
					normal:
						labelColor ||
						(destructive
							? 'var(--feedback-warning)'
							: 'var(--core-text-primary)'),
					hover:
						labelColor ||
						(destructive
							? 'var(--feedback-warning)'
							: 'var(--core-button-primary)'),
					disabled: 'var(--core-text-disabled)',
				},
			};
		}, [
			iconColor,
			destructive,
			bgColor,
			bgColorDisabled,
			labelColor,
			destructiveColor,
		]);

		// memo text styles
		const text = useMemo(() => {
			return {
				border: '1px',
				iconColor: {
					normal: destructiveColor(true),
					hover: destructiveColor(true),
					disabled: 'var(--core-text-disabled)',
				},
				background: {
					normal: 'transparent',
					hover: 'transparent',
					disabled: 'transparent',
				},
				borderColor: {
					normal: 'transparent',
					hover: 'transparent',
					disabled: 'transparent',
				},
				color: {
					normal: labelColor || destructiveColor(false),
					hover: labelColor || destructiveColor(false),
					disabled: 'var(--core-text-disabled)',
				},
			};
		}, [destructiveColor, labelColor]);

		// memo color styles
		const colorStyles = useMemo(() => {
			return {
				solid,
				outline,
				text,
			};
		}, [solid, outline, text]);

		// Memoize sizing styles
		const setPadding = useCallback(
			(side: 'left' | 'right') => {
				if (round) return 0;
				if (side === 'left' && iconLeft) return 20;
				if (side === 'right' && iconRight) return 20;
				return 24;
			},
			[round, iconLeft, iconRight],
		);

		const sizingStyles = useMemo(() => {
			return {
				large: {
					height: 48,
					gap: 8,
					iconSize,
					paddingLeft: setPadding('left'),
					paddingRight: setPadding('right'),
					width: round ? '48px' : btnWidth || 'auto',
					borderRadius: borderRadius ?? '500px',
				},
				medium: {
					height: 36,
					gap: 8,
					iconSize,
					paddingLeft: setPadding('left'),
					paddingRight: setPadding('right'),
					width: round ? '36px' : btnWidth || 'auto',
					borderRadius: borderRadius ?? '500px',
				},
				text: {
					height: 20,
					gap: 8,
					iconSize,
					paddingLeft: 0,
					paddingRight: 0,
					btnWidth,
					borderRadius: 0,
				},
			};
		}, [iconSize, btnWidth, round, borderRadius, setPadding]);

		// Memoize handleMouseEnter
		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
				if (btnState !== 'disabled') setBtnState('hover');
				if (!ref?.current || !tooltip) return;
				const tip: ToolTip = {
					type: ToolTipType.button,
					payload: { label: tooltip },
					event: e,
					ref,
				};
				onToolTip(tip);
			},
			[btnState, tooltip, onToolTip],
		);

		// Memoize handleMouseLeave
		const handleMouseLeave = useCallback(() => {
			if (btnState !== 'disabled') setBtnState('normal');
			if (tooltip) onToolTip(null);
		}, [btnState, tooltip, onToolTip]);

		// Memoize handleDidStop
		const handleDidStop = useCallback(() => {
			setPlaying(false);
			onClick(undefined);
		}, [onClick]);

		// Memoize showLabel
		const shouldShowLabel = useMemo(
			() => !(playing && !iconLeft && !iconRight) && Boolean(label),
			[playing, iconLeft, iconRight, label],
		);

		// Memoize button styles
		const buttonStyle = useMemo(
			() => ({
				color: colorStyles[variant].color[btnState],
				background: fill
					? theme.colors['core-surface-primary']
					: colorStyles[variant].background[state],
				paddingRight: paddingRight ?? sizingStyles[size].paddingRight,
				paddingLeft: paddingLeft ?? sizingStyles[size].paddingLeft,
				borderRadius: sizingStyles[size].borderRadius,
				height: sizingStyles[size].height,
				maxHeight: sizingStyles[size].height,
				minHeight: sizingStyles[size].height,
				flex: width === 'fill' ? 1 : 'unset',
				gap: sizingStyles[size].gap,
				borderWidth: colorStyles[variant].border,
				borderStyle: 'solid' as const,
				borderColor: colorStyles[variant].borderColor[btnState],
				cursor:
					state === 'disabled' ? ('default' as const) : ('pointer' as const),
				transition: 'all 0s ease-in-out 0s',
			}),
			[
				colorStyles,
				variant,
				btnState,
				fill,
				theme,
				state,
				paddingRight,
				paddingLeft,
				sizingStyles,
				size,
				width,
			],
		);

		// memo icon stroke color
		const iconStrokeColor = useMemo(
			() => colorStyles[variant].iconColor[state],
			[colorStyles, variant, state],
		);

		// memo progress color
		const progressColor = useMemo(
			() =>
				destructive
					? theme.colors['feedback-warning']
					: colorStyles[variant].color[btnState],
			[destructive, theme, colorStyles, variant, btnState],
		);

		const setStyle = useCallback((value: string | number | undefined) => {
			if (value === undefined) return 'unset';
			if (typeof value === 'number') return `${value}px`;
			return value;
		}, []);

		const cssVars = useMemo(() => {
			return {
				'--ui-button-decoration': underline ? 'underline' : 'unset',
				'--ui-button-min-width': btnWidth ? setStyle(btnWidth) : 'unset',
			} as React.CSSProperties;
		}, [underline, btnWidth, setStyle]);

		return (
			<motion.div
				className={css.button}
				ref={ref}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={{ ...buttonStyle, ...cssVars }}
				transition={transition}
				variants={variants}
				initial={initial}
				animate={animate}
				exit={exit}
				onClick={handleClick}
			>
				{!playing && iconLeft && (
					<Icon
						name={iconLeft}
						size={sizingStyles[size].iconSize}
						strokeColor={iconStrokeColor}
						pointer={state !== 'disabled'}
					/>
				)}
				{playing && iconLeft && (
					<ProgressIndicator
						show={playing}
						didStop={handleDidStop}
						duration={duration}
						size={sizingStyles[size].iconSize}
						color={progressColor}
						inline
					/>
				)}
				{playing && !iconLeft && !iconRight && (
					<ProgressIndicator
						show={playing}
						didStop={handleDidStop}
						duration={duration}
						size={sizingStyles[size].iconSize}
						color={progressColor}
						inline={false}
					/>
				)}
				{shouldShowLabel && (
					<div className={`${css.label} ${css[labelSize]}`}>{label}</div>
				)}
				{playing && iconRight && (
					<ProgressIndicator
						show={playing}
						didStop={handleDidStop}
						duration={duration}
						size={sizingStyles[size].iconSize}
						color={progressColor}
						inline
					/>
				)}
				{!playing && iconRight && (
					<Icon
						name={iconRight}
						size={sizingStyles[size].iconSize}
						strokeColor={iconStrokeColor}
						pointer={state !== 'disabled'}
					/>
				)}
				<Dot show={!playing && showDot} />
				{!playing && count && (
					<div className={css.count}>
						<Badge variant={'light'} count={Number(count)} />
					</div>
				)}
			</motion.div>
		);
	},
);

UIButtonComponent.displayName = 'UIButton';

export const UIButton = React.memo(UIButtonComponent);
