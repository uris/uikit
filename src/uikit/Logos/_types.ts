import type React from 'react';

type LogoBaseProps = {
	image?:
		| 'zoom'
		| 'impossible foods'
		| 'gong'
		| 'seattle seahawks'
		| 'smile'
		| 'drift'
		| 'taylor made'
		| 'envu'
		| 'pdf'
		| 'G2Leader'
		| 'reviews'
		| 'G2Logo'
		| 'apple'
		| 'yahoo'
		| 'outlook'
		| 'outlook-com'
		| 'google'
		| 'linkedin'
		| 'stripe'
		| 'slice'
		| 'slice logo';
	color?: string;
	height?: number | string;
	width?: number | string;
};

export type LogoProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof LogoBaseProps
> &
	LogoBaseProps;
