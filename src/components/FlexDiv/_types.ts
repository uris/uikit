import type { Transition } from 'motion/react';
import type React from 'react';

export enum Size {
	Grow = 'grow',
	Fill = 'fill',
	Fit = 'fit',
	Viewport = 'viewport',
	Auto = 'auto',
}

type FlexDivBaseProps = {
	className?: string;
	children?: any;
	scrollY?: boolean;
	scrollX?: boolean;
	absolute?: boolean;
	background?: string;
	direction?: 'row' | 'column';
	align?: 'start' | 'center' | 'end' | 'between';
	justify?: 'start' | 'top' | 'center' | 'end' | 'bottom' | 'between';
	width?: number | Size | string;
	height?: number | Size | string;
	maxWidth?: number | string;
	centerSelf?: boolean | string;
	flex?: number;
	reverse?: boolean;
	wrap?: boolean;
	border?: string;
	padding?: number | string;
	margin?: number | string;
	enter?: any;
	exit?: any;
	animate?: any;
	transition?: Transition;
	variants?: any;
	gap?: number;
	borderRadius?: number;
	scrollHandle?: string;
	scrollHandleHover?: string;
};

export type FlexDivProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof FlexDivBaseProps
> &
	FlexDivBaseProps;
