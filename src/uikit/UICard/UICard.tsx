import type React from 'react';
import { useCallback, useMemo } from 'react';
import { Icon } from '../Icon';
import css from './UICard.module.css';

export interface UICardProps {
	id?: string;
	icon?: string;
	label?: string;
	command?: string;
	width?: number | string;
	onCommand?: (command: { id?: string; command?: string }) => void;
}

export function UICard(props: Readonly<UICardProps>) {
	const { id, icon, label, command, width, onCommand = () => null } = props;

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

	return (
		<div
			className={css.card}
			style={cssVars}
			onClick={() => onCommand({ id, command })}
			onKeyDown={() => onCommand({ id, command })}
		>
			{icon && (
				<div className={css.icon}>
					<Icon name={icon} />
				</div>
			)}
			{label && <div className={css.label}>{label}</div>}
		</div>
	);
}
