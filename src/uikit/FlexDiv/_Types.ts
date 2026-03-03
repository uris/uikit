import type { Transition } from 'motion/react';
import type React from 'react';

type FlexDivBaseProps = {
	className?: string;
	children?: any;
	scrollY?: boolean;
	scrollX?: boolean;
	absolute?: boolean;
	background?: string;
	direction?: 'row' | 'column';
	alignItems?: 'start' | 'center' | 'end' | 'between';
	justify?: 'start' | 'top' | 'center' | 'end' | 'bottom' | 'between';
	width?: number | 'grow' | 'fill' | 'fit' | 'viewport' | 'auto';
	height?: number | 'grow' | 'fill' | 'fit' | 'viewport' | 'auto';
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
	scrollHandle?: string;
	scrollHandleHover?: string;
};

export type FlexDivProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof FlexDivBaseProps
> &
	FlexDivBaseProps;
