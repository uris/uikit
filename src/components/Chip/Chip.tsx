import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../hooks';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { accessibleKeyDown } from '../../utils/functions/misc';
import { Icon } from '../Icon';
import { type ToolTip, ToolTipType } from '../sharedTypes';
import css from './Chip.module.css';
import type { ChipProps } from './_types';

export const Chip = React.memo((props: ChipProps) => {
	const theme = useTheme();

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
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';
	const [isFocused, setIsFocused] = useState<boolean>(focused);
	const [isHovered, setIsHovered] = useState<boolean>(false);

	// sync the focus flag from the controlled prop
	useEffect(() => setIsFocused(focused), [focused]);

	// forward click events while respecting the disabled state
	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!disabled) onClick(e);
		},
		[disabled, onClick],
	);

	// forward mouse down events while respecting the disabled state
	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!disabled) onMouseDown(e);
		},
		[disabled, onMouseDown],
	);

	// manage tooltip visibility and hover state together
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

	// resolve chip padding from variant and icon placement
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

	// resolve the current icon color from theme and interaction state
	const computedIconColor = useMemo(() => {
		if (iconColor) return iconColor;
		if (disabled) return theme.current.colors['core-icon-disabled'];
		if (isHovered) return theme.current.colors['core-link-primary'];
		if (isFocused) return theme.current.colors['core-link-primary'];
		return theme.current.colors['core-text-primary'];
	}, [iconColor, disabled, isFocused, isHovered, theme]);

	// compose CSS custom properties for chip spacing and colors
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
	useTrackRenders(props, 'Chip');
	/* END.DEBUG */

	return (
		<div
			id={divId}
			className={`${css.chip}${divClass}`}
			style={{ ...divStyle, ...cssVars }}
			onMouseDown={handleMouseDown}
			onKeyDown={(e) => accessibleKeyDown(e, () => handleClick(e as any))}
			onClick={handleClick}
			onMouseEnter={(e) => handleMouseEnter(true, e)}
			onMouseLeave={(e) => handleMouseEnter(false, e)}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			{...rest}
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
