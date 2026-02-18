import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { Icon, type IconNames } from "../Icon/Icon";
import { type ToolTip, ToolTipType } from "../sharedTypes";
import * as Styled from "./_Styles";

export interface UIChipProps {
	label?: string;
	icon?: IconNames | string;
	disabled?: boolean;
	focused?: boolean;
	tooltip?: string;
	background?: string;
	variant?: "small" | "regular";
	unframed?: boolean;
	iconRight?: boolean;
	iconColor?: string;
	onToolTip?: (tip: ToolTip | null) => void;
	onClick?: (e: React.MouseEvent<HTMLDivElement> | undefined) => void;
	onMouseDown?: (e: React.MouseEvent<HTMLDivElement> | undefined) => void;
}

export const UIChip = React.memo((props: UIChipProps) => {
	const {
		label,
		icon,
		background,
		disabled = false,
		focused = false,
		variant = "regular",
		unframed = false,
		iconRight = false,
		tooltip,
		iconColor,
		onToolTip = () => null,
		onClick = () => null,
		onMouseDown = () => null,
	} = props;
	const theme = useTheme();
	const [isFocused, setIsFocused] = useState<boolean>(focused);
	useEffect(() => setIsFocused(focused), [focused]);

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!disabled) onClick(e);
		},
		[disabled, onClick],
	);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!disabled) onMouseDown(e);
		},
		[disabled, onMouseDown],
	);

	const handleMouseEnter = useCallback(
		(enter: boolean, event: React.MouseEvent<HTMLDivElement>) => {
			if (enter && tooltip) {
				const tip: ToolTip = {
					type: ToolTipType.button,
					payload: { label: tooltip },
					ref: null,
					event,
				};
				onToolTip(tip);
			} else {
				onToolTip(null);
			}
		},
		[tooltip, onToolTip],
	);

	const padding = useMemo(() => {
		const isSmall = variant === "small";
		if (!icon) {
			return isSmall ? "6px" : "9px 16px 9px 16px";
		}
		if (icon && iconRight) {
			return isSmall ? "6px 6px 6px 10px" : "9px 12px 9px 16px";
		}
		return isSmall ? "6px 10px 6px 6px" : "9px 16px 9px 12px";
	}, [variant, icon, iconRight]);

	const computedIconColor = useMemo(() => {
		if (iconColor) return iconColor;
		if (disabled) return theme.lyraColors["core-icon-disabled"];
		if (isFocused) return theme.lyraColors["core-icon-tertiary"];
		return theme.lyraColors["core-icon-primary"];
	}, [iconColor, disabled, isFocused, theme]);

	return (
		<Styled.Chip
			$focused={isFocused}
			$disabled={disabled}
			$background={background}
			$variant={variant}
			$unframed={unframed}
			$padding={padding}
			onMouseDown={handleMouseDown}
			onClick={handleClick}
			onMouseEnter={(e) => handleMouseEnter(true, e)}
			onMouseLeave={(e) => handleMouseEnter(false, e)}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			tabIndex={0}
		>
			{icon && !iconRight && (
				<div className="icon">
					<Icon
						name={icon}
						size={variant === "regular" ? 20 : 16}
						strokeColor={computedIconColor}
					/>
				</div>
			)}
			<div className="label">{label}</div>
			{icon && iconRight && (
				<div className="icon">
					<Icon
						name={icon}
						size={variant === "regular" ? 20 : 16}
						strokeColor={computedIconColor}
					/>
				</div>
			)}
		</Styled.Chip>
	);
});
