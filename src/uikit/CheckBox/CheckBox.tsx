import { motion } from 'motion/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../hooks';
import { Icon } from '../Icon';
import css from './CheckBox.module.css';

export interface CheckBoxProps {
	size?: number;
	checked?: 'partial' | boolean;
	disabled?: boolean;
	color?: string;
	label?: string;
	onChange?: (state: boolean) => void;
}

export const CheckBox = React.memo((props: CheckBoxProps) => {
	const {
		size = 20,
		checked = false,
		disabled = false,
		color = undefined,
		label = undefined,
		onChange = () => null,
	} = props;
	const [state, setState] = useState<'partial' | boolean>(checked);
	const theme = useTheme();

	useEffect(() => setState(checked), [checked]);

	// memo icon name
	const iconName = useMemo(() => {
		if (state === true) return 'checked';
		if (state === 'partial') return 'partial';
		return 'unchecked';
	}, [state]);

	// memo icon color
	const iconColor = useMemo(() => {
		if (color) return color;
		if (disabled) return theme.colors['core-icon-disabled'];
		if (state === 'partial') return theme.colors['core-icon-primary'];
		if (!state) return theme.colors['core-icon-secondary'];
		return theme.colors['core-text-special'];
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
			case 'partial':
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

	return (
		<motion.div
			className={css.wrapper}
			style={cssVars}
			onClick={handleToggle}
			onKeyDown={handleKeyDown}
			tabIndex={disabled ? -1 : 0}
			aria-checked={state === 'partial' ? 'mixed' : state}
			aria-disabled={disabled}
		>
			<div className={css.icon}>
				<Icon name={iconName} strokeColor={iconColor} size={size} />
			</div>
			{label && <span className={css.label}>{label}</span>}
		</motion.div>
	);
});
