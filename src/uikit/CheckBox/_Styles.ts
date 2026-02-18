import styled from "styled-components";
import { flexBox } from "../../util/flexBox";

type Props = {
	size: number;
	disabled: boolean;
	checked: boolean | "partial";
};

export const CheckBox = styled.div<{ $props: Props }>`
  ${flexBox.row};
  min-height: ${({ $props }) => $props.size}px;
  height: ${({ $props }) => $props.size}px;
  width: auto;
  gap: 6px;
  cursor: pointer;
  overflow: hidden;
	user-select: none;
	-webkit-user-select: none;
  div.icon {
    ${flexBox.row};
    min-width: 20px;
    width: 20px;
    min-height: 20px;
    height: 20px;
  }
  span.label {
    ${({ theme }) => theme.type["body-m-regular"]};
    color: ${({ theme, $props }) =>
			$props.disabled
				? theme.colors["core-text-secondary"]
				: $props.checked
					? theme.colors["core-text-secondary"]
					: theme.colors["core-text-primary"]};
  }
`;
