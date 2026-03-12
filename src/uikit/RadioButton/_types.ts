import type React from 'react';

export type RadioButtonOption = {
	fieldName?: string;
	title?: string;
	description?: string;
	state?: boolean;
	icon?: string;
};

type RadioButtonBaseProps = {
	selected?: boolean;
	option: RadioButtonOption;
	deselect?: boolean;
	tabIndex?: number;
	wrap?: boolean;
	list?: boolean;
	hideRadio?: boolean;
	toggleIcon?: boolean;
	iconColor?: string;
	noFrame?: boolean;
	gap?: number;
	checkedIcon?: 'check circle' | 'circle fill';
	onChange?: (option: RadioButtonOption, state: boolean) => void;
};

export type RadioButtonProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof RadioButtonBaseProps
> &
	RadioButtonBaseProps;
