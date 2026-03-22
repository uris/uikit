import type React from 'react';

type SwitchBaseProps = {
	state?: boolean;
	height?: number;
	width?: number;
	bgColorOff?: string;
	bgColorOn?: string;
	knobColor?: string;
	padding?: number;
	onChange?: (state: boolean) => void;
};

export type SwitchProps = Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	keyof SwitchBaseProps
> &
	SwitchBaseProps;
