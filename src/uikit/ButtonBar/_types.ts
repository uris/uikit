import type React from 'react';
import type { ToolTip } from '../sharedTypes';

export type BarButton = {
	icon?: string;
	command?: string;
	label?: string;
	tip: string;
};

type ButtonBarBaseProps = {
	options?: BarButton[];
	label?: string;
	current?: number;
	onChange?: (option: BarButton) => void;
	onToolTip?: (tip: ToolTip | null) => void;
};

export type ButtonBarProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof ButtonBarBaseProps
> &
	ButtonBarBaseProps;
