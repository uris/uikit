import type React from 'react';

type BasePromptProps = {
	value?: string;
	maxHeight?: string | number;
	working?: boolean;
	borderStyle?: 'solid' | 'gradient' | 'none';
	borderWidth?: number;
	borderColor?: string | number;
	borderColorOn?: string | number;
	borderAnimate?: boolean;
	borderRadius?: number;
	placeholder?: string;
	placeholderWorking?: string;
	focused?: boolean;
	submitClears?: boolean;
	submitEnablesStop?: boolean;
	enterSubmits?: boolean;
	sendButton?: boolean;
	attachButton?: boolean;
	stopEnabled?: boolean;
	maxLength?: number;
	onChange?: (value: string) => void;
	onSubmit?: (value: string) => void;
	onBlur?: (value: string | undefined) => void;
	onFocus?: (value: string | undefined) => void;
	onStop?: () => void;
};

export type PromptProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof BasePromptProps
> &
	BasePromptProps;
