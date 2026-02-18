import styled from "styled-components";
import { flexBox } from "../../util/flexBox";

const getWidth = (value: number | string) => {
	if (typeof value === "string") return value;
	return `${value}px`;
};

export const Wrapper = styled.div<{
	$width: number | string;
	$height: number | string;
	$touchHeight: number | string;
	$cursor: string;
}>`
  ${flexBox.rowStart};
  width: ${({ $width }) => getWidth($width)};
  height: ${({ $height }) => getWidth($height)};
  min-height: ${({ $touchHeight }) => getWidth($touchHeight)};
  cursor: ${({ $cursor }) => $cursor};
`;

export const TrackBG = styled.div<{
	$width: number | string;
	$height: number | string;
	$color?: string;
}>`
  ${flexBox.rowStart};
  width: 100%;
  height: ${({ $height }) => getWidth($height)};
  background-color: ${({ theme, $color }) =>
		$color ? $color : theme.lyraColors["core-outline-primary"]};
  pointer-events: none;
  border-radius: 100px;
`;

export const Track = styled.div<{ $color?: string }>`
  ${flexBox.rowStart};
  position: relative;
  width: 0px;
  height: 100%;
  background-color: ${({ theme, $color }) =>
		$color ? $color : theme.lyraColors["core-icon-primary"]};
  overflow: visible;
  pointer-events: none;
  border-radius: 100px;
`;

export const TrackHead = styled.div<{
	$height: number | null;
	$width: number | null;
	$headType: "round" | "square";
	$color?: string;
}>`
  position: absolute;
  display: ${({ $height }) => ($height ? "block" : "none")};
  background-color: ${({ theme, $color }) =>
		$color ? $color : theme.lyraColors["core-icon-primary"]};
  pointer-events: none;
  border-radius: ${({ $headType }) => ($headType === "round" ? "100%" : 0)};
  max-width: ${({ $width }) => $width || 0}px;
  max-height: ${({ $height }) => $height || 0}px;
  min-width: ${({ $width }) => $width || 0}px;
  min-height: ${({ $height }) => $height || 0}px;
  top: 50%;
  transform: translateY(-50%) translateX(-50%);
`;
