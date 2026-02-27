export interface SliderProps {
	value?: number;
	scaleMin?: number;
	scaleMax?: number;
	width?: number | string;
	height?: number | string;
	touchHeight?: number | string;
	trackHeadSize?: number | null;
	trackHeadWidth?: number | null;
	headType?: 'round' | 'square' | 'none';
	headColor?: string;
	trackColor?: string;
	progressColor?: string;
	cursor?: 'default' | 'grab' | 'grabbing' | 'pointer';
	onChange?: (value: number, percent: number) => void;
	onDragChange?: (value: number, percent: number) => void;
}
