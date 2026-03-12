import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { setStyle } from '../../util/utils';
import { Icon } from '../Icon';
import css from './RadioButton.module.css';
import type { RadioButtonProps } from './_types';

export const RadioButton = React.memo((props: RadioButtonProps) => {
	const {
		option,
		selected = false,
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

	useEffect(() => setIsSelected(selected), [selected]);

	const handleChange = useCallback(() => {
		if (isSelected && !deselect) return;
		setIsSelected(!isSelected);
		onChange(option, !isSelected);
	}, [isSelected, deselect, onChange, option]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.code === 'Space') {
				e.preventDefault();
				e.stopPropagation();
				handleChange();
			}
		},
		[handleChange],
	);

	// memo icon color
	const setIconColor = useMemo(() => {
		if (iconColor) return iconColor;
		if (checkedIcon === 'circle fill') return 'var(--core-text-primary)';
		return toggleIcon && isSelected
			? 'var(--core-text-special)'
			: 'var(--core-text-primary)';
	}, [iconColor, toggleIcon, isSelected, checkedIcon]);

	// memo icon name
	const iconName = useMemo(
		() => (toggleIcon && isSelected ? checkedIcon : 'circle'),
		[toggleIcon, isSelected, checkedIcon],
	);

	// memo flex
	const setFlex = useMemo(() => {
		if (list) return 'unset';
		return wrap ? '40%' : '1';
	}, [list, wrap]);

	// memo css vars
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
		<div
			id={divId}
			className={`${css.wrapper}${divClass}`}
			style={{ ...divStyle, ...cssVars }}
			onClick={handleChange}
			onKeyDown={handleKeyDown}
			tabIndex={tabIndex}
			aria-label={option.title}
			aria-selected={isSelected}
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
		</div>
	);
});
