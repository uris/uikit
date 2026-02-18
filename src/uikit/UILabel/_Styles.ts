import styled from "styled-components";
import { flexBox } from "../../util/flexBox";

export const Label = styled.div<{
	$fill: boolean;
	$round: boolean;
	$button: boolean;
}>`
  div.status-label {
    ${flexBox.row};
    ${({ $button, theme }) =>
			$button ? theme.type["body-m-regular"] : theme.type["body-s-regular"]};
    line-height: 1em;
    white-space: nowrap;
    padding: ${({ $button }) => ($button ? "6px 12px" : "4px 6px")};
    width: min-content;
    border-radius: ${({ $round }) => ($round ? "100" : "4")}px;
    border: 1px solid ${({ theme }) => theme.colors["core-outline-primary"]};
    cursor: ${({ $button }) => ($button ? "pointer" : "defatult")};
  }
  div.status-label.red {
    background: ${({ theme, $fill }) =>
			$fill
				? theme.colors["feedback-warning"]
				: theme.colors["core-surface-primary"]};
    color: ${({ theme }) => theme.colors["core-text-light"]};
    border-color: ${({ theme, $fill }) =>
			$fill
				? theme.colors["core-button-disabled"]
				: theme.colors["core-button-disabled"]};
  }
  div.status-label.green {
    background: ${({ theme, $fill }) =>
			$fill
				? theme.colors["feedback-warning"]
				: theme.colors["core-surface-primary"]};
    color: ${({ theme }) => theme.colors["core-text-light"]};
    border-color: ${({ theme, $fill }) =>
			$fill
				? theme.colors["core-button-disabled"]
				: theme.colors["feedback-positive"]};
  }
  div.status-label.yellow {
    background: ${({ theme, $fill }) =>
			$fill
				? theme.colors["array-yellow"]
				: theme.colors["core-surface-primary"]};
    color: ${({ theme }) => theme.colors["core-text-primary"]};
    border-color: ${({ theme, $fill }) =>
			$fill
				? theme.colors["array-yellow"]
				: theme.colors["array-yellow-label"]};
  }
  div.status-label.grey {
    background: ${({ theme, $fill }) =>
			$fill
				? theme.colors["core-surface-secondary"]
				: theme.colors["core-surface-primary"]};
    color: ${({ theme }) => theme.colors["core-text-secondary"]};
    border-color: ${({ theme, $fill }) =>
			$fill
				? theme.colors["core-button-disabled"]
				: theme.colors["core-text-secondary"]};
  }
  div.status-label.lightgrey {
    background: ${({ theme, $fill }) =>
			$fill
				? theme.colors["core-button-disabled"]
				: theme.colors["core-surface-primary"]};
    color: ${({ theme }) => theme.colors["core-text-disabled"]};
    border-color: ${({ theme, $fill }) =>
			$fill
				? theme.colors["core-button-disabled"]
				: theme.colors["core-outline-primary"]};
  }
  div.status-label.white {
    background: ${({ theme, $fill }) =>
			$fill
				? theme.colors["core-surface-secondary"]
				: theme.colors["core-surface-secondary"]};
    color: ${({ theme }) => theme.colors["core-text-primary"]};
    border-color: ${({ theme, $fill }) =>
			$fill
				? theme.colors["core-badge-secondary"]
				: theme.colors["core-text-secondary"]};
  }
  div.status-label.blue {
    background: ${({ theme, $fill }) =>
			$fill
				? theme.colors["core-button-primary"]
				: theme.colors["core-surface-primary"]};
    color: ${({ theme }) => theme.colors["core-text-light"]};
    border-color: ${({ theme, $fill }) =>
			$fill
				? theme.colors["core-button-primary"]
				: theme.colors["core-text-secondary"]};
  }
`;
