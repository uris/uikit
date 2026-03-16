import type React from 'react';

export type ErrorMessage = {
	id?: string;
	title?: string;
	bullets?: string[];
};

type ErrorSummaryBaseProps = {
	entries?: ErrorMessage[];
	errors?: any[];
};

export type ErrorSummaryProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof ErrorSummaryBaseProps
> &
	ErrorSummaryBaseProps;
