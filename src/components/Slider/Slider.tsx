import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useObserveResize } from '../../hooks/useObserveResize/useObserveResize';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { debounce } from '../../utils/functions/debounce';
import { pointerPosition } from '../../utils/functions/misc';
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
		cursor = 'default',
		headColor = 'var(--core-text-primary)',
		trackColor = 'var(--core-surface-secondary)',
		progressColor = 'var(--core-text-primary)',
		onChange = () => null,
		onDragChange = () => null,
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';

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
		if (!trackHeadSize) return 0;
		return Math.ceil(trackHeadSize / 2);
	}, [trackHeadSize]);

	// set the position of the track progress and track head
	// based on the pixel position / adjust for half the size of the head (= padding)
	const setTrackAndHead = useCallback((pixelPos: number) => {
		const hd = head.current;
		const tr = track.current;
		if (hd) hd.style.left = `${pixelPos}px`;
		if (tr) tr.style.width = `${pixelPos}px`;
		didMount.current = true;
	}, []);

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
			setTrackAndHead(pixelPos);
			didMount.current = true;
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
			const newPos = pointerPosition(e);
			const el = ref?.current;
			if (!el) return 0;
			const rect = el.getBoundingClientRect();
			const sliderWidth = Math.floor(rect.width);
			let pos: number = newPos - rect.x;
			if (pos > sliderWidth) {
				pos = sliderWidth;
			} else if (pos < 0) {
				pos = 0;
			}
			setTrackAndHead(pos);
			console.log({ pos });
			return pos;
		},
		[setTrackAndHead],
	);

	// on mouse move, push slider to the updated mouse position and trigger the update events
	// use ref values in the call back to avoid state issues
	const handleMouseMove = useCallback(
		(e: MouseEvent | TouchEvent) => {
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
		(e: MouseEvent | TouchEvent) => {
			e.preventDefault();
			const el = ref?.current;
			if (el) {
				const pos = updateSlider(e); // return new pixel pos and updates head/track
				progress(pos);
				debouncedOnChange.cancel(); // cancel current debounce if any
				onDragChange(absProgressRef.current, relativeProgressRef.current); // immediate update
				onChange(absProgressRef.current, relativeProgressRef.current);
			}
			globalThis.removeEventListener('mousemove', handleMouseMove, false);
			globalThis.removeEventListener('touchmove', handleMouseMove, false);
			globalThis.removeEventListener('mouseup', handleMouseUp, false);
			globalThis.removeEventListener('touchend', handleMouseUp, false);
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
		(e: MouseEvent | TouchEvent) => {
			e.preventDefault();
			e.stopPropagation();
			console.log('handleMouseDown');
			globalThis.addEventListener('mousemove', handleMouseMove, false);
			globalThis.addEventListener('touchmove', handleMouseMove, false);
			globalThis.addEventListener('mouseup', handleMouseUp, false);
			globalThis.addEventListener('touchend', handleMouseUp, false);
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
		const hl = head?.current;
		el?.addEventListener('mousedown', handleMouseDown, false);
		el?.addEventListener('touchstart', handleMouseDown, false);
		hl?.addEventListener('mousedown', handleMouseDown, false);
		hl?.addEventListener('touchstart', handleMouseDown, false);
		return () => {
			el?.removeEventListener('mousedown', handleMouseDown, false);
			el?.removeEventListener('touchstart', handleMouseDown, false);
			hl?.removeEventListener('mousedown', handleMouseDown, false);
			hl?.removeEventListener('touchstart', handleMouseDown, false);
		};
	}, [handleMouseDown]);

	// respond to size changes triggered by browser resizing as opposed to props
	// note: this causes an extra render with every width prop change
	useEffect(() => {
		const sliderWidth = ref?.current?.offsetWidth;
		if (!sliderWidth || size.width === 0) return;
		setTrackAndHead(relativeProgressRef.current * sliderWidth);
	}, [size.width, setTrackAndHead]);

	// memo head color
	const trackHeadColor = useMemo(() => {
		if (!trackHeadSize || trackHeadSize === 0) return 'transparent';
		return headColor ?? 'var(--core-text-primary)';
	}, [headColor, trackHeadSize]);

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
			'--slider-head-radius': '100%',
			'--slider-head-size': `${trackHeadSize ?? 0}px`,
			'--slider-head-width': `${trackHeadSize ?? 0}px`,
			'--slider-head-color': trackHeadColor,
			'--slider-progress-color': progressColor ?? 'var(--core-text-primary)',
			'--slider-track-color': trackColor ?? 'var(--core-surface-secondary)',
		} as React.CSSProperties;
	}, [
		padding,
		height,
		touchHeight,
		cursor,
		progressColor,
		trackColor,
		trackHeadSize,
		trackHeadColor,
		setWidth,
	]);

	/* START.DEBUG */
	useTrackRenders({ ...props, sizeObserver: size }, 'Slider');
	/* END.DEBUG */

	return (
		<div
			id={divId}
			className={`${css.wrapper}${divClass}`}
			style={{ ...divStyle, ...cssVars }}
			{...rest}
		>
			<div ref={ref} className={css.trackWrapper}>
				<div className={css.trackBg}>
					<div className={css.track} ref={track} />
				</div>
				<div className={css.trackHead} ref={head} />
			</div>
		</div>
	);
});
