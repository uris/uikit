import type { ToolTip } from '../sharedTypes';

export type AvatarInfo = {
	first?: string;
	last?: string;
	image?: any;
	avatar?: string;
	email?: string;
	color?: string;
	bgColor?: string;
};

export interface AvatarGroupProps {
	avatars?: AvatarInfo[] | null;
	size?: number;
	overlap?: number;
	border?: number;
	borderColor?: string;
	gap?: number;
	margin?: number;
	firstOnly?: boolean;
	onToolTip?: (tip: ToolTip | null) => void;
}
