import type React from 'react';
import type { ToolTip } from '../sharedTypes';

export type BarButton = {
	icon?: string;
	action?: string;
	label?: string;
	tip: string;
};

type ButtonBarBaseProps = {
	buttons?: BarButton[];
	buttonSize?: number;
	iconSize?: number;
	toggle?: boolean;
	selected?: number;
	borderRadius?: number | string;
	borderSize?: number;
	borderColor?: string;
	bgColor?: string;
	bgColorHover?: string;
	bgColorActive?: string;
	labelColor?: string;
	onClick?: (button: BarButton) => void;
	onChange?: (option: BarButton) => void;
	onToolTip?: (tip: ToolTip | null) => void;
};

export type ButtonBarProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof ButtonBarBaseProps
> &
	ButtonBarBaseProps;
