import type React from 'react';
import type { ToolTip } from '../sharedTypes';

export type FileItem = {
	file: File | string;
	uploading?: boolean;
	progress?: number;
	error?: string;
};
export type FileItems = FileItem[];
export type FileInput = FileItems | FileList;

type FileListBaseProps = {
	files?: FileInput;
	direction?: 'row' | 'column';
	gap?: number;
	size?: 'xs' | 's' | 'm' | 'l' | 'xl';
	maxWidth?: number | string;
	minWidth?: number | string;
	padding?: number | string;
	iconSize?: number;
	onChange?: (files: FileItems) => void;
	onToolTip?: (tip: ToolTip | null) => void;
};

export type FileListProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof FileListBaseProps
> &
	FileListBaseProps;
