import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../hooks';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import { Icon } from '../Icon';
import type { IconNames } from '../Icon/_types';
import { type ToolTip, ToolTipType } from '../sharedTypes';
import css from './UIChip.module.css';
import type { UIChipProps } from './_types';

export const UIChip = React.memo((props: UIChipProps) => {
	const {
		label,
		icon,
		background,
		disabled = false,
		focused = false,
		variant = 'regular',
		unframed = false,
		iconRight = false,
		labelSize = 'm',
		tooltip,
		iconColor,
		onToolTip = () => null,
		onClick = () => null,
		onMouseDown = () => null,
	} = props;
	const theme = useTheme();
	const [isFocused, setIsFocused] = useState<boolean>(focused);
	const [isHovered, setIsHovered] = useState<boolean>(false);
	useEffect(() => setIsFocused(focused), [focused]);

	// click handler
	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!disabled) onClick(e);
		},
		[disabled, onClick],
	);

	// handle mouse down
	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!disabled) onMouseDown(e);
		},
		[disabled, onMouseDown],
	);

	// handle mouse enter / leave
	const handleMouseEnter = useCallback(
		(enter: boolean, event: React.MouseEvent<HTMLDivElement>) => {
			if (enter) {
				if (tooltip) {
					const tip: ToolTip = {
						type: ToolTipType.button,
						payload: { label: tooltip },
						ref: null,
						event,
					};
					onToolTip(tip);
				}
				setIsHovered(true);
			} else {
				onToolTip(null);
				setIsHovered(false);
			}
		},
		[tooltip, onToolTip],
	);

	// memo padding
	const padding = useMemo(() => {
		const isSmall = variant === 'small';
		if (!icon) {
			return isSmall ? '6px' : '9px 16px 9px 16px';
		}
		if (icon && iconRight) {
			return isSmall ? '6px 6px 6px 10px' : '9px 12px 9px 16px';
		}
		return isSmall ? '6px 10px 6px 6px' : '9px 16px 9px 12px';
	}, [variant, icon, iconRight]);

	// memo icon color
	const computedIconColor = useMemo(() => {
		if (iconColor) return iconColor;
		if (disabled) return theme.current.colors['core-icon-disabled'];
		if (isHovered) return theme.current.colors['core-link-primary'];
		if (isFocused) return theme.current.colors['core-link-primary'];
		return theme.current.colors['core-text-primary'];
	}, [iconColor, disabled, isFocused, isHovered, theme]);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--ui-chip-padding': padding,
			'--ui-chip-background': background || 'transparent',
			'--ui-chip-gap': variant === 'small' ? '4px' : '8px',
			'--ui-chip-color': computedIconColor,
			'--ui-chip-border-radius': variant === 'small' ? '4px' : '8px',
			'--ui-chip-border': unframed ? '0' : '1px',
			'--ui-chip-border-color': unframed ? 'transparent' : computedIconColor,
		} as React.CSSProperties;
	}, [padding, background, variant, unframed, computedIconColor]);

	/* START.DEBUG */
	useTrackRenders(props, 'UIChip');
	/* END.DEBUG */

	return (
		<div
			className={css.chip}
			style={cssVars}
			onMouseDown={handleMouseDown}
			onKeyDown={() => null}
			onClick={handleClick}
			onMouseEnter={(e) => handleMouseEnter(true, e)}
			onMouseLeave={(e) => handleMouseEnter(false, e)}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
		>
			{icon && !iconRight && (
				<div className={css.icon}>
					<Icon
						name={icon}
						size={variant === 'regular' ? 20 : 16}
						strokeColor={computedIconColor}
					/>
				</div>
			)}
			<div className={css[labelSize]}>{label}</div>
			{icon && iconRight && (
				<div className={css.icon}>
					<Icon
						name={icon}
						size={variant === 'regular' ? 20 : 16}
						strokeColor={computedIconColor}
					/>
				</div>
			)}
		</div>
	);
});
