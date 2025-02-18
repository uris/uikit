import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTheme } from 'styled-components';
import * as Styled from './Styles';
import { Constraint } from './_Types';

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
  didClose?: () => void;
  sizeContraints?: Constraint;
  dragsRight?: boolean;
  isClosed?: boolean;
  resizeHandle?: Partial<ResizeHandle>;
  borderRight?: any;
  borderLeft?: any;
  bgColor?: string;
  drags?: boolean;
  disableOnContext?: boolean;
  isTouchDevice?: boolean;
}

export function DraggablePanel(props: DraggablePanelProps) {
  const theme = useTheme();
  const {
    children,
    sizeContraints = { initial: 250, min: 250, max: 500 },
    dragsRight = true,
    isClosed = true,
    resizeHandle = {
      width: 10,
      color: 'transparent',
      offsetX: true,
    },
    borderRight = null,
    borderLeft = null,
    bgColor = 'transparent',
    drags = true,
    isTouchDevice = false,
    disableOnContext = true,
    onResize = () => null,
    onResizeStart = () => null,
    onResizeEnd = () => null,
  } = props;
  const handle = useRef<HTMLDivElement>(null);
  const div = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isOver = useRef<boolean>(false);
  const gripper = { ...resizeHandle };
  const [handleHighlight, setHandleHighlight] = useState(false);
  const [lastWidth, setLastWidth] = useState<number | null>(null);
  const [panelClosed, setPanelClosed] = useState<boolean>(isClosed);
  const [constraints, setConstraints] = useState<Constraint>(sizeContraints);
  const timer = useRef<any>(null);
  useEffect(() => setPanelClosed(isClosed), [isClosed]);
  useEffect(() => setConstraints(sizeContraints), [sizeContraints]);

  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);
  const divWidth = useRef<number>(0);
  const divHeight = useRef<number>(0);
  const deltaWidth = useRef<number>(0);

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

  const doDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (div && div.current) {
        e.stopPropagation();
        e.preventDefault();
        let clientX: number = 0;
        const el = div.current;
        if (e.type.startsWith('touch')) {
          const touchEvent = e as TouchEvent;
          clientX = touchEvent.touches[0]?.clientX || 0;
        } else {
          const mouseEvent = e as MouseEvent;
          clientX = mouseEvent.clientX;
        }
        const newWidth = dragsRight
          ? startWidth.current + clientX - startX.current
          : startWidth.current - clientX + startX.current;
        if (
          constraints &&
          constraints.min &&
          typeof constraints.min === 'number' &&
          typeof constraints.max === 'number'
        ) {
          if (newWidth <= constraints.min) return;
          if (newWidth < constraints.min) return;
        }
        if (
          constraints &&
          constraints.max &&
          typeof constraints.min === 'number' &&
          typeof constraints.max === 'number'
        ) {
          if (newWidth >= constraints.max) {
            if (clientX - startX.current > 0) return;
          }
        }
        el.style.width = newWidth + 'px';
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
    [constraints, dragsRight, onResize],
  );

  const stopDrag = useCallback(() => {
    setIsDragging(false);
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
    document.documentElement.removeEventListener('touchmove', doDrag, false);
    document.documentElement.removeEventListener('touchend', stopDrag, false);
    if (div && div.current) {
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

  const initDrag = useCallback(
    (e: any) => {
      if (div && div.current && document.defaultView) {
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
        startWidth.current = parseInt(
          document.defaultView.getComputedStyle(el).width,
          10,
        );
        document.documentElement.addEventListener('mousemove', doDrag, false);
        document.documentElement.addEventListener('mouseup', stopDrag, false);
        document.documentElement.addEventListener('touchmove', doDrag, false);
        document.documentElement.addEventListener('touchend', stopDrag, false);
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
    let hl = handle?.current;
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
  }, [constraints, drags, initDrag]);

  const LeftRight = () => {
    if (dragsRight) {
      return { right: isTouchDevice ? -22 : -((gripper.width || 10) / 2) };
    }
    return { left: isTouchDevice ? -22 : -((gripper.width || 10) / 2) };
  };

  const setWidth = () => {
    if (!drags) return '100%';
    if (panelClosed) return 0;
    if (lastWidth) return lastWidth;
    return constraints.initial;
  };

  return (
    <Styled.Panel
      ref={div}
      $bgColor={bgColor}
      onContextMenu={(e) => {
        if (disableOnContext) e.preventDefault();
        return true;
      }}
      style={{
        overflow: 'hidden',
        width: setWidth(),
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
          ...LeftRight(),
          bottom: 0,
          width: isTouchDevice ? 44 : gripper.width,
          backgroundColor: resizeHandle.color,
          cursor: 'col-resize',
        }}
        onMouseOver={() => {
          isOver.current = true;
          setHighlight(true);
        }}
        onMouseOut={() => {
          isOver.current = false;
          if (!isDragging) setHighlight(false);
        }}
        onFocus={() => {
          isOver.current = true;
          setHighlight(true);
        }}
        onBlur={() => {
          isOver.current = false;
          if (!isDragging) setHighlight(false);
        }}
        onTouchStart={() => {
          isOver.current = true;
          setHighlight(true);
        }}
        onTouchEnd={() => {
          isOver.current = false;
          if (!isDragging) setHighlight(false);
        }}
      >
        <div
          style={{
            backgroundColor: handleHighlight
              ? theme.lyraColors['core-outline-primary']
              : 'transparent',
            flex: 1,
            maxWidth: 3,
            height: '100%',
            pointerEvents: 'none',
            transition: 'background-color 0.2s ease',
          }}
        />
      </div>
      {children}
    </Styled.Panel>
  );
}
