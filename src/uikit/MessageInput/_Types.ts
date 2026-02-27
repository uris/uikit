import type { DocExcerpt } from './ExcerptList/_types';

export type SendMessage = {
	id: string;
	content: string;
	timestamp: string;
	promptType: PromptType;
	role: Role;
	htmlContent: string;
	files: File[];
	excerpts: DocExcerpt[];
	done: boolean;
};

export enum PromptType {
	none = -1,
	text = 0,
	expand = 1,
	summarize = 2,
	research = 3,
	translate = 4,
	shorten = 5,
	file = 6,
	compliance = 7,
}

export enum Role {
	USER = 'user',
	ASSISTANT = 'assistant',
	TOOL = 'tool',
	SYSTEM = 'system',
}

export type UploadDocument = {
	fileName?: string;
	mimeType?: string;
	size?: number;
	docType?: DocumentType;
	lastModified?: string;
	localURL?: string;
	file?: File;
};

export type JurisdictionFocus = {
	country?: string | null;
	state?: string | null;
};
