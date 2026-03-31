import type { Transition, Variants } from 'motion/react';
import type React from 'react';
import type { ToolTip } from '../sharedTypes';

type IconButtonBaseProps = {
	round?: boolean;
	frameSize?: number;
	iconSize?: number;
	icon?: string;
	iconColor?: string;
	iconColorOn?: string;
	iconColorHover?: string;
	tooltip?: string;
	color?: string;
	colorOn?: string;
	fillColor?: number;
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
	onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onToolTip?: (tip: ToolTip | null) => void;
	buttonSize?: 's' | 'm' | 'l' | 'xl';
};

export type IconButtonProps = Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	keyof IconButtonBaseProps
> &
	IconButtonBaseProps;
