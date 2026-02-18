import styled from "styled-components";
import { flexBox } from "../../util/flexBox";

export const Chip = styled.div<{
	$disabled: boolean;
	$focused: boolean;
	$background?: string;
	$variant: "small" | "regular";
	$unframed: boolean;
	$padding: string;
}>`
  ${flexBox.row};
  width: min-content;
  min-height: 30px;
  gap: ${({ $variant }) => ($variant === "regular" ? 8 : 4)}px;
  background: ${({ $background }) =>
		$background ? $background : "transparent"};
  ${({ theme, $focused, $disabled, $variant }) =>
		$focused || $disabled
			? theme.lyraType[$variant === "regular" ? "body-s-bold" : "body-xs-bold"]
			: theme.lyraType[
					$variant === "regular" ? "body-s-medium" : "body-xs-medium"
				]};
  line-height: 1em;
  color: ${({ theme, $disabled }) =>
		$disabled
			? theme.lyraColors["core-text-disabled"]
			: theme.lyraColors["core-text-primary"]};
  border: ${({ $unframed }) => ($unframed ? 0 : 1)}px solid
    ${({ theme, $disabled }) =>
			$disabled
				? theme.lyraColors["core-button-disabled"]
				: theme.lyraColors["core-outline-primary"]};
  border-radius: ${({ $variant }) => ($variant === "regular" ? 8 : 4)}px;
  transition: all 0.25s ease-in-out 0s;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  padding: ${({ $padding }) => $padding};
  div.icon {
    ${flexBox.row};
    height: ${({ $variant }) => ($variant === "regular" ? 20 : 16)}px;
    width: ${({ $variant }) => ($variant === "regular" ? 20 : 16)}px;
  }
  &:hover {
    border: ${({ $unframed }) => ($unframed ? 0 : 1)}px solid
      ${({ theme }) => theme.lyraColors["core-outline-tertiary"]};
  }
  &:focus {
    border: ${({ $unframed }) => ($unframed ? 0 : 1)}px solid
      ${({ theme }) => theme.lyraColors["core-button-primary"]};
    color: ${({ theme, $disabled }) =>
			$disabled
				? theme.lyraColors["core-text-disabled"]
				: theme.lyraColors["core-button-primary"]};
  }
`;
