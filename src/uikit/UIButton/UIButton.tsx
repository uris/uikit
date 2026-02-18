import type { Transition, Variants } from "motion/react";
import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState,
} from "react";
import { useTheme } from "styled-components";
import { Badge } from "../Badge/Badge";
import { Dot } from "../Dot/Dot";
import { ProgressIndicator } from "../Progress/ProgressIndicator/ProgressIndicator";
import { Icon } from "../Icon/Icon";
import { type ToolTip, ToolTipType } from "../sharedTypes";
import * as Styled from "./_Styles";

export interface UIButtonProps {
	size?: "large" | "medium" | "text";
	variant?: "solid" | "outline" | "text";
	state?: "normal" | "hover" | "disabled";
	width?: "auto" | "100%" | "fill" | string;
	fontSize?: "xsmall" | "small" | "medium" | "large";
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

// Extract static font size configuration
const FONT_SIZES: Record<string, number> = {
	large: 16,
	medium: 15,
	small: 14,
	xsmall: 12,
};

const UIButtonComponent = forwardRef<UIButtonHandle, UIButtonProps>(
	(props, buttonRef: React.Ref<UIButtonHandle>) => {
		const theme = useTheme();
		const {
			size = "medium",
			variant = "outline",
			label = undefined,
			iconRight = undefined,
			iconLeft = undefined,
			count = props.count !== undefined ? Number(props.count) : undefined,
			showDot = undefined,
			tooltip = undefined,
			round = false,
			state = "normal",
			fill = false,
			link = false,
			iconSize = props.iconSize !== undefined ? Number(props.iconSize) : 20,
			width = "auto",
			underline = false,
			borderRadius = undefined,
			iconColor = undefined,
			bgColor = undefined,
			bgColorDisabled = undefined,
			labelColor = undefined,
			fontSize = "small",
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

		const [btnState, setBtnState] = useState<"normal" | "hover" | "disabled">(
			state,
		);
		const [playing, setPlaying] = useState<boolean>(working);
		const ref = useRef<HTMLDivElement | null>(null);

		const handleClick = useCallback(
			(e: React.MouseEvent<any> | undefined) => {
				onToolTip(null);
				if (state === "disabled") return;
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

		// Memoize color styles
		const colorStyles = useMemo(() => {
			const styles = {
				solid: {
					border: "0px",
					iconColor: {
						normal: iconColor || theme.lyraColors["core-text-light"],
						hover: iconColor || theme.lyraColors["core-text-light"],
						disabled: iconColor || theme.lyraColors["core-text-disabled"],
					},
					background: {
						normal:
							bgColor ||
							(destructive
								? theme.lyraColors["feedback-warning"]
								: theme.lyraColors["core-button-primary"]),
						hover:
							bgColor ||
							(destructive
								? theme.lyraColors["feedback-warning"]
								: theme.lyraColors["core-button-primary"]),
						disabled:
							bgColorDisabled || theme.lyraColors["core-button-disabled"],
					},
					borderColor: {
						normal: "transparent",
						hover: "transparent",
						disabled: "transparent",
					},
					color: {
						normal:
							labelColor ||
							(destructive
								? theme.lyraColors["feedback-warning"]
								: theme.lyraColors["core-text-light"]),
						hover:
							labelColor ||
							(destructive
								? theme.lyraColors["feedback-warning"]
								: theme.lyraColors["core-text-light"]),
						disabled: theme.lyraColors["core-text-disabled"],
					},
				},
				outline: {
					border: "1px",
					iconColor: {
						normal:
							iconColor ||
							(destructive
								? theme.lyraColors["feedback-warning"]
								: theme.lyraColors["core-text-primary"]),
						hover:
							iconColor ||
							(destructive
								? theme.lyraColors["feedback-warning"]
								: theme.lyraColors["core-button-primary"]),
						disabled: iconColor || theme.lyraColors["core-text-disabled"],
					},
					background: {
						normal: bgColor || theme.lyraColors["core-surface-primary"],
						hover: bgColor || theme.lyraColors["core-surface-primary"],
						disabled:
							bgColorDisabled || theme.lyraColors["core-surface-primary"],
					},
					borderColor: {
						normal: destructive
							? theme.lyraColors["feedback-warning"]
							: theme.lyraColors["core-outline-primary"],
						hover: destructive
							? theme.lyraColors["feedback-warning"]
							: theme.lyraColors["core-outline-primary"],
						disabled: theme.lyraColors["core-outline-primary"],
					},
					color: {
						normal:
							labelColor ||
							(destructive
								? theme.lyraColors["feedback-warning"]
								: theme.lyraColors["core-text-primary"]),
						hover:
							labelColor ||
							(destructive
								? theme.lyraColors["feedback-warning"]
								: theme.lyraColors["core-button-primary"]),
						disabled: theme.lyraColors["core-text-disabled"],
					},
				},
				text: {
					border: "1px",
					iconColor: {
						normal: link
							? theme.lyraColors["core-button-primary"]
							: destructive
								? theme.lyraColors["feedback-warning"]
								: theme.lyraColors["core-text-primary"],
						hover: theme.lyraColors["core-button-primary"],
						disabled: theme.lyraColors["core-text-disabled"],
					},
					background: {
						normal: "transparent",
						hover: "transparent",
						disabled: "transparent",
					},
					borderColor: {
						normal: "transparent",
						hover: "transparent",
						disabled: "transparent",
					},
					color: {
						normal:
							labelColor ||
							(link
								? theme.lyraColors["core-button-primary"]
								: destructive
									? theme.lyraColors["feedback-warning"]
									: theme.lyraColors["core-text-primary"]),
						hover: theme.lyraColors["core-button-primary"],
						disabled: theme.lyraColors["core-text-disabled"],
					},
				},
			};
			return styles;
		}, [
			theme,
			iconColor,
			bgColor,
			bgColorDisabled,
			labelColor,
			destructive,
			link,
		]);

		// Memoize sizing styles
		const sizingStyles = useMemo(() => {
			const computedFontSize = FONT_SIZES[fontSize] || 16;
			return {
				large: {
					height: 48,
					gap: 8,
					iconSize,
					paddingLeft: round ? 0 : iconLeft ? 20 : 24,
					paddingRight: round ? 0 : iconRight ? 20 : 24,
					width: round ? "48px" : width || "auto",
					fontSize: computedFontSize,
					fontWeight: 480,
					borderRadius: borderRadius ?? "500px",
				},
				medium: {
					height: 36,
					gap: 8,
					iconSize,
					paddingLeft: round ? 0 : iconLeft ? 20 : 24,
					paddingRight: round ? 0 : iconRight ? 20 : 24,
					width: round ? "36px" : width || "auto",
					fontSize: computedFontSize,
					fontWeight: 480,
					borderRadius: borderRadius ?? "500px",
				},
				text: {
					height: 20,
					gap: 8,
					iconSize,
					paddingLeft: 0,
					paddingRight: 0,
					width,
					fontSize: computedFontSize,
					fontWeight: 480,
					borderRadius: 0,
				},
			};
		}, [iconSize, round, iconLeft, iconRight, width, fontSize, borderRadius]);

		// Memoize handleMouseEnter
		const handleMouseEnter = useCallback(
			(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
				if (btnState !== "disabled") setBtnState("hover");
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
			if (btnState !== "disabled") setBtnState("normal");
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
					? theme.lyraColors["core-surface-primary"]
					: colorStyles[variant].background[state],
				paddingRight: paddingRight ?? sizingStyles[size].paddingRight,
				paddingLeft: paddingLeft ?? sizingStyles[size].paddingLeft,
				fontFamily: "Booton",
				fontSize: sizingStyles[size].fontSize,
				fontWeight: sizingStyles[size].fontWeight,
				borderRadius: sizingStyles[size].borderRadius,
				width: width === "fill" ? "unset" : sizingStyles[size].width,
				height: sizingStyles[size].height,
				minWidth: width === "fill" ? "unset" : sizingStyles[size].width,
				maxHeight: sizingStyles[size].height,
				minHeight: sizingStyles[size].height,
				flex: width === "fill" ? 1 : "unset",
				gap: sizingStyles[size].gap,
				borderWidth: colorStyles[variant].border,
				borderStyle: "solid" as const,
				borderColor: colorStyles[variant].borderColor[btnState],
				cursor:
					state === "disabled" ? ("default" as const) : ("pointer" as const),
				transition: "all 0s ease-in-out 0s",
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

		// Memoize icon stroke color
		const iconStrokeColor = useMemo(
			() =>
				state === "disabled"
					? colorStyles[variant].iconColor[btnState]
					: destructive
						? theme.lyraColors["feedback-warning"]
						: colorStyles[variant].iconColor[btnState],
			[state, colorStyles, variant, btnState, destructive, theme],
		);

		// Memoize progress color
		const progressColor = useMemo(
			() =>
				destructive
					? theme.lyraColors["feedback-warning"]
					: colorStyles[variant].color[btnState],
			[destructive, theme, colorStyles, variant, btnState],
		);

		return (
			<Styled.Button
				ref={ref}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className="noselect"
				$underline={underline}
				style={buttonStyle}
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
						pointer={state !== "disabled"}
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
				{shouldShowLabel && <div className="label">{label}</div>}
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
						pointer={state !== "disabled"}
					/>
				)}
				<Dot show={!playing && showDot} />
				{!playing && count && (
					<div className="count">
						<Badge variant={"light"} count={Number(count)} />
					</div>
				)}
			</Styled.Button>
		);
	},
) as React.ForwardRefExoticComponent<
	UIButtonProps & React.RefAttributes<UIButtonHandle>
>;

UIButtonComponent.displayName = "UIButton";

export const UIButton = React.memo(UIButtonComponent);
