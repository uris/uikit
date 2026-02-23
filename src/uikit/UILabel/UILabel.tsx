import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useTheme } from '../../hooks';
import css from './UILabel.module.css';

export interface UILabelProps {
	label?: string;
	state?:
		| 'red'
		| 'yellow'
		| 'green'
		| 'blue'
		| 'grey'
		| 'lightgrey'
		| 'white'
		| undefined;
	noFill?: boolean;
	round?: boolean;
	button?: boolean;
	onClick?: (e: React.MouseEvent<any>) => void;
}

export function UILabel(props: Readonly<UILabelProps>) {
	const theme = useTheme();
	const {
		label,
		state,
		noFill = false,
		button = false,
		round = false,
		onClick = () => null,
	} = props;

	const handleClick = useCallback(
		(e: React.MouseEvent<any>) => {
			if (button) onClick(e);
		},
		[button, onClick],
	);

	// memo color styles by state
	const getBackgroundColor = useCallback(
		(colorState: string | undefined) => {
			if (noFill) return 'var(--core-surface-primary)';
			switch (colorState) {
				case 'red':
					return theme.colors['feedback-warning'];
				case 'green':
					return theme.colors['feedback-warning'];
				case 'yellow':
					return theme.colors['array-yellow'];
				case 'grey':
					return theme.colors['core-surface-secondary'];
				case 'lightgrey':
					return theme.colors['core-button-disabled'];
				case 'white':
					return theme.colors['core-surface-secondary'];
				case 'blue':
					return theme.colors['core-button-primary'];
				default:
					return 'var(--core-surface-primary)';
			}
		},
		[noFill, theme],
	);

	const getBorderColor = useCallback(
		(colorState: string | undefined) => {
			switch (colorState) {
				case 'red':
					return noFill
						? theme.colors['core-button-disabled']
						: theme.colors['core-button-disabled'];
				case 'green':
					return noFill
						? theme.colors['feedback-positive']
						: theme.colors['core-button-disabled'];
				case 'yellow':
					return theme.colors['array-yellow-label'];
				case 'grey':
					return noFill
						? theme.colors['core-text-secondary']
						: theme.colors['core-button-disabled'];
				case 'lightgrey':
					return noFill
						? theme.colors['core-outline-primary']
						: theme.colors['core-button-disabled'];
				case 'white':
					return noFill
						? theme.colors['core-text-secondary']
						: theme.colors['core-badge-secondary'];
				case 'blue':
					return noFill
						? theme.colors['core-text-secondary']
						: theme.colors['core-button-primary'];
				default:
					return 'var(--core-outline-primary)';
			}
		},
		[noFill, theme],
	);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--label-padding': button ? '6px 12px' : '4px 6px',
			'--label-border-radius': round ? '100px' : '4px',
			'--label-cursor': button ? 'pointer' : 'default',
			'--label-background': getBackgroundColor(state),
			'--label-border-color-red': getBorderColor('red'),
			'--label-border-color-green': getBorderColor('green'),
			'--label-border-color-yellow': getBorderColor('yellow'),
			'--label-border-color-grey': getBorderColor('grey'),
			'--label-border-color-lightgrey': getBorderColor('lightgrey'),
			'--label-border-color-white': getBorderColor('white'),
			'--label-border-color-blue': getBorderColor('blue'),
		} as React.CSSProperties;
	}, [button, round, state, getBackgroundColor, getBorderColor]);

	const classNames = [
		css.label,
		button ? css.button : css.regular,
		state ? css[state] : '',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={classNames} style={cssVars} onClick={handleClick}>
			{label}
		</div>
	);
}
