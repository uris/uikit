import { motion } from "motion/react";
import styled from "styled-components";
import { flexBox } from "../../../util/flexBox";

export const Container = styled(motion.div)<{ $inline: boolean }>`
  ${flexBox.column};
  position: ${({ $inline }) => ($inline ? "relative" : "absolute")};
  top: ${({ $inline }) => ($inline ? "unset" : 0)};
  bottom: ${({ $inline }) => ($inline ? "unset" : 0)};
  left: ${({ $inline }) => ($inline ? "unset" : 0)};
  right: ${({ $inline }) => ($inline ? "unset" : 0)};
  color: ${({ theme }) => theme.lyraColors["core-text-disabled"]};
`;

export const IconWrapper = styled(motion.div)<{ $size: number }>`
  min-height: ${(p) => p.$size}px;
  min-width: ${(p) => p.$size}px;
  max-width: ${(p) => p.$size}px;
  max-height: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  width: ${(p) => p.$size}px;
  padding: 0;
  background: none;
  border-radius: 100%;
`;
