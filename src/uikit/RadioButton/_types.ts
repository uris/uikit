export type RadioButtonOption = {
	fieldName?: string;
	title?: string;
	description?: string;
	state?: boolean;
	icon?: string;
};

export interface RadioButtonProps {
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
	onChange?: (option: RadioButtonOption, state: boolean) => void;
}
