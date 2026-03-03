import type React from 'react';

type DoneCheckBaseProps = {
	size?: number;
	color?: string;
	stroke?: number;
	duration?: number;
	bounce?: number;
	delay?: number;
	play?: boolean;
	didStart?: () => void;
	didEnd?: () => void;
};

export type DoneCheckProps = Omit<
	React.SVGAttributes<SVGSVGElement>,
	keyof DoneCheckBaseProps
> &
	DoneCheckBaseProps;
