export type DropDownOption = {
	label?: string;
	value?: string;
	alt?: string;
};

export interface DropDownProps {
	name?: string;
	options?: DropDownOption[];
	selectedIndex?: number;
	selectedValue?: string;
	placeholder?: boolean;
	borderRadius?: number;
	validate?: boolean;
	iconColor?: string;
	bgColor?: string;
	width?: string;
	height?: string;
	paddingLeft?: number | string;
	paddingRight?: number | string;
	paddingTops?: number | string;
	iconSize?: number;
	disabled?: boolean;
	unframed?: boolean;
	focused?: boolean;
	gap?: number;
	size?: 'small' | 'medium' | 'large';
	onChange?: (index: number, option: DropDownOption) => void;
	onBlur?: (value: string) => void;
	onValidate?: (state: boolean) => void;
	onFocus?: () => void;
}
