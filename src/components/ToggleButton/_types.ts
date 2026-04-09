import type React from 'react';
import type { ToolTip } from '../sharedTypes';

export interface ToggleButtonProps {
	children?: React.ReactNode;
	label?: string;
	textSize?: 's' | 'm' | 'l';
	buttonSize?: 's' | 'm' | 'l' | 'xl';
	frameSize?: number;
	icon?: string;
	selected?: boolean;
	iconColor?: string;
	iconColorOn?: string;
	bgColor?: string;
	bgColorOn?: string;
	onChange?: (state: boolean) => void;
	onSelect?: () => void;
	onToolTip?: (tip: ToolTip | null) => void;
	gap?: number;
	border?: boolean;
	iconSize?: number;
	tooltip?: string;
	fill?: boolean;
	unselect?: boolean;
	disabled?: boolean;
}
