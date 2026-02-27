import type { ToolTip } from '../../sharedTypes';

export type DocExcerpt = {
	content?: string;
	docTitle?: string;
	range?: { to: number; from: number } | null;
	docID?: string;
};

export interface ExcerptListProps {
	excerpts?: DocExcerpt[];
	onChange?: (excerpts: DocExcerpt[]) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}
