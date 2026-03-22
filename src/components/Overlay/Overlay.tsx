import { AnimatePresence, motion } from 'motion/react';
import React, { useCallback, useMemo } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import css from './Overlay.module.css';
import type { OverlayProps } from './_types';

export const Overlay = React.memo((props: OverlayProps) => {
	const {
		type = 'clear',
		global = false,
		overlay,
		color = 'rgb(0,0,0)',
		opacity = 0,
		onClick = () => null,
		toggleOverlay = () => null,
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';

	// derive whether the overlay should render at all
	const show = !global || (global && overlay);

	// resolve the visual opacity from the configured overlay type
	const computedOpacity = useMemo(() => {
		if (type === 'clear') return 0;
		if (opacity !== undefined) return opacity;
		if (type === 'dark') return 0.8;
		return 0;
	}, [type, opacity]);

	// handle overlay clicks and close the global overlay when needed
	const handleClick = useCallback(() => {
		if (global) toggleOverlay(false);
		onClick();
	}, [global, toggleOverlay, onClick]);

	// block the native context menu over the overlay surface
	const handleContextMenu = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
	}, []);

	// compose CSS custom properties for the overlay color
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
