import type { Transition, Variants } from "motion/react";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useTheme } from "styled-components";
import { Badge } from "../Badge/Badge";
import { Dot } from "../Dot/Dot";
import { Icon } from "../Icon/Icon";
import { type ToolTip, ToolTipType } from "../sharedTypes";
import * as Styled from "./_Styles";

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

export const IconButton = React.memo((props: IconButtonProps) => {
	const {
		frameSize = 36,
		iconSize = 20,
		icon = "more",
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

	// Memoize styles object
	const styles = useMemo(
		() => ({
			bgColor: bgColor || "transparent",
			bgColorOn: bgColorOn || theme.colors["core-surface-secondary"],
			bgColorHover: hover
				? theme.colors["core-surface-secondary"]
				: bgColorHover || bgColor,
			toggle,
			isToggled: toggle ? on : false,
			frameSize,
			fill,
			borderRadius,
		}),
		[
			bgColor,
			bgColorOn,
			theme,
			hover,
			bgColorHover,
			toggle,
			on,
			frameSize,
			fill,
			borderRadius,
		],
	);

	useEffect(() => setOn(isToggled), [isToggled]);

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (disabled) return;
			if (tooltip) onToolTip(null);
			setOn(!on);
			onClick(e);
		},
		[disabled, tooltip, onToolTip, on, onClick],
	);

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (!ref || !ref.current || !tooltip) return;
			const tip: ToolTip = {
				type: ToolTipType.button,
				payload: { label: tooltip },
				event: e,
				ref: ref,
			};
			onToolTip(tip);
		},
		[tooltip, onToolTip],
	);

	const handleMouseLeave = useCallback(() => {
		if (tooltip) onToolTip(null);
	}, [tooltip, onToolTip]);

	// Memoize icon stroke color
	const strokeColor = useMemo(
		() => color || theme.colors["core-icon-primary"],
		[color, theme],
	);
	const accentColor = useMemo(
		() => colorOn || theme.colors["core-icon-primary"],
		[colorOn, theme],
	);

	return (
		<Styled.IconButton
			$props={styles}
			onClick={handleClick}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			transition={transition}
			variants={variants}
			initial={initial}
			animate={animate}
			exit={exit}
			ref={ref}
		>
			<div className="icon" style={{ opacity: disabled ? 0.3 : 1 }}>
				<Icon
					name={icon}
					strokeColor={strokeColor}
					accentColor={accentColor}
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
					<Badge variant={"light"} count={count} hideNull />
				</div>
			)}
		</Styled.IconButton>
	);
});
