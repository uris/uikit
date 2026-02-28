import React, { useMemo } from 'react';
import { useTheme } from '../../hooks';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import { accessibleKeyDown } from '../../util/utils';
import type { IconProps } from './_types';
import { STATIC_ICON_REGISTRY } from './iconRegistry';

export const Icon = React.memo((props: IconProps) => {
	const theme = useTheme();
	const {
		name = 'home',
		size = 20,
		stroke = 1.5,
		strokeColor = theme.colors['core-icon-primary'],
		fillColor = 'transparent',
		toggle = false,
		pointer = true,
		disabled = false,
		onClick = () => null,
	} = props;

	// memo cursor style
	const cursor = useMemo(() => {
		if (disabled) return 'default';
		return pointer ? 'pointer' : 'inherit';
	}, [disabled, pointer]);

	// memo icon style
	const iconStyle = useMemo(() => {
		return {
			cursor,
			userSelect: 'none' as const,
			WebkitUserSelect: 'none' as const,
			WebkitTapHighlightColor: 'transparent',
			outline: 'none',
			border: 0,
		} as React.CSSProperties;
	}, [cursor]);

	const variantKey = toggle ? 'lineOn' : 'line';
	const iconVariant = STATIC_ICON_REGISTRY.get(name);
	const shape = iconVariant?.[variantKey] ?? iconVariant?.line;

	/* START.DEBUG */
	useTrackRenders(props, 'Icon');
	/* END.DEBUG */

	if (!shape) return null;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 20 20"
			style={iconStyle}
			onClick={(e) => onClick(e)}
			fill={fillColor}
			role="img"
			aria-label={`${name} icon`}
			tabIndex={pointer && !disabled ? 0 : -1}
			onKeyDown={(e) => accessibleKeyDown(e, () => onClick)}
			opacity={disabled ? 0.5 : 1}
		>
			<title>{name} icon</title>
			{shape({ stroke, strokeColor, fillColor })}
		</svg>
	);
});

Icon.displayName = 'Icon';
