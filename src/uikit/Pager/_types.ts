export interface PagerProps {
	size?: number;
	index?: number;
	color?: string;
	colorOn?: string;
	colorHover?: string;
	pages?: number;
	gap?: number;
	onChange?: (index: number) => void;
}
