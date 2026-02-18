import styled from "styled-components";

export enum InputType {
	DocumentName = 0,
	SidebarFolder = 1,
	MessageInput = 2,
	ThreadSummary = 3,
}

const setWidth = (width: number | string) => {
	if (typeof width === "string") return width;
	return `${width}px`;
};

export const Input = styled.div<{
	$type: InputType;
	$isEditable: boolean;
	$width: number | string;
	$textAlign: string;
	$isFocused: boolean;
	$clamp: number;
	$fontStyle?: string;
	$padding: string;
	$isPlaceholder: boolean;
}>`
  pointer-events:all;
  ${({ theme, $fontStyle }) =>
		$fontStyle ? $fontStyle : theme.type["body-m-regular"]};
  color: ${({ theme, $isPlaceholder }) =>
		$isPlaceholder
			? theme.colors["core-text-disabled"]
			: theme.colors["core-text-primary"]};
  background: transparent;
  border-radius: 4px;
  border: 0;
  padding: ${(p) => p.$padding};
  outline: none;
  width: ${({ $width }) => setWidth($width)};
  -webkit-app-region: no-drag;
  user-select: ${({ $isEditable }) => ($isEditable ? "auto" : "none")};
  -webkit-user-select: ${({ $isEditable }) => ($isEditable ? "auto" : "none")};
  text-align: ${({ $textAlign }) => $textAlign};
  overflow: ${(p) =>
		p.$type === InputType.ThreadSummary && !p.$isEditable
			? "hidden"
			: "visible"};
  white-space: ${(p) =>
		p.$type === InputType.ThreadSummary && !p.$isEditable ? "wrap" : "normal"};
  text-overflow: ${(p) =>
		p.$type === InputType.ThreadSummary && !p.$isEditable ? "ellipsis" : ""};
  &:hover {
    cursor: ${({ $isEditable }) => ($isEditable ? "text" : "pointer")};
    background: ${({ theme, $isEditable }) =>
			$isEditable ? theme.colors["core-badge-secondary"] : "transparent"};
  }
  &:focus {
    background: ${({ theme }) => theme.colors["core-badge-secondary"]};
  }
  text-overflow: ellipsis;
  overflow: hidden;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: ${(p) => p.$clamp};
  -webkit-box-orient: vertical;
`;
