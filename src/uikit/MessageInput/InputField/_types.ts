import type React from 'react';
import type { ToolTip } from '../../sharedTypes';
import type { DocExcerpt } from '../ExcerptList/_types';
import type { UserPresence } from '../UserList/_types';
import type { JurisdictionFocus, SendMessage } from '../_types';

type MessageInputBaseProps = {
	maxHeight?: number;
	focused?: boolean;
	height?: string;
	placeholder?: string;
	value?: string;
	role?: string;
	showFilters?: boolean;
	isFetching?: boolean;
	isStreaming?: boolean;
	isShort?: boolean;
	error?: string | null;
	files?: File[];
	excerpts?: DocExcerpt[];
	users?: UserPresence[];
	currentUser?: string;
	owner?: string;
	presenceID?: string;
	jurisdiction?: JurisdictionFocus | null;
	jurisdictionClick?: () => void;
	complianceCheckClick?: () => void;
	attachClick?: (e: React.MouseEvent<any> | undefined) => void;
	onChangeFiles?: (files: File[]) => void;
	onChangeExcerpts?: (excerpts: DocExcerpt[]) => void;
	onTogglePrompt?: (presence: UserPresence) => void;
	onToolTip?: (tip: ToolTip | null) => void;
	onChange?: (prompt: string) => void;
	onBlur?: () => void;
	onFocus?: () => void;
	onSend?: (message: SendMessage) => void;
	onStop?: () => void;
};

export type MessageInputProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof MessageInputBaseProps
> &
	MessageInputBaseProps;
