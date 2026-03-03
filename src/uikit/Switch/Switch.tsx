import { motion } from 'motion/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import css from './Switch.module.css';
import type { SwitchProps } from './_types';

export const Switch = React.memo((props: SwitchProps) => {
	const {
		state = false,
		height = 22,
		width = 44,
		padding = 3,
		bgColorOn = 'var(--feedback-positive)',
		bgColorOff = 'var(--core-text-disabled)',
		knobColor = 'var(--core-surface-primary)',
		onChange = () => null,
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';
	const [on, setOn] = useState<boolean>(state);

	// Sync with prop changes
	useEffect(() => {
		setOn(state);
	}, [state]);

	const handleClick = useCallback(() => {
		setOn(!on);
		onChange(!on);
	}, [on, onChange]);

	// Memoize style object
	const justify = useMemo(
		() => ({ justifyContent: on ? 'flex-end' : 'flex-start' }),
		[on],
	);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--switch-width': `${width}px`,
			'--switch-height': `${height}px`,
			'--switch-padding': `${padding}px`,
			'--switch-knob-size': `${height - padding * 2}px`,
			'--switch-knob-color': knobColor,
			'--switch-bg-color': on ? bgColorOn : bgColorOff,
		} as React.CSSProperties;
	}, [width, height, padding, bgColorOff, bgColorOn, on, knobColor]);

	/* START.DEBUG */
	useTrackRenders(props, 'Switch');
	/* END.DEBUG */

	return (
		<motion.div
			id={divId}
			className={`${css.wrapper}${divClass}`}
			style={{ ...divStyle, ...justify, ...cssVars }}
			onClick={handleClick}
			{...(rest as any)}
		>
			<motion.div className={css.knob} layout={'preserve-aspect'} />
		</motion.div>
	);
});
