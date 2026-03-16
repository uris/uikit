import type React from 'react';

type TextAreaBaseProps = {
	value?: string;
	name?: string;
	width?: number | string;
	height?: number | string;
	minWidth?: number | string;
	rows?: number;
	focused?: boolean;
	placeholder?: string;
	padding?: number | string;
	validate?: boolean;
	border?: boolean;
	resizable?: boolean;
	hasSend?: boolean;
	sendOffset?: { bottom: number; right: number };
	sendSize?: number;
	bgColor?: string;
	borderRadius?: number;
	returnSubmits?: boolean;
	textSize?: 's' | 'm' | 'l';
	disabled?: boolean;
	submitClears?: boolean;
	onChange?: (value: string) => void;
	onSubmit?: (value: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onValidate?: (state: boolean) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export type TextAreaProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof TextAreaBaseProps
> &
	TextAreaBaseProps;

export type Tip = {
	icon?: string;
	iconRight?: boolean;
	key: string;
	label?: string;
};
