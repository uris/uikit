import styled from "styled-components";
import { flexBox } from "src/util/flexBox";

export const Flag = styled.div<{ $size: number }>`
  ${flexBox.row};
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  max-width: ${({ $size }) => $size}px;
  max-height: ${({ $size }) => $size}px;
  min-height: ${({ $size }) => $size}px;
  min-width: ${({ $size }) => $size}px;
`;
