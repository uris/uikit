'use client';

import React, {
	type RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTheme } from '../../hooks';
import { useObserveResize } from '../../hooks/useObserveResize/useObserveResize';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { pointerPosition } from '../../utils/functions/misc';
import css from './DraggablePanel.module.css';
import type { Constraint } from './_types';

type Info = {
	div: RefObject<HTMLDivElement | null>;
	divWidth: number;
	divHeight: number;
	deltaWidth: number;
};

type ResizeHandle = {
	width?: number;
	color?: string;
	offsetX?: boolean;
};

type DraggablePanelBaseProps = {
	children?: any;
	onResize?: (info: Info) => void;
	onResizeEnd?: (info: Info) => void;
	onResizeStart?: (info: Info) => void;
	containerRef?: React.RefObject<HTMLDivElement | null>;
	sizeConstraints?: Constraint;
	dragsRight?: boolean;
	isClosed?: boolean;
	resizeHandle?: Partial<ResizeHandle>;
	borderRight?: any;
	borderLeft?: any;
	bgColor?: string;
	drags?: boolean;
	dragHandle?: boolean;
	dragHandleStyle?: DragHandleProps;
	disableOnContext?: boolean;
	isTouchDevice?: boolean;
};

export type DraggablePanelProps = Omit<
	React.HTMLAttributes<HTMLDivElement>,
	keyof DraggablePanelBaseProps
> &
	DraggablePanelBaseProps;

const MIN_SIZE = 50;

function normalizeConstraintValue(
	value: number,
	containerWidth: number | undefined,
	fallback: number,
) {
	let normalized = value;
	if (normalized <= 1 && normalized >= 0) {
		normalized = containerWidth ? containerWidth * normalized : fallback;
	}
	if (normalized > 1 && normalized < MIN_SIZE) normalized = MIN_SIZE;
	return normalized;
}

function resolveConstraints(
	sizeConstraints: Constraint,
	containerWidth?: number,
) {
	const initial = normalizeConstraintValue(
		sizeConstraints.initial,
		containerWidth,
		MIN_SIZE,
	);
	const min = normalizeConstraintValue(
		sizeConstraints.min,
		containerWidth,
		initial,
	);
	const max = normalizeConstraintValue(
		sizeConstraints.max,
		containerWidth,
		initial,
	);
	return {
		initial: min > initial ? min : initial,
		min,
		max,
	};
}

export const DraggablePanel = React.memo((props: DraggablePanelProps) => {
	const theme = useTheme();
	const {
		children,
		sizeConstraints = { initial: 250, min: 250, max: 500 },
		dragsRight = true,
		isClosed = true,
		resizeHandle = {
			width: 10,
			color: 'transparent',
			offsetX: true,
		},
		borderRight = '1px solid var(--core-outline-primary)',
		borderLeft = null,
		bgColor = 'transparent',
		drags = true,
		isTouchDevice = false,
		disableOnContext = true,
		dragHandle = true,
		dragHandleStyle,
		containerRef,
		onResize = () => null,
		onResizeStart = () => null,
		onResizeEnd = () => null,
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';
	const handle = useRef<HTMLDivElement>(null);
	const div = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const isOver = useRef<boolean>(false);
	const gripper = { ...resizeHandle };
	const containerSize = useObserveResize(containerRef);
	const panelSize = useObserveResize(div);
	const [handleHighlight, setHandleHighlight] = useState(false);
	const [lastWidth, setLastWidth] = useState<number | null>(null);
	const [panelClosed, setPanelClosed] = useState<boolean>(isClosed);
	const [constraints, setConstraints] = useState<Constraint>(() =>
		resolveConstraints(sizeConstraints),
	);
	const [contWidth, setContWidth] = useState<number | undefined>(undefined);
	const timer = useRef<any>(null);
	const closed = panelSize.width <= 1;

	const startX = useRef<number>(0);
	const startWidth = useRef<number>(0);
	const divWidth = useRef<number>(0);
	const divHeight = useRef<number>(0);
	const deltaWidth = useRef<number>(0);

	// fall back to the window width when no container ref is provided
	const handleWindowResize = useCallback(() => {
		if (!containerRef?.current) setContWidth(window.innerWidth);
	}, [containerRef]);

	// track hover state over the resize handle
	const handleMouseOver = useCallback(() => {
		isOver.current = true;
		setHighlight(true);
	}, []);

	// clear hover state when leaving the resize handle
	const handleMouseOut = useCallback(() => {
		isOver.current = false;
		if (!isDragging) setHighlight(false);
	}, [isDragging]);

	// show handle feedback when the resize handle receives focus
	const handleFocus = useCallback(() => {
		isOver.current = true;
		setHighlight(true);
	}, []);

	// clear focused handle feedback when focus leaves the resize handle
	const handleBlur = useCallback(() => {
		isOver.current = false;
		if (!isDragging) setHighlight(false);
	}, [isDragging]);

	// show handle feedback on touch start
	const handleTouchStart = useCallback(() => {
		isOver.current = true;
		setHighlight(true);
	}, []);

	// clear handle feedback on touch end
	const handleTouchEnd = useCallback(() => {
		isOver.current = false;
		if (!isDragging) setHighlight(false);
	}, [isDragging]);

	// update the available container width from the observed container size
	useEffect(() => {
		if (!containerRef) return;
		if (containerSize.width > 0) setContWidth(containerSize.width);
	}, [containerSize, containerRef]);

	// initialize and maintain the fallback container width from the window
	// biome-ignore lint/correctness/useExhaustiveDependencies: on mount only
	useEffect(() => {
		if (!contWidth) setContWidth(window.innerWidth);
		globalThis.addEventListener('resize', handleWindowResize);
		return () => globalThis.removeEventListener('resize', handleWindowResize);
	}, []);

	// sync the closed state from the controlled prop
	useEffect(() => setPanelClosed(isClosed), [isClosed]);

	// clamp the current panel width when new constraints tighten the max width
	const adjustCurrentWidth = useCallback((relConst: Constraint) => {
		if (div?.current && relConst.max) {
			const currentWidth = div.current.offsetWidth;
			if (currentWidth > relConst.max) {
				div.current.style.width = `${relConst.max}px`;
				divWidth.current = relConst.max;
				setLastWidth(relConst.max);
			}
		}
	}, []);

	// normalize relative constraints and reapply them when inputs change
	useEffect(() => {
		if (!contWidth) return;
		const relativeConstraints = resolveConstraints(sizeConstraints, contWidth);
		setConstraints(relativeConstraints);
		adjustCurrentWidth(relativeConstraints);
	}, [sizeConstraints, contWidth, adjustCurrentWidth]);

	// debounce resize-handle highlighting for pointer and touch interactions
	const setHighlight = useCallback(
		(state: boolean | null) => {
			if (timer.current) clearTimeout(timer.current);
			if (state) {
				timer.current = setTimeout(
					() => {
						setHandleHighlight(state);
					},
					isTouchDevice ? 0 : 350,
				);
			} else setHandleHighlight(false);
		},
		[isTouchDevice],
	);

	// read the current pointer x-position from mouse or touch input
	const getClientX = useCallback((e: MouseEvent | TouchEvent) => {
		return pointerPosition(e);
	}, []);

	// convert the current pointer x-position into a new panel width
	const getNewWidth = useCallback(
		(clientX: number) => {
			return dragsRight
				? startWidth.current + clientX - startX.current
				: startWidth.current - clientX + startX.current;
		},
		[dragsRight],
	);

	// enforce min and max width constraints during drag
	const canDrag = useCallback(
		(newWidth: number, clientX: number) => {
			if (constraints?.min) {
				if (newWidth <= constraints.min) return false;
				if (newWidth < constraints.min) return false;
			}
			if (constraints?.max) {
				if (newWidth >= constraints.max) {
					if (clientX - startX.current > 0) return false;
				}
			}
			return true;
		},
		[constraints],
	);

	// resize the panel while dragging and notify resize listeners
	const doDrag = useCallback(
		(e: MouseEvent | TouchEvent) => {
			if (div?.current) {
				e.stopPropagation();
				e.preventDefault();
				const el = div.current;
				const clientX = getClientX(e);
				const newWidth = getNewWidth(clientX);
				if (!canDrag(newWidth, clientX)) return;
				el.style.width = `${newWidth}px`;
				divWidth.current = newWidth;
				deltaWidth.current = clientX - startX.current;
				onResize({
					div,
					divWidth: divWidth.current,
					divHeight: divHeight.current,
					deltaWidth: deltaWidth.current,
				});
			}
			return false;
		},
		[onResize, canDrag, getNewWidth, getClientX],
	);

	// stop dragging, restore document selection, and emit final resize events
	const stopDrag = useCallback(() => {
		setIsDragging(false);
		document.documentElement.removeEventListener('mousemove', doDrag, false);
		document.documentElement.removeEventListener('mouseup', stopDrag, false);
		document.documentElement.removeEventListener('touchmove', doDrag, false);
		document.documentElement.removeEventListener('touchend', stopDrag, false);
		document.documentElement.style.userSelect = 'auto';
		// noinspection JSDeprecatedSymbols
		document.documentElement.style.webkitUserSelect = 'auto'; // reuqired for safari / iOS
		if (div?.current) {
			divWidth.current = div.current.offsetWidth;
			divHeight.current = div.current.offsetHeight;
			deltaWidth.current = 0;
			const update = {
				div,
				divWidth: divWidth.current,
				divHeight: divHeight.current,
				deltaWidth: deltaWidth.current,
			};
			onResize(update);
			onResizeEnd(update);
		}
		setLastWidth(divWidth.current);
		if (!isOver.current) setHighlight(false);
	}, [doDrag, onResizeEnd, onResize, setHighlight]);

	// resolve the width transition from the most recent panel size
	const transition = useMemo(() => {
		if (lastWidth && lastWidth > 500)
			return 'width var(--motion-magnet-duration) var(--motion-magnet)';
		return 'width var(--motion-water-duration) var(--motion-water)';
	}, [lastWidth]);

	// capture the starting drag measurements and attach drag listeners
	const initDrag = useCallback(
		(e: any) => {
			if (div?.current && document.defaultView) {
				setIsDragging(true);
				const el = div.current;
				divWidth.current = div.current.offsetWidth;
				divHeight.current = div.current.offsetHeight;
				deltaWidth.current = 0;
				startX.current = pointerPosition(e);
				startWidth.current = Number.parseInt(
					document.defaultView.getComputedStyle(el).width,
					10,
				);
				document.documentElement.addEventListener('mousemove', doDrag, false);
				document.documentElement.addEventListener('mouseup', stopDrag, false);
				document.documentElement.addEventListener('touchmove', doDrag, false);
				document.documentElement.addEventListener('touchend', stopDrag, false);
				document.documentElement.style.userSelect = 'none';
				// noinspection JSDeprecatedSymbols
				document.documentElement.style.webkitUserSelect = 'none'; // reuqired for safari / iOS
				const update = {
					div,
					divWidth: divWidth.current,
					divHeight: divHeight.current,
					deltaWidth: deltaWidth.current,
				};
				onResize(update);
				onResizeStart(update);
			}
		},
		[doDrag, stopDrag, onResize, onResizeStart],
	);

	// attach or detach the low-level drag listeners on the resize handle
	useEffect(() => {
		const hl = handle?.current;
		if (hl && drags) {
			hl.addEventListener('mousedown', initDrag, false);
			hl.addEventListener('touchstart', initDrag, { passive: true });
		}
		return () => {
			if (hl) {
				hl.removeEventListener('mousedown', initDrag, false);
				hl.removeEventListener('touchstart', initDrag);
			}
		};
	}, [drags, initDrag]);

	// resolve the handle offset based on drag direction and touch mode
	const leftRightStyle = useMemo(() => {
		if (dragsRight) {
			return { right: isTouchDevice ? -22 : -((gripper.width || 10) / 2) };
		}
		return { left: isTouchDevice ? -22 : -((gripper.width || 10) / 2) };
	}, [dragsRight, isTouchDevice, gripper.width]);

	// resolve the rendered panel width from drag state and constraints
	const width = useMemo(() => {
		if (!drags) return '100%';
		if (panelClosed) return 0;
		if (lastWidth) return lastWidth;
		return constraints.initial;
	}, [drags, panelClosed, lastWidth, constraints.initial]);

	// compose CSS custom properties for the panel background
	const cssVars = useMemo(() => {
		return {
			'--panel-bg': bgColor ?? 'transparent',
		} as React.CSSProperties;
	}, [bgColor]);

	/* START.DEBUG */
	useTrackRenders(props, 'DraggableDiv');
	/* END.DEBUG */

	return (
		<div
			id={divId}
			className={`${css.panel}${divClass}`}
			ref={div}
			onContextMenu={(e) => {
				if (disableOnContext) e.preventDefault();
				return true;
			}}
			style={{
				...divStyle,
				...cssVars,
				overflow: 'visible',
				width: width,
				height: '100%',
				maxWidth: drags ? constraints.max : 'unset',
				transition: isDragging ? '' : transition,
				borderRight: closed || !borderRight || !drags ? 'none' : borderRight,
				borderLeft: closed || !borderLeft || !drags ? 'none' : borderLeft,
			}}
			{...rest}
		>
			<div
				ref={handle}
				style={{
					position: 'absolute',
					boxSizing: 'border-box',
					display: closed || !drags ? 'none' : 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 1,
					top: 0,
					...leftRightStyle,
					bottom: 0,
					width: isTouchDevice ? 44 : gripper.width,
					backgroundColor: resizeHandle.color,
					cursor: 'col-resize',
					overflow: 'visible',
				}}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
			>
				{dragHandle && !closed && <DragHandle {...(dragHandleStyle ?? {})} />}
				<div
					style={{
						backgroundColor: handleHighlight
							? theme.current.colors['core-outline-primary']
							: 'transparent',
						flex: 1,
						maxWidth: 3,
						height: '100%',
						pointerEvents: 'none',
						transition:
							'background-color var(--motion-water-duration) var(--motion-water)',
					}}
				/>
			</div>
			<div className={css.content}>{children}</div>
		</div>
	);
});

// Customizable visual affordance for draggable resize handles.
export type DragHandleProps = {
	width?: number;
	height?: number;
	radius?: number;
	stroke?: number;
	strokeColor?: string;
	color?: string;
};
export const DragHandle = React.memo((props: Readonly<DragHandleProps>) => {
	const {
		width = 6,
		height = 6,
		radius = 100,
		stroke = 1,
		color = 'var(--core-surface-primary)',
		strokeColor = 'var(--core-outline-primary)',
	} = props;
	// compose CSS custom properties for the drag handle dimensions and colors
	const cssVars = useMemo(() => {
		return {
			'--drag-handle-width': `${width}px`,
			'--drag-handle-height': `${height}px`,
			'--drag-handle-radius': `${radius}px`,
			'--drag-handle-border': `${stroke}px`,
			'--drag-handle-border-color': `${strokeColor}`,
			'--drag-handle-bg': `${color}`,
		} as React.CSSProperties;
	}, [width, height, radius, stroke, color, strokeColor]);
	return <div className={css.handle} style={cssVars} />;
});
