import type React from 'react';

type UILabelBaseProps = {
	label?: string;
	state?: 'red' | 'yellow' | 'green' | 'blue' | 'grey' | 'lightgrey' | 'white';
	noFill?: boolean;
	round?: boolean;
	button?: boolean;
	onClick?: (e: React.MouseEvent<any>) => void;
};

export type UILabelProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof UILabelBaseProps
> &
	UILabelBaseProps;
