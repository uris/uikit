import type { ToolTip } from '../sharedTypes';

export type BarButton = {
	icon?: string;
	command?: string;
	label?: string;
	tip: string;
};

export interface UIButtonBarProps {
	options?: BarButton[];
	label?: string;
	current?: number;
	onChange?: (option: BarButton) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}
