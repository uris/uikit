import styled from "styled-components";
import { flexBox } from "../../util/flexBox";

export const Badge = styled.div<{ $variant: "light" | "dark" }>`
  ${flexBox.row};
  ${({ theme }) => theme.lyraType["body-xs-medium"]};
  line-height: 1em;
  color: ${({ theme, $variant }) =>
		$variant === "light"
			? theme.lyraColors["core-text-primary"]
			: theme.lyraColors["core-text-light"]};
  background: ${({ theme, $variant }) =>
		$variant === "light"
			? theme.lyraColors["core-badge-secondary"]
			: theme.lyraColors["core-badge-primary"]};
  padding: 2px 8px;
  min-width: 24px;
  width: min-content;
  border-radius: 8px;
  white-space: nowrap;
`;
