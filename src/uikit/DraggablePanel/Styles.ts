import { flexBox } from "../../util/flexBox";
import styled from "styled-components";

export const Panel = styled.div<{ $bgColor: string }>`
  ${flexBox.columnStart};
  position: relative;
  background-color: ${({ $bgColor, theme }) =>
    $bgColor ? $bgColor : theme.colors.bgNormal};
`;
