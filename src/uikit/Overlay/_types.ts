import type React from 'react';

type OverlayBaseProps = {
	opacity?: number;
	color?: string;
	type?: 'clear' | 'dark';
	global?: boolean;
	overlay?: any;
	onClick?: () => void;
	toggleOverlay?: (state: boolean) => void;
};

export type OverlayProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof OverlayBaseProps
> &
	OverlayBaseProps;
