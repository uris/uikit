import styled from "styled-components";
import { flexBox } from "../../util/flexBox";

export const Badge = styled.div<{ $variant: "light" | "dark" }>`
  ${flexBox.row};
  ${({ theme }) => theme.type["body-xs-medium"]};
  line-height: 1em;
  color: ${({ theme, $variant }) =>
		$variant === "light"
			? theme.colors["core-text-primary"]
			: theme.colors["core-text-light"]};
  background: ${({ theme, $variant }) =>
		$variant === "light"
			? theme.colors["core-badge-secondary"]
			: theme.colors["core-badge-primary"]};
  padding: 2px 8px;
  min-width: 24px;
  width: min-content;
  border-radius: 8px;
  white-space: nowrap;
`;
