import { motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { useMemo } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { filterClasses } from '../../utils/functions/misc';
import css from './Tip.module.css';
import { type PosCoords, type ToolTipProps, tipBasePos } from './_types';

const TipBase = React.forwardRef<HTMLDivElement, ToolTipProps>((props, ref) => {
	const {
		tip,
		size = 's',
		bgColor,
		color,
		border = true,
		borderColor,
		padding,
		radius,
		coords,
		showDelay = 500,
		hideDelay = 2500,
		...divAttributes
	} = props;

	// div attributes to add
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? `${className}` : '';

	// set tip position and display timer
	// need the animate set only after the ready state is processed
	const [pos, setPos] = useState<PosCoords>(tipBasePos);
	const [ready, setReady] = useState<boolean>(false);
	const [animate, setAnimate] = useState<boolean>(false);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	// update position with delay and then auto remove
	useEffect(() => {
		if (timer.current) clearTimeout(timer.current);
		const { x, y } = coords ?? { x: 0, y: 0 };
		const showTip = x > 0 && y > 0;
		if (showTip) {
			timer.current = setTimeout(() => {
				setPos({ left: coords?.x ?? 0, top: coords?.y ?? 0 });
				setReady(true);
				if (timer.current) clearTimeout(timer.current);
				timer.current = setTimeout(() => {
					setReady(false);
					setPos({ left: 0, top: 0 });
				}, hideDelay);
			}, showDelay);
		} else {
			setReady(false);
			setPos({ left: 0, top: 0 });
		}
		// clean up timers
		return () => {
			if (timer.current) clearTimeout(timer.current);
		};
	}, [coords, showDelay, hideDelay]);

	// when ready, visibility has taken effect and can now be animated
	useEffect(() => setAnimate(ready), [ready]);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--tooltip-padding': padding ?? '3px 6px',
			'--tooltip-background': bgColor ?? 'var(--core-surface-secondary)',
			'--tooltip-color': color ?? 'var(--core-text-primary)',
			'--tooltip-border': border
				? `1px solid ${borderColor ?? 'var(--core-outline-primary)'}`
				: 'unset',
			'--tooltip-border-radius': radius ?? '4px',
		} as React.CSSProperties;
	}, [padding, bgColor, color, border, borderColor, radius]);

	// memo coords style
	const coordStyle = useMemo(() => {
		const { left, top } = pos;
		return {
			left: `${left ?? 0}px`,
			top: `${top ?? 0}px`,
		} as React.CSSProperties;
	}, [pos]);

	// memo class names
	const classNames = useMemo(() => {
		return filterClasses([css.wrapper, css[size], divClass]);
	}, [size, divClass]);

	/* START.DEBUG */
	useTrackRenders(props, 'Tip');
	/* END.DEBUG */

	return (
		<motion.div
			ref={ref}
			id={divId}
			className={classNames}
			onKeyDown={() => null}
			style={{
				...divStyle,
				...cssVars,
				...coordStyle,
				visibility: ready ? 'visible' : 'hidden',
			}}
			initial={{ opacity: 0 }}
			animate={
				animate
					? { opacity: 1, transition: { ease: 'easeInOut', duration: 0.25 } }
					: undefined
			}
			exit={{ opacity: 0, transition: { duration: 0 } }}
			{...rest}
		>
			{tip?.payload?.label}
		</motion.div>
	);
});

TipBase.displayName = 'Tip';

export const Tip = React.memo(TipBase);
