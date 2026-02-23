import type { Transition } from 'motion/react';

export interface FlexDivProps {
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
}
