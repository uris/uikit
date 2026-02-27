import { motion } from 'motion/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import css from './Switch.module.css';
import { type SwitchProps, TRANSITION } from './_types';

export const Switch = React.memo((props: SwitchProps) => {
	const {
		state = false,
		height = 22,
		width = 44,
		padding = 3,
		bgColorOn = 'var(--feedback-positive)',
		bgColorOff = 'var(--core-badge-secondary)',
		knobColor = 'var(--core-text-light)',
		onChange = () => null,
	} = props;
	const [on, setOn] = useState<boolean>(state);

	// Sync with prop changes
	useEffect(() => {
		setOn(state);
	}, [state]);

	const handleClick = useCallback(() => {
		setOn(!on);
		onChange(!on);
	}, [on, onChange]);

	// memo animation values
	const animateValue = useMemo(
		() => ({ backgroundColor: on ? bgColorOn : bgColorOff }),
		[on, bgColorOn, bgColorOff],
	);

	// Memoize style object
	const justify = useMemo(
		() => ({ justifyContent: on ? 'flex-end' : 'flex-start' }),
		[on],
	);

	// Memoize knob style
	const knobStyle = useMemo(
		() => ({ backgroundColor: knobColor }),
		[knobColor],
	);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--switch-width': `${width}px`,
			'--switch-height': `${height}px`,
			'--switch-padding': `${padding}px`,
			'--switch-knob-size': `${height - padding * 2}px`,
		} as React.CSSProperties;
	}, [width, height, padding]);

	return (
		<motion.div
			className={css.wrapper}
			style={{ ...cssVars, ...justify }}
			transition={TRANSITION}
			initial={state ? bgColorOn : bgColorOff}
			animate={animateValue}
			onClick={handleClick}
		>
			<motion.div
				className={css.knob}
				layout={'preserve-aspect'}
				transition={TRANSITION}
				style={knobStyle}
			/>
		</motion.div>
	);
});
