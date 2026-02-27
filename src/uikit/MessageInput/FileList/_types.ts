import type { ToolTip } from '../../sharedTypes';

export interface FileListProps {
	files?: File[];
	onChange?: (files: File[]) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}
