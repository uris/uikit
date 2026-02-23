import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import css from './Slider.module.css';

export interface SliderProps {
	initial?: number;
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
	rounding?: number;
	cursor?: 'default' | 'grab' | 'grabbing' | 'pointer';
	state?: any[];
	onChange?: (value: number, percent: number) => void;
	onDragChange?: (value: number, percent: number) => void;
}

export const Slider = React.memo((props: SliderProps) => {
	const {
		initial = 25,
		scaleMin = 0,
		scaleMax = 100,
		width = 100,
		height = 2,
		touchHeight = 24,
		trackHeadSize = 7,
		headType = 'round',
		trackHeadWidth = 4,
		rounding = 2,
		cursor = 'default',
		headColor = 'var(--core-text-primary)',
		trackColor = 'var(--core-surface-secondary)',
		progressColor = 'var(--core-text-primary)',
		state = [],
		onChange = () => null,
		onDragChange = () => null,
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const track = useRef<HTMLDivElement>(null);
	const head = useRef<HTMLDivElement>(null);

	// set the position of the track progress and track head
	// based on the pixel position
	const setTrackAndHead = useCallback((pixelPos: number) => {
		const tr = track.current;
		const hd = head.current;
		if (tr && hd) {
			tr.style.width = `${pixelPos}px`;
			hd.style.left = `${pixelPos - hd.offsetWidth / 2}px`;
		}
	}, []);

	// set the initial position of the slider absolute value within scale
	const initialProgress = useCallback(
		(current: number): void => {
			if (!ref?.current) return;
			const sliderWidth = ref.current.getBoundingClientRect().width;
			let adjustedCurrent = current;
			if (adjustedCurrent > scaleMax || adjustedCurrent < scaleMin) {
				console.warn(
					'Slider value outside scale range. Auto adjusting to mid point.',
				);
				adjustedCurrent = (scaleMax - scaleMin) / 2;
			}
			const normalized = (adjustedCurrent - scaleMin) / (scaleMax - scaleMin);
			const pixelPos = normalized * sliderWidth;
			setTrackAndHead(pixelPos);
		},
		[scaleMax, scaleMin, setTrackAndHead],
	);

	// based on x pos of a mouse drag/click, get the percent and normalized value of the slider
	const progress = useCallback(
		(posX: number): { value: number; percent: number } => {
			const el = ref?.current;
			if (!el) return { value: 0, percent: 0 };
			const rect = el.getBoundingClientRect();
			const sliderWidth = rect.width;
			const percent: number = posX / sliderWidth;
			const value: number = scaleMin + percent * (scaleMax - scaleMin);
			return {
				value: Number.parseFloat(value.toFixed(rounding)),
				percent: Number.parseFloat(percent.toFixed(rounding)),
			};
		},
		[rounding, scaleMax, scaleMin],
	);

	// take a mouse pos and sets the slider position accordingly
	// returns the pos value making sure it's in bounds
	const updateSlider = useCallback(
		(e: any) => {
			const el = ref?.current;
			if (!el) return 0;
			const rect = el.getBoundingClientRect();
			const sliderWidth = rect.width;
			let pos: number = e.clientX - rect.x;
			if (pos > sliderWidth) pos = sliderWidth;
			else if (pos < 0) pos = 0;
			setTrackAndHead(pos);
			return pos;
		},
		[setTrackAndHead],
	);

	// on mouse move, push slider to the updated mouse position and trigger the update events
	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			e.preventDefault();
			const el = ref?.current;
			if (el) {
				const pos = updateSlider(e); // return new pixel pos and updates head/track
				const sliderValues = progress(pos);
				onChange(sliderValues.value, sliderValues.percent);
			}
		},
		[onChange, progress, updateSlider],
	);

	// on mouse up, push slider to the updated mouse up position and trigger the update events
	// also cleaning up the mouse move and mouse up listeners attached to the window
	const handleMouseUp = useCallback(
		(e: MouseEvent) => {
			e.preventDefault();
			globalThis.removeEventListener('mousemove', handleMouseMove, false);
			globalThis.removeEventListener('mouseup', handleMouseUp, false);
			const el = ref?.current;
			if (el) {
				const pos = updateSlider(e); // return new pixel pos and updates head/track
				const sliderValues = progress(pos);
				onDragChange(sliderValues.value, sliderValues.percent);
			}
		},
		[handleMouseMove, progress, onDragChange, updateSlider],
	);

	// On mouse down push the progress of then slider to the mouse down point
	// and trigger events - add the drag and mouse up window listeners
	const handleMouseDown = useCallback(
		(e: MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			globalThis.addEventListener('mousemove', handleMouseMove, false);
			globalThis.addEventListener('mouseup', handleMouseUp, false);
			const el = ref?.current;
			if (el) {
				const pos = updateSlider(e); // return new pixel pos and updates head/track
				const sliderValues = progress(pos);
				onChange(sliderValues.value, sliderValues.percent);
				onDragChange(sliderValues.value, sliderValues.percent);
			}
		},
		[
			handleMouseMove,
			handleMouseUp,
			onChange,
			onDragChange,
			progress,
			updateSlider,
		],
	);

	// set the very first state of the slider - note the empty dependency
	// ensuring the initial state will be applied only once on the component load
	useEffect(() => {
		const el = ref?.current;
		if (el) {
			el?.addEventListener('mousedown', handleMouseDown, false);
			initialProgress(initial);
		}
		return () => {
			el?.removeEventListener('mousedown', handleMouseDown, false);
		};
	}, [initial, handleMouseDown, initialProgress]);

	// because we use addEventListener, need to refresh based on state updates,
	// so we use the state prop as a dependency to re-apply listeners without setting
	// the current position to avoid infinite render
	// biome-ignore lint/correctness/useExhaustiveDependencies: state dependency is intentional to refresh event listeners
	useEffect(() => {
		const el = ref?.current;
		if (el) el?.addEventListener('mousedown', handleMouseDown, false);
		return () => {
			el?.removeEventListener('mousedown', handleMouseDown, false);
		};
	}, [state, handleMouseDown]);

	// memo head width
	const headWidth = useMemo(() => {
		if (headType === 'round') return trackHeadSize;
		return trackHeadWidth;
	}, [headType, trackHeadSize, trackHeadWidth]);

	// memo head color
	const trackHeadColor = useMemo(() => {
		if (headType === 'none') return 'transparent';
		return headColor ?? 'var(--core-text-primary)';
	}, [headColor, headType]);

	// memo head height
	const headSize = useMemo(() => {
		if (headType === 'none') return height;
		return trackHeadSize;
	}, [trackHeadSize, headType, height]);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--slider-width': `${width}px`,
			'--slider-height': `${height}px`,
			'--slider-touch-height': `${touchHeight}px`,
			'--slider-cursor': cursor,
			'--slider-head-display': height ? 'block' : 'none',
			'--slider-head-radius': headType === 'round' ? '100%' : '0px',
			'--slider-head-size': `${headSize}px`,
			'--slider-head-width': `${headWidth}px`,
			'--slider-head-color': trackHeadColor,
			'--slider-progress-color': progressColor ?? 'var(--core-text-primary)',
			'--slider-track-color': trackColor ?? 'var(--core-surface-secondary)',
		} as React.CSSProperties;
	}, [
		width,
		height,
		touchHeight,
		cursor,
		headWidth,
		progressColor,
		trackColor,
		headSize,
		trackHeadColor,
		headType,
	]);

	return (
		<div className={css.wrapper} style={cssVars} ref={ref}>
			<div className={css.trackBg}>
				<div className={css.track} ref={track}>
					<div className={css.trackHead} ref={head} />
				</div>
			</div>
		</div>
	);
});
