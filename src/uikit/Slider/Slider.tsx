import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useObserveResize } from '../../hooks/useObserveResize';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import { debounce } from '../../util/debounce';
import css from './Slider.module.css';
import type { SliderProps } from './_types';

export const Slider = React.memo((props: SliderProps) => {
	const {
		value = 25,
		scaleMin = 0,
		scaleMax = 100,
		width,
		height = 2,
		touchHeight = 24,
		trackHeadSize = 7,
		headType = 'round',
		trackHeadWidth = 4,
		cursor = 'default',
		headColor = 'var(--core-text-primary)',
		trackColor = 'var(--core-surface-secondary)',
		progressColor = 'var(--core-text-primary)',
		onChange = () => null,
		onDragChange = () => null,
	} = props;

	// hook into the relevant on screen elements
	const ref = useRef<HTMLDivElement>(null);
	const track = useRef<HTMLDivElement>(null);
	const head = useRef<HTMLDivElement>(null);

	// tracking slider values via ref to avoid state issues from direct listeners
	const absProgressRef = useRef<number>(value);
	const relativeProgressRef = useRef<number>(value / scaleMax);
	const didMount = useRef<boolean>(false);

	// use resize observer to track changes to container size for responsive behavior
	const size = useObserveResize(ref, { ignore: 'height' });

	// use a "debounce" to limit the number of onChange calls
	const debouncedOnChange = debounce((value: number, percent: number) => {
		onChange(value, percent);
	}, 0);

	// set padding based on head size since dragging the head all the way to the edge will move it
	// such that half the head would be outside the track constraints
	const padding = useMemo(() => {
		if (headType === 'none' || !trackHeadSize) return 0;
		return trackHeadSize / 2;
	}, [headType, trackHeadSize]);

	// set the position of the track progress and track head
	// based on the pixel position / adjust for half the size of the head (= padding)
	const setTrackAndHead = useCallback(
		(pixelPos: number, max = false) => {
			const tr = track.current;
			const hd = head.current;
			let adjustment = 0;
			if (pixelPos === 0) adjustment = padding;
			if (max) adjustment = -padding;
			if (tr && hd) {
				tr.style.width = `${pixelPos}px`;
				hd.style.left = `${pixelPos - padding + adjustment}px`;
			}
		},
		[padding],
	);

	// set the initial position of the slider absolute value within scale
	const initialProgress = useCallback(
		(current: number): void => {
			if (!ref?.current) return;
			const sliderWidth = ref.current.getBoundingClientRect().width;
			let adjustedCurrent = current;
			if (adjustedCurrent > scaleMax || adjustedCurrent < scaleMin) {
				console.warn('Slider outside range. Adjusted to mid point.');
				adjustedCurrent = (scaleMax - scaleMin) / 2;
			}
			const normalized = (adjustedCurrent - scaleMin) / (scaleMax - scaleMin);
			const pixelPos = normalized * sliderWidth;
			absProgressRef.current = adjustedCurrent; // updated the progress value
			relativeProgressRef.current = normalized; // updated the relative value
			const max = relativeProgressRef.current === 1; // flag if at max value
			setTrackAndHead(pixelPos, max);
		},
		[scaleMax, scaleMin, setTrackAndHead],
	);

	// based on x pos of a mouse drag/click, update the percent and normalized value of the slider
	const progress = useCallback(
		(posX: number) => {
			const el = ref?.current;
			if (!el) return { value: 0, percent: 0 };
			const rect = el.getBoundingClientRect();
			const sliderWidth = rect.width;
			relativeProgressRef.current = posX / sliderWidth;
			absProgressRef.current =
				scaleMin + relativeProgressRef.current * (scaleMax - scaleMin);
		},
		[scaleMax, scaleMin],
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
			if (pos > sliderWidth - padding) pos = sliderWidth;
			else if (pos < padding) pos = 0;
			const max = pos === sliderWidth;
			setTrackAndHead(pos, max);
			return pos;
		},
		[setTrackAndHead, padding],
	);

	// on mouse move, push slider to the updated mouse position and trigger the update events
	// use ref values in the call back to avoid state issues
	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			e.preventDefault();
			const el = ref?.current;
			if (el) {
				const pos = updateSlider(e); // return new pixel pos and updates head/track
				progress(pos); // update the slider progress
				debouncedOnChange(absProgressRef.current, relativeProgressRef.current); // debounce updates
			}
		},
		[progress, updateSlider, debouncedOnChange],
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
				progress(pos);
				debouncedOnChange.cancel(); // cancel current debounce if any
				onDragChange(absProgressRef.current, relativeProgressRef.current); // immediate update
				onChange(absProgressRef.current, relativeProgressRef.current);
			}
		},
		[
			handleMouseMove,
			progress,
			updateSlider,
			debouncedOnChange,
			onDragChange,
			onChange,
		],
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
				progress(pos);
				debouncedOnChange.cancel(); // cancel current debounce if any
				onChange(absProgressRef.current, relativeProgressRef.current); // immediate update
				onDragChange(absProgressRef.current, relativeProgressRef.current);
			}
		},
		[
			handleMouseMove,
			handleMouseUp,
			onChange,
			onDragChange,
			progress,
			updateSlider,
			debouncedOnChange,
		],
	);

	// on mount, set the initial position of the slider
	useEffect(() => {
		if (didMount.current && value === absProgressRef.current) return;
		initialProgress(value);
	}, [value, initialProgress]);

	// set up slider
	useEffect(() => {
		const el = ref?.current;
		el?.addEventListener('mousedown', handleMouseDown, false);
		return () => {
			el?.removeEventListener('mousedown', handleMouseDown, false);
		};
	}, [handleMouseDown]);

	// respond to size changes triggered by browser resizing as opposed to props
	// note: this causes an extra render with every width prop change
	useEffect(() => {
		const sliderWidth = ref?.current?.offsetWidth;
		if (!sliderWidth || size.width === 0) return;
		const max = relativeProgressRef.current === 1;
		setTrackAndHead(relativeProgressRef.current * sliderWidth, max);
	}, [size.width, setTrackAndHead]);

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

	// memo head width
	const headWidth = useMemo(() => {
		if (headType === 'round') return trackHeadSize;
		return trackHeadWidth;
	}, [headType, trackHeadSize, trackHeadWidth]);

	// set container width
	const setWidth = useMemo(() => {
		if (width && typeof width === 'string') {
			if (width === 'auto') return '100%';
			return width;
		}
		return `${width ?? 100}px`;
	}, [width]);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--slider-padding': `${padding}px`,
			'--slider-width': setWidth,
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
		padding,
		height,
		touchHeight,
		cursor,
		headWidth,
		progressColor,
		trackColor,
		headSize,
		trackHeadColor,
		headType,
		setWidth,
	]);

	/* START.DEBUG */
	useTrackRenders({ ...props, sizeObserver: size }, 'Slider');
	/* END.DEBUG */

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
