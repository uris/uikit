import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { setStyle } from '../../utils/functions/misc';
import { Icon } from '../Icon';
import css from './RadioButton.module.css';
import type { RadioButtonProps } from './_types';

export const RadioButton = React.memo((props: RadioButtonProps) => {
	const {
		option,
		selected = false,
		controlType = 'radio',
		deselect = true,
		tabIndex = 1,
		wrap = false,
		list = false,
		hideRadio = false,
		toggleIcon = true,
		noFrame = true,
		checkedIcon = 'check circle',
		iconColor,
		gap = 6,
		onChange = () => null,
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';
	const [isSelected, setIsSelected] = useState<boolean>(selected);

	// sync the local selection state from the controlled prop
	useEffect(() => setIsSelected(selected), [selected]);

	// toggle the radio button selection and notify the consumer
	const handleChange = useCallback(() => {
		if (isSelected && !deselect) return;
		setIsSelected(!isSelected);
		onChange(option, !isSelected);
	}, [isSelected, deselect, onChange, option]);

	// resolve the radio icon color from selection and icon settings
	const setIconColor = useMemo(() => {
		if (iconColor) return iconColor;
		if (checkedIcon === 'circle fill') return 'var(--core-text-primary)';
		return toggleIcon && isSelected
			? 'var(--core-text-special)'
			: 'var(--core-text-primary)';
	}, [iconColor, toggleIcon, isSelected, checkedIcon]);

	// resolve which icon should be shown for the current selection state
	const iconName = useMemo(
		() => (toggleIcon && isSelected ? checkedIcon : 'circle'),
		[toggleIcon, isSelected, checkedIcon],
	);

	// resolve wrapper flex behavior from list and wrap settings
	const setFlex = useMemo(() => {
		if (list) return 'unset';
		return wrap ? '40%' : '1';
	}, [list, wrap]);

	// compose CSS custom properties for layout and framing
	const cssVars = useMemo(() => {
		return {
			'--rb-max-width': wrap ? '50%' : '100%',
			'--rb-flex': setFlex,
			'--rb-padding': noFrame ? '0' : '8px 16px 8px 10px',
			'--rb-bg':
				!noFrame && isSelected
					? 'var(--core-surface-secondary)'
					: 'transparent',
			'--rb-border': noFrame ? 'none' : '1px solid var(--core-outline-primary)',
			'--rb-gap': setStyle(gap),
		} as React.CSSProperties;
	}, [setFlex, isSelected, wrap, noFrame, gap]);

	/* START.DEBUG */
	useTrackRenders(props, 'Radio Button');
	/* END.DEBUG */

	return (
		<button
			id={divId}
			type="button"
			className={`${css.wrapper}${divClass}`}
			style={{ ...divStyle, ...cssVars }}
			onClick={handleChange}
			role={controlType}
			tabIndex={tabIndex}
			aria-label={option.title}
			aria-checked={isSelected}
			{...rest}
		>
			{option.icon && !hideRadio && (
				<div className={css.radioIcon}>
					<Icon name={iconName} strokeColor={setIconColor} size={20} />
				</div>
			)}
			<div className={css.radioContent}>
				<div className={css.radioTitle}>{option.title}</div>
				{option.description && option.description !== '' && (
					<div className={css.radioSummary}>{option.description}</div>
				)}
			</div>
		</button>
	);
});
