import { AnimatePresence, motion } from 'motion/react';
import React, { useMemo } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import css from './Dot.module.css';
import { DEFAULT_TRANSITION, DEFAULT_VARIANTS, type DotProps } from './_types';

export const Dot = React.memo((props: DotProps) => {
	const {
		size = 8,
		topOffset = 2,
		rightOffset = 2,
		border = 3,
		position = 'corner',
		color = undefined,
		transition = undefined,
		motionValues = undefined,
		show = false,
		state,
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';

	// memo variants
	const variants = useMemo(() => {
		if (motionValues) {
			return { ...DEFAULT_VARIANTS, ...motionValues };
		}
		return DEFAULT_VARIANTS;
	}, [motionValues]);

	// memo transition
	const trans = useMemo(() => {
		if (transition) {
			return { ...DEFAULT_TRANSITION, ...transition };
		}
		return DEFAULT_TRANSITION;
	}, [transition]);

	// memo color
	const bgColor = useMemo(() => {
		if (color) {
			return color;
		}
		if (state) {
			switch (state) {
				case 'red':
					return 'var(--feedback-warning)';
				case 'yellow':
					return 'var(--feedback-attention)';
				case 'green':
					return 'var(--feedback-positive)';
				case 'blue':
					return 'var(--core-gp-logo-primary)';
				case 'grey':
					return 'var(--core-text-secondary)';
				default:
					break;
			}
		}
		return 'var(--core-text-special)';
	}, [state, color]);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--dot-size': `${size}px`,
			'--dot-display': position === 'inline' ? 'inline-flex' : 'flex',
			'--dot-position': position === 'inline' ? 'relative' : 'absolute',
			'--dot-top': position === 'inline' ? 'unset' : `${topOffset}px`,
			'--dot-right': position === 'inline' ? 'unset' : `${rightOffset}px`,
			'--dot-vertical-align': position === 'inline' ? 'middle' : 'unset',
			'--dot-border': `${border}px solid`,
			'--dot-border-color': 'var(--core-surface-primary)',
			'--dot-bg': `${bgColor}`,
		} as React.CSSProperties;
	}, [size, position, topOffset, rightOffset, border, bgColor]);

	/* START.DEBUG */
	useTrackRenders(props, 'Dot');
	/* END.DEBUG */

	return (
		<AnimatePresence initial={false}>
			{show && (
				<motion.div
					id={divId}
					className={`${css.dot}${divClass}`}
					style={{ ...divStyle, ...cssVars }}
					initial={'initial'}
					animate={'animate'}
					exit={'exit'}
					transition={trans}
					variants={variants}
					role={'status'}
					aria-live={'polite'}
					aria-label={'Blue dot indicating active or new'}
					{...(rest as any)}
				>
					<div className="dot" />
				</motion.div>
			)}
		</AnimatePresence>
	);
});
