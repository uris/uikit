import type { ToolTip } from '../../uikit/sharedTypes';
import type { SliceTheme } from '../themes';

export interface ColorTileProps {
	token?: string;
	core?: string;
	hex?: string;
	width?: number;
	height?: number;
	onCopy?: (token: string, hex: string) => void;
	onTooltip?: (tip: ToolTip | null) => void;
}

export interface ColorTileGroupProps {
	pattern?: string | string[];
	theme?: SliceTheme;
}
