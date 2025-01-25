import { motion } from "framer-motion";
import styled from "styled-components";

export const Overlay = styled(motion.div)<{ $color: string; $opacity: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ $color }) => $color};
  opacity: ${({ $opacity }) => $opacity};
  z-index: 500;
`;
