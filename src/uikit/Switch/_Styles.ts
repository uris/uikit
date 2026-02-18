import { motion } from "motion/react";
import styled from "styled-components";
import { flexBox } from "../../util/flexBox";
import { setSizeStyle } from "../../util/utils";

export const Wrapper = styled(motion.div)<{
	$height: number;
	$width: number;
	$padding: number;
}>`
  ${flexBox.row};
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  padding: ${({ $padding }) => $padding}px;
  border-radius: 100px;
  cursor: pointer;
`;

export const Knob = styled(motion.div)<{ $size: number }>`
  ${flexBox.row};
  width: ${({ $size }) => setSizeStyle($size)};
  height: ${({ $size }) => setSizeStyle($size)};
  border-radius: 100%;
`;
