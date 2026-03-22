import type React from 'react';

type LabelBaseProps = {
	children?: React.ReactNode;
	state?: 'red' | 'yellow' | 'green' | 'blue' | 'grey' | 'lightgrey' | 'white';
	noFill?: boolean;
	round?: boolean;
	button?: boolean;
	border?: number;
	padding?: number | string;
	inline?: boolean;
	color?: string;
	size?: 's' | 'm' | 'l';
	onClick?: (e: React.MouseEvent<any>) => void;
};

export type LabelProps = Omit<
	React.HTMLAttributes<HTMLElement>,
	keyof LabelBaseProps
> &
	LabelBaseProps;
