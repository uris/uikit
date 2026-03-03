import type React from 'react';

type CheckBoxBaseProps = {
	size?: number;
	checked?: 'mixed' | boolean;
	disabled?: boolean;
	color?: string;
	label?: string;
	onChange?: (state: boolean) => void;
};

export type CheckBoxProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof CheckBoxBaseProps
> &
	CheckBoxBaseProps;
