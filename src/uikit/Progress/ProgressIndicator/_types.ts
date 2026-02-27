export interface ProgressIndicatorProps {
	size?: number;
	secondsPerSpin?: number;
	show?: boolean;
	color?: string;
	stroke?: number;
	duration?: number;
	inline?: boolean;
	didStart?: () => void;
	didStop?: () => void;
}
