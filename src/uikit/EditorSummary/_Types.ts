import type { ToolTip } from '../sharedTypes';

export type Edits = {
	remove?: { position: number; value: string; id: string };
	add?: { position: number; value: string; id: string };
};

export type SuggestMark = {
	id: string;
	action: 'add' | 'remove';
	from: number;
	to: number;
};

export interface EditorSummaryProps {
	edits?: SuggestMark[];
	current?: number;
	label?: string;
	onAcceptAll?: () => void;
	onRejectAll?: () => void;
	onAccept?: (edit: SuggestMark) => void;
	onReject?: (edit: SuggestMark) => void;
	onChange?: (index: number, edit: SuggestMark) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}
