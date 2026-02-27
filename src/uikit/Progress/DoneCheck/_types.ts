export interface DoneCheckProps {
	size?: number;
	color?: string;
	stroke?: number;
	duration?: number;
	bounce?: number;
	delay?: number;
	play?: boolean;
	didStart?: () => void;
	didEnd?: () => void;
}
