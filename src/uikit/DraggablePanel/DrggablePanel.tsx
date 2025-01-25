import * as Styled from "./Styles";
import { RefObject, useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { Constraint } from "./_Types";

type Info = {
  div: RefObject<HTMLDivElement>;
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
  isTouchDevice?: boolean;
}

export function DraggablePanel(props: DraggablePanelProps) {
  const theme = useTheme();
  const {
    children,
    onResize = () => null,
    onResizeStart = () => null,
    onResizeEnd = () => null,
    sizeContraints = { initial: 250, min: 250, max: 500 },
    dragsRight = true,
    isClosed = true,
    resizeHandle = {
      width: 10,
      color: theme.colors.bgTransparent,
      offsetX: true,
    },
    borderRight = null,
    borderLeft = null,
    bgColor = "transparent",
    drags = true,
    isTouchDevice = false,
  } = props;
  const handle: RefObject<HTMLDivElement> = useRef(null);
  const div: RefObject<HTMLDivElement> = useRef(null);
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

  let startX: number,
    startWidth: number,
    divWidth: number,
    divHeight: number,
    deltaWidth: number = 0;

  function initDrag(e: any) {
    if (div && div.current && document.defaultView) {
      setIsDragging(true);
      const el = div.current;
      divWidth = div.current.offsetWidth;
      divHeight = div.current.offsetHeight;
      deltaWidth = 0;
      startX = e.clientX || e.targetTouches[0].pageX;
      startWidth = parseInt(
        document.defaultView.getComputedStyle(el).width,
        10
      );
      document.documentElement.addEventListener("mousemove", doDrag, false);
      document.documentElement.addEventListener("mouseup", stopDrag, false);
      document.documentElement.addEventListener("touchmove", doDrag, false);
      document.documentElement.addEventListener("touchend", stopDrag, false);
      onResizeStart({ div, divWidth, divHeight, deltaWidth });
    }
  }

  function doDrag(e: any) {
    if (div && div.current) {
      e.stopPropagation(); // prevent over drag from selecting other objects
      const el = div.current;
      const clientX = e.clientX || e.targetTouches[0].pageX;
      const newWidth = dragsRight
        ? startWidth + clientX - startX
        : startWidth - clientX + startX;
      if (
        constraints &&
        constraints.min &&
        typeof constraints.min === "number" &&
        typeof constraints.max === "number"
      ) {
        if (newWidth <= constraints.min) return;
        if (newWidth < constraints.min) return;
      }
      if (
        constraints &&
        constraints.max &&
        typeof constraints.min === "number" &&
        typeof constraints.max === "number"
      ) {
        if (newWidth >= constraints.max) {
          if (clientX - startX > 0) return;
        }
      }
      el.style.width = newWidth + "px";
      divWidth = newWidth;
      deltaWidth = clientX - startX;
      onResize({ div, divWidth, divHeight, deltaWidth });
    }
  }

  function stopDrag() {
    setIsDragging(false);
    document.documentElement.removeEventListener("mousemove", doDrag, false);
    document.documentElement.removeEventListener("mouseup", stopDrag, false);
    document.documentElement.removeEventListener("touchmove", doDrag, false);
    document.documentElement.removeEventListener("touchend", stopDrag, false);
    if (div && div.current) {
      divWidth = div.current.offsetWidth;
      divHeight = div.current.offsetHeight;
      deltaWidth = 0;
    }
    onResizeEnd({ div, divWidth, divHeight, deltaWidth });
    setLastWidth(divWidth);
    if (!isOver.current) setHighlight(false);
  }

  useEffect(() => {
    let hl = handle?.current;
    if (hl && drags) {
      hl.addEventListener("mousedown", initDrag, false);
      hl.addEventListener("touchstart", initDrag, { passive: true });
    }
    return () => {
      if (hl) {
        hl.removeEventListener("mousedown", initDrag, false);
        hl.removeEventListener("touchstart", initDrag);
      }
    };
    // eslint-disable-next-line
  }, [constraints, drags]);

  const setHighlight = (state: boolean | null) => {
    if (timer.current) clearTimeout(timer.current);
    if (state) {
      timer.current = setTimeout(
        () => {
          setHandleHighlight(state);
        },
        isTouchDevice ? 0 : 350
      );
    } else setHandleHighlight(false);
  };

  const LeftRight = () => {
    if (dragsRight) {
      return { right: isTouchDevice ? -22 : -((gripper.width || 10) / 2) };
    }
    return { left: isTouchDevice ? -22 : -((gripper.width || 10) / 2) };
  };

  const setWidth = () => {
    if (!drags) return "100%";
    if (panelClosed) return 0;
    if (lastWidth) return lastWidth;
    return constraints.initial;
  };

  return (
    <Styled.Panel
      ref={div}
      $bgColor={bgColor}
      onContextMenu={(e) => {
        e.preventDefault();
        return true;
      }}
      style={{
        overflow: "hidden",
        width: setWidth(),
        height: "100%",
        maxWidth: drags ? constraints.max : "unset",
        transition: isDragging ? "" : "width 0.2s ease",
        borderRight:
          panelClosed || !borderRight || !drags ? "none" : borderRight,
        borderLeft: panelClosed || !borderLeft || !drags ? "none" : borderLeft,
      }}
    >
      <div
        ref={handle}
        style={{
          position: "absolute",
          boxSizing: "border-box",
          display: panelClosed || !drags ? "none" : "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          top: 0,
          ...LeftRight(),
          bottom: 0,
          width: isTouchDevice ? 44 : gripper.width,
          backgroundColor: resizeHandle.color,
          cursor: "col-resize",
        }}
        onMouseOver={() => {
          isOver.current = true;
          setHighlight(true);
        }}
        onMouseOut={() => {
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
              ? theme.colors.lightBorder
              : theme.colors.transparent,
            flex: 1,
            maxWidth: 3,
            height: "100%",
            pointerEvents: "none",
            transition: "background-color 0.2s ease",
          }}
        />
      </div>
      {children}
    </Styled.Panel>
  );
}
