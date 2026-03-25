import type React from 'react';
import { useCallback, useMemo } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { setStyle } from '../../utils/functions/misc';
import css from './Label.module.css';
import { LabelBackground, type LabelProps } from './_types';

function resolveSemanticBackground(
	bgColor: LabelProps['bgColor'],
): LabelBackground | undefined {
	if (!bgColor || typeof bgColor !== 'string') return undefined;
	const semanticKey = bgColor as keyof typeof LabelBackground;
	if (LabelBackground[semanticKey]) return LabelBackground[semanticKey];
	return Object.values(LabelBackground).find((value) => value === bgColor);
}

export function Label(props: Readonly<LabelProps>) {
	const {
		children,
		label,
		borderSize = 1,
		borderColor = 'var(--core-outline-primary)',
		bgColor = 'transparent',
		borderRadius = 4,
		padding,
		textColor = 'var(--core-text-primary)',
		textSize = 's',
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

	const setBgColor = useMemo(() => {
		if (!bgColor) return 'transparent';
		const fill = resolveSemanticBackground(bgColor);
		if (!fill) return bgColor;
		switch (fill) {
			case 'red':
				return 'var(--feedback-warning)';
			case 'green':
				return 'var(--feedback-positive)';
			case 'yellow':
				return 'var(--array-yellow)';
			case 'grey':
				return 'var(--core-surface-secondary)';
			case 'lightGrey':
				return 'var(--core-button-disabled)';
			case 'white':
				return 'var(--core-surface-secondary)';
			case 'blue':
				return 'var(--core-button-primary)';
			default:
				return 'var(--core-surface-primary)';
		}
	}, [bgColor]);

	const setBorderColor = useMemo(() => {
		if (!bgColor) return borderColor;
		const fill = resolveSemanticBackground(bgColor);
		if (!fill) return borderColor;
		switch (fill) {
			case 'red':
				return 'var(--feedback-warning)';
			case 'green':
				return 'var(--feedback-positive)';
			case 'yellow':
				return 'var(--array-yellow-label)';
			case 'grey':
				return 'var(--core-outline-primary)';
			case 'lightGrey':
				return 'var(--core-outline-primary)';
			case 'white':
				return 'var(--core-outline-primary)';
			case 'blue':
				return 'var(--core-button-primary)';
			default:
				return 'var(--core-surface-primary)';
		}
	}, [bgColor, borderColor]);

	const setPadding = useMemo(() => {
		if (padding) return setStyle(padding);
		return '2px 4px';
	}, [padding]);

	const cssVars = useMemo(() => {
		return {
			'--label-padding': setPadding,
			'--label-border-radius': setStyle(borderRadius),
			'--label-cursor': onClick ? 'pointer' : 'default',
			'--label-color': textColor,
			'--label-bg-color': setBgColor,
			'--label-border-size': setStyle(borderSize),
			'--label-border-color': setBorderColor,
		} as React.CSSProperties;
	}, [
		setPadding,
		borderRadius,
		onClick,
		textColor,
		setBorderColor,
		setBgColor,
		borderSize,
	]);

	/* START.DEBUG */
	useTrackRenders(props, 'Label');
	/* END.DEBUG */

	if (isInteractive) {
		return (
			<button
				id={divId}
				type="button"
				className={`${css.button} ${css[textSize]}${divClass}`}
				style={{ ...divStyle, ...cssVars }}
				aria-label={'Label button'}
				onClick={(e) => handleClick(e as any)}
				{...rest}
			>
				{children ?? label}
			</button>
		);
	}

	return (
		<span
			id={divId}
			className={`${css.label} ${css[textSize]}${divClass}`}
			style={{ ...divStyle, ...cssVars }}
			{...rest}
		>
			{children ?? label}
		</span>
	);
}
