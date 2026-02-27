export interface UICardProps {
	id?: string;
	icon?: string;
	label?: string;
	command?: string;
	width?: number | string;
	onCommand?: (command: { id?: string; command?: string }) => void;
}
