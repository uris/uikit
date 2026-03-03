import type React from 'react';

type UICardBaseProps = {
	id?: string;
	icon?: string;
	label?: string;
	command?: string;
	width?: number | string;
	onCommand?: (command: { id?: string; command?: string }) => void;
};

export type UICardProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof UICardBaseProps
> &
	UICardBaseProps;
