export type TabOption = {
  name?: string;
  value?: any;
  icon?: string | null;
  toolTip?: string;
  count?: number;
  component?: any;
};

export type ToolTip = {
  show?: boolean;
  type?: ToolTipType;
  payload?: any;
  rect?: DOMRect;
  event?: MouseEvent | React.MouseEvent<any>;
};
export const enum ToolTipType {
  menu = "menu",
  button = "button",
  general = "general",
  other = "other",
}

export type ToolTipInfo = {
  title?: string | null;
  description?: string | null;
  image?: string | null;
};
