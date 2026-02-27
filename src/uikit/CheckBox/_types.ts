export interface CheckBoxProps {
	size?: number;
	checked?: 'mixed' | boolean;
	disabled?: boolean;
	color?: string;
	label?: string;
	onChange?: (state: boolean) => void;
}
