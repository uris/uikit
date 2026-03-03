import React, { useCallback, useMemo } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import { Icon } from '../Icon';
import css from './UICard.module.css';
import type { UICardProps } from './_types';

export const UICard = React.memo(function UICard(props: Readonly<UICardProps>) {
	const {
		id,
		icon,
		label,
		command,
		width,
		onCommand = () => null,
		...divAttributes
	} = props;
	const { className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';

	// set style value callback
	const setStyle = useCallback((value: string | number | undefined) => {
		if (value === undefined || value === 'fill') return 'unset';
		if (typeof value === 'string') return value;
		return `${value}px`;
	}, []);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--card-width': setStyle(width),
			'--card-flex': width === 'fill' ? '1' : 'unset',
		} as React.CSSProperties;
	}, [setStyle, width]);

	/* START.DEBUG */
	useTrackRenders(props, 'UICard');
	/* END.DEBUG */

	return (
		<div
			id={id}
			className={`${css.card}${divClass}`}
			style={{ ...divStyle, ...cssVars }}
			onClick={() => onCommand({ id, command })}
			onKeyDown={() => onCommand({ id, command })}
			{...rest}
		>
			{icon && (
				<div className={css.icon}>
					<Icon name={icon} />
				</div>
			)}
			{label && <div className={css.label}>{label}</div>}
		</div>
	);
});
