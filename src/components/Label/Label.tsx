import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useTheme } from '../../hooks';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { setStyle } from '../../utils/functions/misc';
import css from './Label.module.css';
import type { LabelProps } from './_types';

export function Label(props: Readonly<LabelProps>) {
	const theme = useTheme();
	const {
		children,
		state,
		noFill = false,
		button = false,
		round = false,
		border = 1,
		padding,
		color,
		inline = true,
		size = 'm',
		onClick,
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';
	const isInteractive = Boolean(onClick);

	const handleClick = useCallback(
		(e: React.MouseEvent<any>) => {
			if (isInteractive) onClick?.(e);
		},
		[isInteractive, onClick],
	);

	// resolve the label background color from its state and fill mode
	const backgroundColor = useMemo(() => {
		if (noFill) return 'var(--core-surface-primary)';
		switch (state) {
			case 'red':
				return theme.current.colors['feedback-warning'];
			case 'green':
				return theme.current.colors['feedback-warning'];
			case 'yellow':
				return theme.current.colors['array-yellow'];
			case 'grey':
				return theme.current.colors['core-surface-secondary'];
			case 'lightgrey':
				return theme.current.colors['core-button-disabled'];
			case 'white':
				return theme.current.colors['core-surface-secondary'];
			case 'blue':
				return theme.current.colors['core-button-primary'];
			default:
				return 'var(--core-surface-primary)';
		}
	}, [noFill, state, theme]);

	// resolve border colors for each supported label state
	const borderColors = useMemo(() => {
		const getBorderColor = (colorState: string) => {
			switch (colorState) {
				case 'red':
					return theme.current.colors['core-button-disabled'];
				case 'green':
					return noFill
						? theme.current.colors['feedback-positive']
						: theme.current.colors['core-button-disabled'];
				case 'yellow':
					return theme.current.colors['array-yellow-label'];
				case 'grey':
					return noFill
						? theme.current.colors['core-text-secondary']
						: theme.current.colors['core-button-disabled'];
				case 'lightgrey':
					return noFill
						? theme.current.colors['core-outline-primary']
						: theme.current.colors['core-button-disabled'];
				case 'white':
					return noFill
						? theme.current.colors['core-text-secondary']
						: theme.current.colors['core-badge-secondary'];
				case 'blue':
					return noFill
						? theme.current.colors['core-text-secondary']
						: theme.current.colors['core-button-primary'];
				default:
					return 'var(--core-outline-primary)';
			}
		};

		return {
			red: getBorderColor('red'),
			green: getBorderColor('green'),
			yellow: getBorderColor('yellow'),
			grey: getBorderColor('grey'),
			lightgrey: getBorderColor('lightgrey'),
			white: getBorderColor('white'),
			blue: getBorderColor('blue'),
		};
	}, [noFill, theme]);

	// resolve the label padding from explicit and mode-based values
	const setPadding = useMemo(() => {
		if (padding) return setStyle(padding);
		return button ? '6px 12px' : '4px 6px';
	}, [padding, button]);

	// compose CSS custom properties for label layout and colors
	const cssVars = useMemo(() => {
		return {
			'--label-padding': setPadding,
			'--label-border-radius': round ? '100px' : '4px',
			'--label-cursor': button ? 'pointer' : 'default',
			'--label-color': color ?? 'var(--core-text-primary)',
			'--label-background': backgroundColor,
			'--label-border-size': border ? `${border}px` : '0',
			'--label-border-color-red': borderColors.red,
			'--label-border-color-green': borderColors.green,
			'--label-border-color-yellow': borderColors.yellow,
			'--label-border-color-grey': borderColors.grey,
			'--label-border-color-lightgrey': borderColors.lightgrey,
			'--label-border-color-white': borderColors.white,
			'--label-border-color-blue': borderColors.blue,
			'--label-inline': inline ? 'inline-flex' : 'flex',
		} as React.CSSProperties;
	}, [
		button,
		border,
		round,
		backgroundColor,
		borderColors,
		setPadding,
		color,
		inline,
	]);

	// compose the label class list from behavior, state, and size
	const classNames = [
		css.label,
		button || isInteractive ? css.button : css.regular,
		state ? css[state] : '',
	]
		.filter(Boolean)
		.join(' ');

	/* START.DEBUG */
	useTrackRenders(props, 'Label');
	/* END.DEBUG */

	if (isInteractive) {
		return (
			<button
				id={divId}
				type="button"
				className={`${classNames} ${css[size]}${divClass}`}
				style={{ ...divStyle, ...cssVars }}
				aria-label={'Label button'}
				onClick={(e) => handleClick(e as any)}
				{...rest}
			>
				{children}
			</button>
		);
	}

	return (
		<span
			id={divId}
			className={`${classNames} ${css[size]}${divClass}`}
			style={{ ...divStyle, ...cssVars }}
			{...rest}
		>
			{children}
		</span>
	);
}
