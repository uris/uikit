import type { Transition } from 'motion/react';
import type React from 'react';

export interface TextFieldProps {
	value?: string;
	name?: string;
	label?: string;
	labelSize?: 's' | 'm' | 'l';
	textSize?: 's' | 'm' | 'l';
	placeholder?: string;
	focused?: boolean;
	editable?: boolean;
	onChange?: (value: string) => void;
	onBlur?: (value: string) => void;
	onFocus?: (value: string) => void;
	onKeydown?: (key: string, event: React.KeyboardEvent) => void;
	onSubmit?: (value: string) => void;
	onPaste?: (value: React.ClipboardEvent<HTMLInputElement>) => void;
	onClear?: () => void;
	onAction?: () => void;
	onValidate?: (state: boolean) => void;
	isValid?: boolean;
	inline?: boolean;
	maxLength?: number;
	size?: { width?: number | string; height?: number | string };
	padding?: string;
	borderRadius?: number | string;
	textAlign?: 'left' | 'center';
	borderColor?: { focused: string; blurred: string; error: string };
	backgroundColor?: { focused: string; blurred: string };
	color?: {
		focused: string;
		blurred: string;
		error: string;
		placeholder: string;
		disabled: string;
		label: string;
	};
	validate?: boolean;
	iconLeft?: { name?: string; size?: number; color?: string };
	clearButton?: { size?: number } | null;
	clearBlurs?: boolean;
	disabled?: boolean;
	actionButton?: boolean;
	borderType?: 'box' | 'underline' | 'none';
	inputType?: 'text' | 'password';
	noShow?: boolean;
}

export const MOTION_CONFIG = {
	variants: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	},
	transition: { ease: 'easeInOut', duration: 0.25 } as Transition,
};
