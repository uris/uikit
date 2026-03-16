import type React from 'react';
import type { ToolTip } from '../sharedTypes';

export type AvatarBaseProps = {
	size?: number | string;
	frame?: number | string;
	first?: string;
	last?: string;
	image?: string;
	border?: number;
	color?: string;
	borderColor?: string;
	bgColor?: string;
	firstOnly?: boolean;
	fontSize?: number | string;
	onToolTip?: (tip: ToolTip | null) => void;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	tabIndex?: number;
};

export type AvatarProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof AvatarBaseProps
> &
	AvatarBaseProps;
