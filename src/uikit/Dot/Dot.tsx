import { AnimatePresence, Transition, Variants } from "framer-motion";
import * as Styled from "./_Styles";

export interface DotProps {
  size?: number;
  topOffset?: number;
  rightOffset?: number;
  border?: number;
  position?: "inline" | "corner";
  state?: "red" | "yellow" | "green" | "blue" | "grey" | undefined;
  color?: string;
  motion?: Transition;
  motionValues?: Variants;
  show?: boolean;
}

export function Dot(props: DotProps) {
  const {
    size = 8,
    topOffset = 2,
    rightOffset = 2,
    border = 3,
    position = "corner",
    color = undefined,
    motion = undefined,
    motionValues = undefined,
    show = false,
    state = "blue",
  } = props;
  const style = {
    size,
    topOffset,
    rightOffset,
    border,
    position,
    color,
    state,
  };
  let variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  if (motionValues) {
    variants = { ...variants, ...motionValues };
  }
  const transition: Transition = motion
    ? { ease: "easeInOut", duration: 0.5, ...motion }
    : { ease: "easeInOut", duration: 0.5 };
  return (
    <AnimatePresence initial={false}>
      {show && (
        <Styled.Dot
          initial={"initial"}
          animate={"animate"}
          exit={"exit"}
          transition={transition}
          variants={variants}
          $props={style}
        >
          <div className="dot" />
        </Styled.Dot>
      )}
    </AnimatePresence>
  );
}
