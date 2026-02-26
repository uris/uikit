import type React from 'react';
import type { ToolTip } from '../sharedTypes';

export interface AvatarProps {
	size?: number;
	frame?: number;
	first?: string;
	last?: string;
	image?: string;
	border?: number;
	color?: string;
	borderColor?: string;
	bgColor?: string;
	firstOnly?: boolean;
	fontSize?: number | 'auto';
	onToolTip?: (tip: ToolTip | null) => void;
	onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
	tabIndex?: number;
}
