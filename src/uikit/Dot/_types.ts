import type { Transition, Variants } from 'motion/react';

export interface DotProps {
	size?: number;
	topOffset?: number;
	rightOffset?: number;
	border?: number;
	position?: 'inline' | 'corner';
	state?: 'red' | 'yellow' | 'green' | 'blue' | 'grey';
	color?: string;
	transition?: Transition;
	motionValues?: Variants;
	show?: boolean;
}

// Extract default variants
export const DEFAULT_VARIANTS: Variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

// Extract default transition
export const DEFAULT_TRANSITION: Transition = {
	ease: 'easeInOut',
	duration: 0.5,
};
