import type React from 'react';

type UILabelBaseProps = {
	children?: React.ReactNode;
	state?: 'red' | 'yellow' | 'green' | 'blue' | 'grey' | 'lightgrey' | 'white';
	noFill?: boolean;
	round?: boolean;
	button?: boolean;
	border?: number;
	padding?: number | string;
	color?: string;
	size?: 's' | 'm' | 'l';
	onClick?: (e: React.MouseEvent<any>) => void;
};

export type UILabelProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof UILabelBaseProps
> &
	UILabelBaseProps;
