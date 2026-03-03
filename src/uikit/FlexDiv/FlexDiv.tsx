import { motion } from 'motion/react';
import React, { useMemo } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
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
			height = 'fit',
			width = 'fill',
			maxWidth = undefined,
			centerSelf = undefined,
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
			scrollHandle,
			scrollHandleHover,
			...divAttributes
		} = props;
		const { id: divId, style: userStyle, ...rest } = divAttributes;
		const wrapperStyle = (userStyle ?? {}) as React.CSSProperties;

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
				margin: centerSelf ? '0 auto' : `${setBox(margin)}`,
				width: `${absolute ? 'unset' : setSize(width, false)}`,
				height: `${absolute ? 'unset' : setSize(height, true)}`,
				maxWidth: `${maxWidth ? setSize(maxWidth, false) : 'unset'}`,
				flex: `${absolute ? 'unset' : (flex ?? 'unset')}`,
				top: `${absolute ? '0' : 'unset'}`,
				bottom: `${absolute ? '0' : 'unset'}`,
				left: `${absolute ? '0' : 'unset'}`,
				right: `${absolute ? '0' : 'unset'}`,
				gap: gap ? `${gap}px` : 'unset',
				border: `${border ?? 'unset'}`,
				background: `${background ?? 'transparent'}`,
				overflow: 'hidden',
				overflowY: `${scrollY ? 'auto' : 'unset'}`,
				overflowX: `${scrollX ? 'auto' : 'unset'}`,
				color: 'var(--core-text-primary)',
				'--flex-div-scroll-border': `${background ?? 'transparent'}`,
				'--flex-div-scroll-handle': `${scrollHandle ?? 'var(--scroll-bar)'}`,
				'--flex-div-scroll-handle-hover': `${scrollHandleHover ?? 'var(--scroll-bar-hover)'}`,
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
			centerSelf,
			maxWidth,
			scrollHandle,
			scrollHandleHover,
		]);

		/* START.DEBUG */
		// useTrackRenders(props, 'FlexDiv');
		/* END.DEBUG */

		return (
			<motion.div
				id={divId}
				ref={ref}
				className={`${css.flexDiv} ${className ?? ''}`}
				style={{ ...wrapperStyle, ...style }}
				transition={transition}
				variants={variants}
				initial={enter}
				animate={animate}
				exit={exit}
				{...(rest as any)}
			>
				{children}
			</motion.div>
		);
	}),
);
