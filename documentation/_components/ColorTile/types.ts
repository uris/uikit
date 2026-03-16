import type { ToolTip } from '../../../src/components/sharedTypes';
import type { SliceTheme } from '../../../src/theme/themes';

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
