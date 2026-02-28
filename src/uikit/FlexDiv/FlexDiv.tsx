import { motion } from 'motion/react';
import React, { useMemo } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import css from './FlexDiv.module.css';
import type { FlexDivProps } from './_types';

// Extract helper functions outside component
function setSize(style: string | number, isHeight: boolean) {
	if (typeof style === 'number') return `${style}px`;
	if (style === 'grow') return 'unset';
	if (style === 'fill') return '100%';
	if (style === 'fit') return 'auto';
	if (style === 'viewport') return isHeight ? '100vh' : '100vw';
	return style;
}

function setBox(style: string | number) {
	if (typeof style === 'number') return `${style}px`;
	return style;
}

function setFlex(style: string) {
	if (style === 'start' || style === 'top') return 'flex-start';
	if (style === 'end' || style === 'bottom') return 'flex-end';
	if (style === 'between') return 'space-between';
	return style;
}

export const FlexDiv = React.memo(
	React.forwardRef<HTMLDivElement, FlexDivProps>((props, ref) => {
		const {
			children,
			scrollY = false,
			scrollX = false,
			background = 'var(--core-surface-primary)',
			direction = 'column',
			alignItems = 'start',
			justify = 'start',
			height = 'viewport',
			width = 'fill',
			wrap = false,
			reverse = false,
			padding = 0,
			margin = 0,
			absolute = false,
			flex,
			gap,
			variants,
			transition,
			animate,
			enter,
			exit,
			border,
			className,
		} = props;

		// Memoize layout
		const style = useMemo(() => {
			return {
				display: 'flex',
				position: `${absolute ? 'absolute' : 'relative'}`,
				flexDirection: `${direction}${reverse ? '-reverse' : ''}`,
				flexWrap: `${wrap ? 'wrap' : 'nowrap'}`,
				justifyContent: `${setFlex(justify)}`,
				alignItems: `${setFlex(alignItems)}`,
				boxSizing: 'border-box',
				padding: `${setBox(padding)}`,
				margin: `${setBox(margin)}`,
				width: `${absolute ? 'unset' : setSize(width, false)}`,
				height: `${absolute ? 'unset' : setSize(height, true)}`,
				flex: `${absolute ? 'unset' : (flex ?? 'unset')}`,
				top: `${absolute ? '0' : 'unset'}`,
				bottom: `${absolute ? '0' : 'unset'}`,
				left: `${absolute ? '0' : 'unset'}`,
				right: `${absolute ? '0' : 'unset'}`,
				gap: gap ? `${gap}px` : 'unset',
				border: `${border ?? 'unset'}`,
				background: `${background ?? 'transparent'}`,
				overflowY: `${scrollY ? 'auto' : 'unset'}`,
				overflowX: `${scrollX ? 'auto' : 'unset'}`,
			} as React.CSSProperties;
		}, [
			absolute,
			direction,
			reverse,
			wrap,
			justify,
			alignItems,
			padding,
			margin,
			width,
			height,
			flex,
			gap,
			border,
			background,
			scrollY,
			scrollX,
		]);

		/* START.DEBUG */
		useTrackRenders(props, 'FlexDiv');
		/* END.DEBUG */

		return (
			<motion.div
				ref={ref}
				className={`${css.flexDiv} ${className ?? ''}`}
				style={style}
				transition={transition}
				variants={variants}
				initial={enter}
				animate={animate}
				exit={exit}
			>
				{children}
			</motion.div>
		);
	}),
);
