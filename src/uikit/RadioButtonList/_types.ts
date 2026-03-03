import type React from 'react';
import type { RadioButtonOption } from '../RadioButton/_types';

type RadioButtonListBaseProps = {
	options?: RadioButtonOption[];
	selectedIndexes?: number[] | null;
	selectedOptions?: string[] | null;
	label?: string | null;
	deselect?: boolean;
	multiSelect?: boolean;
	wrap?: boolean;
	spacer?: 'xl' | 'lg' | 'md' | 'sm' | 'custom' | 'none';
	custom?: number;
	gap?: number;
	tabIndexSeed?: number;
	hideRadio?: boolean;
	toggleIcon?: boolean;
	iconColor?: string;
	iconSelectedColor?: string;
	noFrame?: boolean;
	onChange?: (
		options: RadioButtonOption[] | null,
		indexes: number[] | null,
	) => void;
};

export type RadioButtonListProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof RadioButtonListBaseProps
> &
	RadioButtonListBaseProps;
