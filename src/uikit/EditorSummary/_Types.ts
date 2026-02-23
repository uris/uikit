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
