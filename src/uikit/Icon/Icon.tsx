import React, { useMemo } from 'react';
import { useTheme } from '../../hooks';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import type { IconProps } from './_types';
import { type UIIcon, getIconRegistry } from './iconRegistry';

export type { UIIcon };

export const Icon = React.memo((props: IconProps) => {
	const theme = useTheme();
	const {
		name = 'home',
		size = 22,
		stroke = 1.5,
		strokeColor = theme.colors['core-icon-primary'],
		fillColor = 'transparent',
		toggle = false,
		pointer = true,
		disabled = false,
		onClick = () => null,
	} = props;

	const opacity = disabled ? 0.5 : 1;

	// Get icon registry Map - only recreates when props affecting SVG change
	const iconRegistry = useMemo(() => {
		return getIconRegistry({
			size,
			stroke,
			strokeColor,
			fillColor,
			disabled,
			pointer,
			onClick,
			theme,
			opacity,
		});
	}, [
		size,
		stroke,
		strokeColor,
		fillColor,
		disabled,
		pointer,
		onClick,
		theme,
		opacity,
	]);

	/* START.DEBUG */
	useTrackRenders(props, 'Icon');
	/* END.DEBUG */

	// Memoize the icon creation - only creates the ONE icon needed when name or toggle changes
	const renderedIcon = useMemo(() => {
		const normalizedName = name.toLowerCase();
		const icon = iconRegistry.get(normalizedName);

		if (!icon) return null;

		// set the variant to return and call the factory function to create the SVG
		const variant = toggle ? 'lineOn' : 'line';
		const factory = icon[variant];
		return factory ? factory() : null;
	}, [name, toggle, iconRegistry]);

	return renderedIcon;
});
