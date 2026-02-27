import type { ToolTip } from '../../sharedTypes';

export type UserPresence = {
	id?: string;
	first?: string;
	last?: string;
	email?: string;
	avatar?: string;
	color?: string;
	bgColor?: string;
	conversationID?: string;
	promptState?: PrompState;
	promptContent?: string;
	docID?: string;
	docRange?: { from: number; to: number };
};

export enum PrompState {
	Idle = 'idle',
	Disabled = 'disabled',
	Enabled = 'enabled',
}

export enum Role {
	Owner = 'owner',
	Editor = 'editor',
	Viewer = 'viewer',
}

export type PresensceColor = {
	background?: string;
	color?: string;
};

export interface UserListProps {
	userPresence?: UserPresence[];
	owner?: string;
	currentUser?: string;
	presenceID?: string;
	onTogglePrompt?: (userPresence: UserPresence) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}
