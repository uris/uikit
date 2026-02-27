import type React from 'react';

export interface UILabelProps {
	label?: string;
	state?: 'red' | 'yellow' | 'green' | 'blue' | 'grey' | 'lightgrey' | 'white';
	noFill?: boolean;
	round?: boolean;
	button?: boolean;
	onClick?: (e: React.MouseEvent<any>) => void;
}
