import styled from "styled-components";
import { flexBox } from "../../util/flexBox";

export const Panel = styled.div<{ $bgColor: string }>`
  ${flexBox.columnStart};
  position: relative;
  background-color: ${({ $bgColor, theme }) =>
		$bgColor ? $bgColor : theme.colors["core-surface-primary"]};
`;
