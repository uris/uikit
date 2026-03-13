import type React from 'react';

type DocsBaseProps = {
	type?: 'pdf' | 'docx' | 'text' | 'not supported';
	height?: number;
};

export type DocsProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof DocsBaseProps
> &
	DocsBaseProps;
