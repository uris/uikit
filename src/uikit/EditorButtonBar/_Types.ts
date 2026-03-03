import type React from 'react';
import type { DropDownOption } from '../DropDown';
import type { ToolTip } from '../sharedTypes';

export type EditControls = {
	buttons?: ButtonBarGroup[];
	styles?: DropDownOption[];
	download?: ButtonBarButton;
};

export type ButtonBarButton = {
	icon?: string;
	toolTip?: string;
	command?: any;
	shortcut?: Shortcut;
	id?: FormattingOption;
};

export type ButtonBarGroup = {
	name?: string;
	buttons?: ButtonBarButton[];
};

export type Shortcut = {
	modifier?: 'meta' | 'shift';
	key?: string;
};

export enum FormattingOption {
	hilight = 'hilight',
	bold = 'bold',
	italic = 'italic',
	underline = 'underline',
	strikethrough = 'strikethrough',
	list = 'list',
	orderedList = 'ordered list',
	taskList = 'task list',
	sinkList = 'sink list',
	raiseList = 'raise list',
	undo = 'undo',
	redo = 'redo',
	download = 'download',
	more = 'more',
	copy = 'copy',
	link = 'link',
}

type EditorButtonBarBaseProps = {
	shortSize?: number;
	mediumSize?: number;
	state?: 'small' | 'medium' | 'regular' | 'auto';
	activeFormats?: string[];
	activeStyle?: 'h1' | 'h2' | 'h3' | 'p';
	disabledFormats?: string[];
	onCommand?: (command: any, e: React.MouseEvent<any> | undefined) => void;
	onToolTip?: (tip: ToolTip | null) => void;
};

export type EditorButtonBarProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof EditorButtonBarBaseProps
> &
	EditorButtonBarBaseProps;

export interface RenderGroupProps {
	onCommand?: (command: any, e: React.MouseEvent<any>) => void;
	onToolTip?: (tip: ToolTip | null) => void;
	buttonGroup: ButtonBarGroup;
	activeFormats?: string[];
	disabledFormats?: string[];
	state?: 'regular' | 'small' | 'medium';
}
