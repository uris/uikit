import type React from 'react';
import type { ToolTip } from '../sharedTypes';

type ChipBaseProps = {
	children?: React.ReactNode;
	label?: string;
	labelSize?: 's' | 'm' | 'l';
	labelColor?: string;
	labelColorHover?: string;
	icon?: string;
	iconSize?: number;
	iconPosition?: 'left' | 'right';
	iconColor?: string;
	iconColorHover?: string;
	bgColor?: string;
	bgColorHover?: string;
	disabled?: boolean;
	focused?: boolean;
	tooltip?: string;
	borderSize?: number;
	borderColor?: string;
	borderColorHover?: string;
	borderColorDisabled?: string;
	borderRadius?: number;
	gap?: number;
	paddingTops?: number;
	paddingSides?: number;
	onToolTip?: (tip: ToolTip | null) => void;
	onClick?: (e: React.MouseEvent<HTMLDivElement> | undefined) => void;
};

export type ChipProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof ChipBaseProps
> &
	ChipBaseProps;
