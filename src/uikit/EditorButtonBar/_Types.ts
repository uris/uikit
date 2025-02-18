import { DropDownOption } from '../DropDown';

export type EditControls = {
  buttons?: ButtonBarGroup[];
  styles?: DropDownOption[];
  download?: ButtonBarButton;
};

export type ButtonBarButton = {
  icon?: string;
  toolTip?: string;
  command?: any;
  shortcut?: Shorcut;
  id?: FormattingOption;
};

export type ButtonBarGroup = {
  buttons?: ButtonBarButton[];
};

export type Shorcut = {
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
}
