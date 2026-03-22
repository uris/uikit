import type React from 'react';

type CardBaseProps = {
	id?: string;
	icon?: string;
	label?: string;
	command?: string;
	width?: number | string;
	onCommand?: (command: { id?: string; command?: string }) => void;
};

export type CardProps = Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	keyof CardBaseProps
> &
	CardBaseProps;
