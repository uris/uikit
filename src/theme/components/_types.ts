import type { ToolTip } from '../../uikit/sharedTypes';

export interface ColorTileProps {
	token?: string;
	hex?: string;
	width?: number;
	height?: number;
	onCopy?: (token: string, hex: string) => void;
	onTooltip?: (tip: ToolTip | null) => void;
}
