import { motion } from 'motion/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../hooks';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { Icon } from '../Icon';
import css from './CheckBox.module.css';
import type { CheckBoxProps } from './_types';

export const CheckBox = React.memo((props: CheckBoxProps) => {
	const {
		size = 20,
		checked = false,
		disabled = false,
		color = undefined,
		children = undefined,
		onChange = () => null,
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';
	const [state, setState] = useState<'mixed' | boolean>(checked);
	const theme = useTheme();

	useEffect(() => setState(checked), [checked]);

	// memo icon name
	const iconName = useMemo(() => {
		if (state === true) return 'checkbox checked';
		if (state === 'mixed') return 'checkbox partial';
		return 'checkbox';
	}, [state]);

	// memo icon color
	const iconColor = useMemo(() => {
		if (color) return color;
		if (disabled) return theme.current.colors['core-icon-disabled'];
		if (state === 'mixed') return theme.current.colors['core-icon-primary'];
		if (!state) return theme.current.colors['core-icon-secondary'];
		return theme.current.colors['core-text-special'];
	}, [color, disabled, state, theme]);

	// memo style vars
	const cssVars = useMemo(() => {
		return {
			'--cb-size': `${size}px`,
			'--cb-label-color': `${color}`,
		} as React.CSSProperties;
	}, [size, color]);

	// handle toggle
	const handleToggle = useCallback(() => {
		let newState = false;
		switch (state) {
			case true:
				break;
			case 'mixed':
			case false:
				newState = true;
				break;
		}
		setState(newState);
		onChange(newState);
	}, [state, onChange]);

	// keyboard handler for accessibility
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === ' ' || e.key === 'Enter') {
				e.preventDefault();
				handleToggle();
			}
		},
		[handleToggle],
	);

	/* START.DEBUG */
	useTrackRenders(props, 'Checkbox');
	/* END.DEBUG */

	return (
		<motion.div
			id={divId}
			className={`${css.wrapper}${divClass}`}
			style={{ ...divStyle, ...cssVars }}
			onClick={handleToggle}
			onKeyDown={handleKeyDown}
			tabIndex={disabled ? -1 : 0}
			role={'checkbox'}
			aria-checked={state}
			aria-disabled={disabled}
			aria-label={String(children as string)}
			{...(rest as any)}
		>
			<div className={css.icon}>
				<Icon name={iconName} strokeColor={iconColor} size={size} />
			</div>
			{children && <span className={css.label}>{children}</span>}
		</motion.div>
	);
});
