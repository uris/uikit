export type UserPresence = {
  id?: string;
  first?: string;
  last?: string;
  email?: string;
  avatar?: string;
  conversationID?: string;
  promptState?: PrompState;
  promptContent?: string;
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
