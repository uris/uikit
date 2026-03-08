import type React from 'react';
import type { ToolTip } from '../sharedTypes';

export type FileItem = File | string;
export type FileItems = FileItem[];
export type FileInput = FileItems | FileList;

type FileListBaseProps = {
	files?: FileInput;
	direction?: 'row' | 'column';
	gap?: number;
	size?: 's' | 'm' | 'l';
	maxWidth?: number | string;
	onChange?: (files: FileItems) => void;
	onToolTip?: (tip: ToolTip | null) => void;
};

export type FileListProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof FileListBaseProps
> &
	FileListBaseProps;
