import React, {
	type RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTheme } from '../../hooks';
import { useObserveResize } from '../../hooks/useObserveResize';
import { useTrackRenders } from '../../hooks/useTrackRenders';
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

export interface DraggablePanelProps {
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
}

const MIN_SIZE = 50;

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
	} = props;
	const handle = useRef<HTMLDivElement>(null);
	const div = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const isOver = useRef<boolean>(false);
	const gripper = { ...resizeHandle };
	const containerSize = useObserveResize(containerRef);
	const [handleHighlight, setHandleHighlight] = useState(false);
	const [lastWidth, setLastWidth] = useState<number | null>(null);
	const [panelClosed, setPanelClosed] = useState<boolean>(isClosed);
	const [constraints, setConstraints] = useState<Constraint>(sizeConstraints);
	const [contWidth, setContWidth] = useState<number | undefined>(undefined);
	const timer = useRef<any>(null);

	const startX = useRef<number>(0);
	const startWidth = useRef<number>(0);
	const divWidth = useRef<number>(0);
	const divHeight = useRef<number>(0);
	const deltaWidth = useRef<number>(0);

	// handle window resize call back - use the window object only if containerRef is undefined
	const handleWindowResize = useCallback(() => {
		if (!containerRef?.current) setContWidth(window.innerWidth);
	}, [containerRef]);

	const handleMouseOver = useCallback(() => {
		isOver.current = true;
		setHighlight(true);
	}, []);

	const handleMouseOut = useCallback(() => {
		isOver.current = false;
		if (!isDragging) setHighlight(false);
	}, [isDragging]);

	const handleFocus = useCallback(() => {
		isOver.current = true;
		setHighlight(true);
	}, []);

	const handleBlur = useCallback(() => {
		isOver.current = false;
		if (!isDragging) setHighlight(false);
	}, [isDragging]);

	const handleTouchStart = useCallback(() => {
		isOver.current = true;
		setHighlight(true);
	}, []);

	const handleTouchEnd = useCallback(() => {
		isOver.current = false;
		if (!isDragging) setHighlight(false);
	}, [isDragging]);

	// handle container resize - if continerRef and width more than 0 use this to set container size
	useEffect(() => {
		if (!containerRef) return;
		if (containerSize.width > 0) setContWidth(containerSize.width);
	}, [containerSize, containerRef]);

	// listen to then window resize event
	// biome-ignore lint/correctness/useExhaustiveDependencies: on mount only
	useEffect(() => {
		if (!contWidth) setContWidth(window.innerWidth);
		globalThis.addEventListener('resize', handleWindowResize);
		return () => globalThis.removeEventListener('resize', handleWindowResize);
	}, []);

	// close/open on prop change
	useEffect(() => setPanelClosed(isClosed), [isClosed]);

	// on constraints update, check and adjust div width to not exceed max
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

	// reset constraints on prop changes
	useEffect(() => {
		if (!contWidth) return;
		const { min, max, initial } = sizeConstraints;
		const relativeConstraints: Constraint = { min, max, initial };
		for (const [key, value] of Object.entries(sizeConstraints)) {
			let calc = value;
			if (calc <= 1 && calc >= 0) calc = contWidth * value; // handle "percent" values
			if (calc > 1 && calc < MIN_SIZE) calc = MIN_SIZE; // ensure values no smaller than MIN_SIZE
			relativeConstraints[key as keyof Constraint] = calc;
		}
		if (relativeConstraints.min < relativeConstraints.initial) {
			relativeConstraints.initial = relativeConstraints.min; // ensure "initial" is not smaller than "min"
		}
		setConstraints(relativeConstraints);
		adjustCurrentWidth(relativeConstraints);
	}, [sizeConstraints, contWidth, adjustCurrentWidth]);

	// callback for hilight when hovering over the resize handle
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

	// get the current mouse X position using touch or mouse event
	const getClientX = useCallback((e: MouseEvent | TouchEvent) => {
		if (e.type.startsWith('touch')) {
			const touchEvent = e as TouchEvent;
			return touchEvent.touches[0]?.clientX || 0;
		}
		const mouseEvent = e as MouseEvent;
		return mouseEvent.clientX;
	}, []);

	// calculate the drag amount based on starting point and new client x point
	const getNewWidth = useCallback(
		(clientX: number) => {
			return dragsRight
				? startWidth.current + clientX - startX.current
				: startWidth.current - clientX + startX.current;
		},
		[dragsRight],
	);

	// check constraints to prevent over dragging
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

	// process drag
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

	// handle stopping drag
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

	// handle starting drag
	const initDrag = useCallback(
		(e: any) => {
			if (div?.current && document.defaultView) {
				setIsDragging(true);
				const el = div.current;
				divWidth.current = div.current.offsetWidth;
				divHeight.current = div.current.offsetHeight;
				deltaWidth.current = 0;
				if (e.type.startsWith('touch')) {
					const touchEvent = e as TouchEvent;
					startX.current = touchEvent.touches[0]?.clientX || 0;
				} else {
					const mouseEvent = e as MouseEvent;
					startX.current = mouseEvent.clientX;
				}
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

	const leftRightStyle = useMemo(() => {
		if (dragsRight) {
			return { right: isTouchDevice ? -22 : -((gripper.width || 10) / 2) };
		}
		return { left: isTouchDevice ? -22 : -((gripper.width || 10) / 2) };
	}, [dragsRight, isTouchDevice, gripper.width]);

	const width = useMemo(() => {
		if (!drags) return '100%';
		if (panelClosed) return 0;
		if (lastWidth) return lastWidth;
		return constraints.initial;
	}, [drags, panelClosed, lastWidth, constraints.initial]);

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
			className={css.panel}
			ref={div}
			onContextMenu={(e) => {
				if (disableOnContext) e.preventDefault();
				return true;
			}}
			style={{
				...cssVars,
				overflow: 'visible',
				width: width,
				height: '100%',
				maxWidth: drags ? constraints.max : 'unset',
				transition: isDragging ? '' : 'width 0.2s ease',
				borderRight:
					panelClosed || !borderRight || !drags ? 'none' : borderRight,
				borderLeft: panelClosed || !borderLeft || !drags ? 'none' : borderLeft,
			}}
		>
			<div
				ref={handle}
				style={{
					position: 'absolute',
					boxSizing: 'border-box',
					display: panelClosed || !drags ? 'none' : 'flex',
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
				{dragHandle && !panelClosed && (
					<DragHandle {...(dragHandleStyle ?? {})} />
				)}
				<div
					style={{
						backgroundColor: handleHighlight
							? theme.current.colors['core-outline-primary']
							: 'transparent',
						flex: 1,
						maxWidth: 3,
						height: '100%',
						pointerEvents: 'none',
						transition: 'background-color 0.2s ease',
					}}
				/>
			</div>
			<div className={css.content}>{children}</div>
		</div>
	);
});

// customizable drag handle for "can drag" affordance
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
