import type React from 'react';
import type { IconNames } from '../Icon/_types';
import type { ToolTip } from '../sharedTypes';

type UIChipBaseProps = {
	label?: string;
	icon?: IconNames | string;
	disabled?: boolean;
	focused?: boolean;
	tooltip?: string;
	background?: string;
	variant?: 'small' | 'regular';
	labelSize?: 's' | 'm' | 'l';
	unframed?: boolean;
	iconRight?: boolean;
	iconColor?: string;
	onToolTip?: (tip: ToolTip | null) => void;
	onClick?: (e: React.MouseEvent<HTMLDivElement> | undefined) => void;
	onMouseDown?: (e: React.MouseEvent<HTMLDivElement> | undefined) => void;
};

export type UIChipProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof UIChipBaseProps
> &
	UIChipBaseProps;
