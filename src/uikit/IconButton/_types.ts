import type { Transition, Variants } from 'motion/react';
import type React from 'react';
import type { ToolTip } from '../sharedTypes';

export interface IconButtonProps {
	frameSize?: number;
	iconSize?: number;
	icon?: string;
	tooltip?: string;
	color?: string;
	colorOn?: string;
	fillColor?: string;
	disabled?: boolean;
	bgColor?: string;
	bgColorOn?: string;
	bgColorHover?: string;
	toggle?: boolean;
	hover?: boolean;
	toggleIcon?: boolean;
	isToggled?: boolean;
	showDot?: boolean;
	count?: number;
	transition?: Transition;
	label?: string;
	border?: boolean;
	variants?: Variants;
	initial?: string;
	animate?: string;
	exit?: string;
	borderRadius?: number;
	onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}
