import { flexBox } from "../../util/flexBox";
import { setSizeStyle } from "../../util/utils";
import styled from "styled-components";

function setSize(value: string | number) {
  if (typeof value === "string") return value;
  else return value + "px";
}

export const Wrapper = styled.div<{
  $size: { width: string; height: string };
  $focused: boolean;
  $invalid: boolean;
  $dark: boolean;
  $margin: string;
  $placeholder: boolean;
  $bgColor: string;
  $borderRadius: number;
  $fontSize: number | null;
  $padding: number | string | null;
  $fontWeight: number | null;
  $unframed: boolean;
  $textType: string;
  $gap: number;
}>`
  ${flexBox.rowStart};
  position: relative;
  gap: ${({ $gap }) => $gap}px;
  min-height: ${({ $size }) => setSize($size.height)};
  padding: 0 ${({ $unframed, $padding }) => ($unframed ? 0 : $padding)}px;
  width: ${({ $size }) => setSize($size.width)};
  height: ${({ $size }) => setSize($size.height)};
  margin-bottom: ${({ $margin }) => setSize($margin)}px;
  border-radius: ${({ $borderRadius }) => $borderRadius}px;
  background-color: ${({ $bgColor }) => $bgColor};
  box-shadow: 0 ${({ $unframed }) => ($unframed ? 0 : 1)}px 0
    ${({ $unframed }) => ($unframed ? 0 : 0)}px
    ${({ $focused, $invalid, theme }) =>
      $focused
        ? theme.lyraColors["core-outline-primary"]
        : $invalid
        ? theme.lyraColors["core-outline-primary"]
        : theme.lyraColors["core-outline-primary"]};
  transition: all 0.15s ease-in-out 0s;
  div.face {
    ${flexBox.rowStart};
    ${({ theme }) => theme.lyraType["body-l-medium"]};
    padding: ${({ $padding }) =>
      $padding ? setSizeStyle($padding) : "8px 0px 8px 4px"};
    flex: 1;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    word-break: break-all;
    color: ${({ $placeholder, $focused, theme }) =>
      $placeholder
        ? theme.lyraColors["core-text-disabled"]
        : $focused
        ? theme.lyraColors["core-text-primary"]
        : theme.lyraColors["core-text-primary"]};
  }
  div.chevron {
    ${flexBox.rowStart};
    padding: 8;
  }
`;

export const Select = styled.select`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  font-size: 14px;
  background-color: #1f99cd;
  background-image: url("");
  background-position: right 10px center;
  background-repeat: no-repeat;
  background-size: auto 50%;
  border: none;
  outline: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
  // remove dotted firefox border
  @-moz-document url-prefix() {
    select {
      color: rgba(0, 0, 0, 0);
      text-shadow: 0 0 0 #ffffff;
    }
  }
`;
