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
	React.HTMLAttributes<HTMLDivElement>,
	keyof SwitchBaseProps
> &
	SwitchBaseProps;
