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
    ${({ theme }) => theme.colors.lightBorder};
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
}>`
  ${flexBox.row};
  gap: ${({ $gap }) => $gap}px;
  ${({ theme }) => theme?.type?.desktop.textRegular};
  font-weight: 480;
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primaryBlue : theme.colors.textSecondary};
  padding: ${({ $padding }) => setPadding($padding)};
  height: 100%;
  flex: 1;
  white-space: nowrap;
  box-shadow: 0px ${({ $selected, $size }) => ($selected ? $size : 0)}px 0px 0px
    ${({ theme }) => theme.colors.primaryBlue};
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  -webkit-app-region: no-drag;
  -webkit-user-select: none;
  user-select: none;
`;

export const CloseButton = styled.div<{
  $padding: number | string;
  $closeWidth: number | string;
}>`
  ${flexBox.row};
  padding: ${({ $padding }) => setPadding($padding)};
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.colors.lightBorder};
  width: ${({ $closeWidth }) => setWidth($closeWidth)};
`;
