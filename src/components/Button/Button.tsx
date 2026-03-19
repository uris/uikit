import { motion } from 'motion/react';
import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { Badge } from '../Badge';
import { Dot } from '../Dot';
import { Icon } from '../Icon';
import { ProgressIndicator } from '../Progress';
import { ToolTipType } from '../sharedTypes';
import type { ToolTip } from '../sharedTypes';
import css from './Button.module.css';
import type { ButtonHandle, ButtonProps } from './_types';

const ButtonComponent = forwardRef<ButtonHandle, ButtonProps>(
	(props, buttonRef: React.Ref<ButtonHandle>) => {
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
			width = 'min-content',
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
			...divAttributes
		} = props;
		const { id: divId, className, style, ...rest } = divAttributes;
		const divStyle = style ?? ({} as React.CSSProperties);
		const divClass = className ? ` ${className}` : '';

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
				if (btnState === 'disabled') return;
				if (progress && duration) {
					setPlaying(true);
				} else {
					onClick(e);
				}
			},
			[onToolTip, btnState, progress, duration, onClick],
		);

		useEffect(() => setBtnState(state), [state]);
		useEffect(() => setPlaying(working), [working]);

		// memo button widths
		useEffect(() => {
			if (!variant || !size || !labelSize) return;
			if (ref?.current) setBtnWidth(ref.current.offsetWidth);
			else setBtnWidth(width);
		}, [width, variant, labelSize, size]);

		useImperativeHandle(buttonRef, () => ({
			triggerClick: () => handleClick(undefined),
		}));

		useEffect(() => {
			if (trigger) handleClick(undefined);
		}, [trigger, handleClick]);

		// memo destructive check
		const destructiveColor = useCallback(
			(icon: boolean) => {
				if (icon) {
					if (btnState === 'disabled') return 'var(--core-text-disabled)';
					if (variant === 'solid') return 'var(--core-text-light)';
				}
				if (destructive) return 'var(--feedback-warning)';
				return 'var(--core-text-primary)';
			},
			[destructive, variant, btnState],
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
					disabled: iconColor || destructiveColor(true),
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
							: 'var(--core-text-special)'),
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
					? 'var(--core-surface-primary)'
					: colorStyles[variant].background[state],
				paddingRight: paddingRight ?? sizingStyles[size].paddingRight,
				paddingLeft: paddingLeft ?? sizingStyles[size].paddingLeft,
				borderRadius: sizingStyles[size].borderRadius,
				height: sizingStyles[size].height,
				maxHeight: sizingStyles[size].height,
				minHeight: sizingStyles[size].height,
				flex: width === 'fill' ? 1 : 'unset',
				width: width && width !== 'fill' ? width : 'min-content',
				maxWidth: width && width !== 'fill' ? width : 'min-content',
				gap: sizingStyles[size].gap,
				borderWidth: colorStyles[variant].border,
				borderStyle: 'solid' as const,
				borderColor: colorStyles[variant].borderColor[btnState],
				cursor:
					state === 'disabled' ? ('default' as const) : ('pointer' as const),
				transition: 'all var(--motion-water-duration) var(--motion-water) 0s',
			}),
			[
				colorStyles,
				variant,
				btnState,
				fill,
				state,
				paddingRight,
				paddingLeft,
				sizingStyles,
				size,
				width,
			],
		);

		// memo progress color
		const progressColor = useMemo(
			() =>
				destructive
					? 'var(feedback-warning)'
					: colorStyles[variant].color[btnState],
			[destructive, colorStyles, variant, btnState],
		);

		const setStyle = useCallback((value: string | number | undefined) => {
			if (value === undefined) return 'unset';
			if (typeof value === 'number') return `${value}px`;
			return value;
		}, []);

		const iconDivSize = useMemo(() => {
			if (round) return `${buttonStyle.minHeight}px`;
			return iconSize ? setStyle(iconSize) : 'unset';
		}, [round, iconSize, buttonStyle, setStyle]);

		const cssVars = useMemo(() => {
			return {
				'--ui-button-decoration': underline ? 'underline' : 'unset',
				'--ui-button-min-width': btnWidth ? setStyle(btnWidth) : 'unset',
				'--ui-button-icon-size': iconDivSize,
			} as React.CSSProperties;
		}, [underline, btnWidth, setStyle, iconDivSize]);

		/* START.DEBUG */
		useTrackRenders(props, 'Button');
		/* END.DEBUG */

		return (
			<motion.div
				id={divId}
				className={`${css.button}${divClass}`}
				ref={ref}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				style={{ ...divStyle, ...buttonStyle, ...cssVars }}
				transition={transition}
				variants={variants}
				initial={initial}
				animate={animate}
				exit={exit}
				onClick={handleClick}
				{...(rest as any)}
			>
				{!playing && iconLeft && (
					<div className={css.icon}>
						<Icon
							name={iconLeft}
							size={sizingStyles[size].iconSize}
							strokeColor={colorStyles[variant].iconColor[btnState]}
							pointer={btnState !== 'disabled'}
						/>
					</div>
				)}
				{playing && iconLeft && (
					<div className={css.icon}>
						<ProgressIndicator
							show={playing}
							didStop={handleDidStop}
							duration={duration}
							size={sizingStyles[size].iconSize}
							color={progressColor}
							inline
						/>
					</div>
				)}
				{playing && !iconLeft && !iconRight && (
					<div className={css.icon}>
						<ProgressIndicator
							show={playing}
							didStop={handleDidStop}
							duration={duration}
							size={sizingStyles[size].iconSize}
							color={progressColor}
							inline={false}
						/>
					</div>
				)}
				{shouldShowLabel && (
					<div className={`${css.label} ${css[labelSize]}`}>{label}</div>
				)}
				{playing && iconRight && (
					<div className={css.icon}>
						<ProgressIndicator
							show={playing}
							didStop={handleDidStop}
							duration={duration}
							size={sizingStyles[size].iconSize}
							color={progressColor}
							inline
						/>
					</div>
				)}
				{!playing && iconRight && (
					<div className={css.icon}>
						<Icon
							name={iconRight}
							size={sizingStyles[size].iconSize}
							strokeColor={colorStyles[variant].iconColor[btnState]}
							pointer={btnState !== 'disabled'}
						/>
					</div>
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

ButtonComponent.displayName = 'Button';

export const Button = React.memo(ButtonComponent);
