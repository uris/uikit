export interface CheckBoxProps {
	size?: number;
	checked?: 'partial' | boolean;
	disabled?: boolean;
	color?: string;
	label?: string;
	onChange?: (state: boolean) => void;
}
