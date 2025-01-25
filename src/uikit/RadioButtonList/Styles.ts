import { flexBox } from "../../util/flexBox";
import styled from "styled-components";

export const Wrapper = styled.div<{
  $margin: number;
  $gap: number;
  $wrap: boolean;
  $noFrame: boolean;
}>`
  ${({ $noFrame }) => ($noFrame ? flexBox.columnStart : flexBox.rowStart)};
  align-items: flex-start;
  width: 100%;
  flex-wrap: ${({ $wrap }) => ($wrap ? "wrap" : "nowrap")};
  margin-bottom: ${({ $margin, $noFrame }) => ($noFrame ? 0 : $margin)}px;
  gap: ${({ $gap }) => $gap}px;
`;
