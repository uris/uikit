import type { Transition } from 'motion/react';

export interface SwitchProps {
	state?: boolean;
	height?: number;
	width?: number;
	bgColorOff?: string;
	bgColorOn?: string;
	knobColor?: string;
	padding?: number;
	onChange?: (state: boolean) => void;
}
