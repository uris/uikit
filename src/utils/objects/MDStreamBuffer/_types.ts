export interface MarkdownStreamBufferSnapshot {
	raw: string;
	healthy: string;
	reason: 'raf' | 'manual' | 'complete';
	isComplete: boolean;
}

export interface MarkdownAutoCloseRule {
	name?: string;
	open: string;
	close: string;
	mode?: 'paired' | 'line';
	linePattern?: RegExp;
	partialLinePattern?: RegExp;
	requiresLineStart?: boolean;
	requiresContent?: boolean;
}

export interface MarkdownStreamBufferOptions {
	endOfStreamToken?: string;
	htmlHandling?: 'ignore' | 'strip';
	includeLinksAndImages?: boolean;
	onFlush?: (snapshot: MarkdownStreamBufferSnapshot) => void;
	requestFrame?: (callback: FrameRequestCallback) => number;
	cancelFrame?: (handle: number) => void;
	watchedMarkers?: MarkdownAutoCloseRule[];
}
