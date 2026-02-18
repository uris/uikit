import { motion } from "motion/react";
import styled from "styled-components";
import type { MayaTheme } from "../../theme/useMayaTheme";
import { flexBox } from "../../util/flexBox";

const fontStyle = (size: string | undefined, theme: MayaTheme) => {
	if (size === "text") return theme.type["body-m-regular"];
	return theme.type["body-m-regular"];
};

export const Button = styled(motion.div)<{
	$underline: boolean;
	$size?: string;
}>`
  ${flexBox.row};
  position: relative;
  width: auto;
  user-select: none;
	-webkit-user-select: none;
  div.label {
    ${({ theme, $size }) => fontStyle($size, theme)};
	  user-select: none;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    &:hover {
      text-decoration: ${({ $underline }) =>
				$underline ? "underline" : "none"};
    }
  }
  div.count {
    position: absolute;
    ${flexBox.row};
    top: 0;
    right: 0;
    transform: translateX(10px) translateY(-2px);
  }
`;
