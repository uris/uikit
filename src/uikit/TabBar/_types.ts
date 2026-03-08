import type React from 'react';
import type { ToolTip } from '../sharedTypes';

export type TabOption = {
	name?: string;
	value?: any;
	icon?: string | null;
	toolTip?: string;
	count?: number;
	component?: any;
};

export const placeholderOptions: TabOption[] = [
	{ name: 'Option 1', value: 'Option 1', icon: null },
	{ name: 'Option 2', value: 'Option 2', icon: 'wallet' },
];

type TabBarBaseProps = {
	options?: TabOption[];
	selected?: number;
	underline?: boolean;
	border?: boolean;
	selectedValue?: string;
	height?: number | string;
	width?: number | string;
	tabWidth?: 'min-content' | 'distribute' | number;
	closeWidth?: number | string;
	padding?: number | string;
	iconSize?: number;
	iconGap?: number;
	tabGap?: number;
	disabled?: boolean;
	hasClose?: boolean;
	onToolTip?: (tip: ToolTip | null) => void;
	onChange?: (index: number) => void;
	onTabChange?: (option: TabOption) => void;
	onClose?: () => void;
};

export type TabBarProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof TabBarBaseProps
> &
	TabBarBaseProps;

export interface TabOptionProps {
	label?: string;
	value?: number;
	icon?: string | null;
	showToolTip?: string | null;
	selected?: boolean;
	padding?: number | string;
	iconSize?: number;
	iconGap?: number;
	disabled?: boolean;
	count?: number;
	tabWidth?: 'min-content' | 'distribute' | number;
	underline?: boolean;
	onClick?: (value: number) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}
