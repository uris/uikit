import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

const setHeight = (height: number | string) => {
  if (typeof height === 'string') return height;
  return height + 'px';
};

const setWidth = (width: number | string) => {
  if (typeof width === 'string') return width;
  return width + 'px';
};

const setPadding = (padding: number | string) => {
  if (typeof padding === 'string') return padding;
  return padding + 'px';
};

export const Wrapper = styled.div<{
  $height: number | string;
  $width: number | string;
  $border: boolean;
  $gap: number;
}>`
  ${flexBox.rowStart};
  gap: ${({ $gap }) => $gap}px;
  border-bottom: ${({ $border }) => ($border ? 1 : 0)}px solid
    ${({ theme }) => theme.lyraColors['core-outline-primary']};
  height: ${({ $height }) => setHeight($height)};
  width: ${({ $width }) => setWidth($width)};
  cursor: pointer;
`;

export const Option = styled.div<{
  $padding: number | string;
  $selected: boolean;
  $textStyle: string;
  $gap: number;
  $disabled: boolean;
  $size: number;
  $iconSize: number;
}>`
  ${flexBox.row};
  ${({ theme }) => theme.lyraType['body-m-regular']};
  gap: ${({ $gap }) => $gap}px;
  color: ${({ $selected, theme }) =>
    $selected
      ? theme.lyraColors['core-button-primary']
      : theme.lyraColors['core-text-primary']};
  padding: ${({ $padding }) => setPadding($padding)};
  height: 100%;
  flex: 1;
  white-space: nowrap;
  box-shadow: 0px ${({ $selected, $size }) => ($selected ? $size : 0)}px 0px 0px
    ${({ theme }) => theme.lyraColors['core-button-primary']};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  -webkit-app-region: no-drag;
  -webkit-user-select: none;
  user-select: none;
  div.icon {
    ${flexBox.row}
    height: ${({ $size }) => ($size ? $size + 'px' : 20)}px;
    max-height: ${({ $size }) => ($size ? $size : 20)}px;
    min-height: ${({ $size }) => ($size ? $size : 20)}px;
  }
`;

export const CloseButton = styled.div<{
  $padding: number | string;
  $closeWidth: number | string;
}>`
  ${flexBox.row};
  height: 100%;
  padding: ${({ $padding }) => setPadding($padding)};
  padding-bottom: 0;
  padding-top: 0;
  margin-left: ${({ $padding }) => setPadding($padding)};
  border-left: 1px solid
    ${({ theme }) => theme.lyraColors['core-outline-primary']};
  width: ${({ $closeWidth }) => setWidth($closeWidth)};
`;
