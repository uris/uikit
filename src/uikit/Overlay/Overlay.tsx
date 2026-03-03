import { AnimatePresence, motion } from 'motion/react';
import React, { useCallback, useMemo } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import css from './Overlay.module.css';
import type { OverlayProps } from './_types';

export const Overlay = React.memo((props: OverlayProps) => {
	const {
		onClick = () => null,
		toggleOverlay = () => null,
		opacity = 0,
		color = 'rgb(0,0,0)',
		type = 'clear',
		global = false,
		overlay,
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = (style ?? {}) as React.CSSProperties;
	const divClass = className ? ` ${className}` : '';

	const show = !global || (global && overlay);

	// Memoize computed opacity value
	const computedOpacity = useMemo(() => {
		if (type === 'clear') return 0;
		if (opacity !== undefined) return opacity;
		if (type === 'dark') return 0.8;
		return 0;
	}, [type, opacity]);

	const handleClick = useCallback(() => {
		if (global) toggleOverlay(false);
		onClick();
	}, [global, toggleOverlay, onClick]);

	const handleContextMenu = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
	}, []);

	const cssVars = useMemo(() => {
		return {
			'--overlay-color': color ?? 'rgb(0,0,0)',
		} as React.CSSProperties;
	}, [color]);

	/* START.DEBUG */
	useTrackRenders(props, 'Overlay');
	/* END.DEBUG */

	return (
		<AnimatePresence initial={false}>
			{show && (
				<motion.div
					id={divId}
					className={`${css.overlay}${divClass}`}
					style={{ ...divStyle, ...cssVars }}
					initial={{ opacity: 0 }}
					animate={{ opacity: computedOpacity }}
					exit={{ opacity: 0 }}
					onClick={handleClick}
					onContextMenu={handleContextMenu}
					{...(rest as any)}
				/>
			)}
		</AnimatePresence>
	);
});
