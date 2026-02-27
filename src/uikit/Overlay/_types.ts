export interface OverlayProps {
	opacity?: number;
	color?: string;
	type?: 'clear' | 'dark';
	global?: boolean;
	overlay?: any;
	onClick?: () => void;
	toggleOverlay?: (state: boolean) => void;
}
