import { useState } from "react";
import * as Styled from "./_Styles";
import { Transition } from "framer-motion";
import { useTheme } from "styled-components";

export interface SwitchProps {
  state?: boolean;
  height?: number;
  width?: number;
  bgColorOff?: string;
  bgColorOn?: string;
  knobColor?: string;
  padding?: number;
  onChange?: (state: boolean) => void;
}

export function Switch(props: SwitchProps) {
  const theme = useTheme();
  const {
    state = false,
    height = 22,
    width = 44,
    padding = 3,
    bgColorOn = theme.lyraColors["feedback-positive"],
    bgColorOff = theme.lyraColors["core-badge-secondary"],
    knobColor = theme.lyraColors["core-icon-primary"],
    onChange = () => null,
  } = props;
  const [on, setOn] = useState<boolean>(state);

  const transition: Transition = { ease: "easeInOut", duration: 0.3 };

  return (
    <Styled.Wrapper
      $height={height}
      $width={width}
      $padding={padding}
      transition={transition}
      initial={state ? bgColorOn : bgColorOff}
      animate={{ backgroundColor: on ? bgColorOn : bgColorOff }}
      style={{ justifyContent: on ? "flex-end" : "flex-start" }}
      onClick={() => {
        setOn(!on);
        onChange(!on);
      }}
    >
      <Styled.Knob
        layout={true}
        transition={transition}
        $size={height - padding * 2 || 0}
        style={{ backgroundColor: knobColor }}
      />
    </Styled.Wrapper>
  );
}
