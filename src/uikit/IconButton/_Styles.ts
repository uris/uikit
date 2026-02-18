import { motion } from "motion/react";
import styled from "styled-components";
import { flexBox } from "../../util/flexBox";

type Props = {
	frameSize: number;
	bgColor?: string;
	bgColorOn?: string;
	bgColorHover?: string;
	isToggled?: boolean;
	toggle?: boolean;
	fill?: boolean;
	borderRadius?: number;
};

export const IconButton = styled(motion.div)<{ $props: Props }>`
  ${flexBox.row};
  position: relative;
  background: ${({ $props }) =>
		$props.isToggled && $props.toggle ? $props.bgColorOn : $props.bgColor};
  border-radius: ${({ $props }) =>
		$props.borderRadius ? $props.borderRadius : 8}px;
  border: ${({ $props }) => ($props.fill ? 1 : 0)}px solid
    ${({ theme }) => theme.lyraColors["core-outline-primary"]};
  gap: 6px;
  cursor: pointer;
  &:hover {
    background: ${({ $props }) =>
			$props.bgColorHover
				? $props.bgColorHover
				: $props.isToggled && $props.toggle
					? $props.bgColorOn
					: $props.bgColor};
  }
  div.icon {
    ${flexBox.row};
    min-height: ${({ $props }) => $props.frameSize}px;
    min-width: ${({ $props }) => $props.frameSize}px;
    height: ${({ $props }) => $props.frameSize}px;
    width: ${({ $props }) => $props.frameSize}px;
  }
  div.label {
    ${flexBox.rowStart};
    ${({ theme }) => theme.lyraType["body-l-regular"]};
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  div.count {
    position: absolute;
    ${flexBox.row};
    top: 0;
    right: 0;
    transform: translateX(5px) translateY(-2px);
  }
`;
