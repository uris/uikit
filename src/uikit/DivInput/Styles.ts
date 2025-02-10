import styled from 'styled-components';
import { InputType } from './DivInput';

const setWidth = (width: number | string) => {
  if (typeof width === 'string') return width;
  return width + 'px';
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
}>`
  ${({ theme, $fontStyle }) =>
    $fontStyle ? $fontStyle : theme.lyraType['body-m-regular']};
  background: transparent;
  border-radius: 4px;
  border: 0;
  padding: ${(p) => p.$padding};
  outline: none;
  width: ${({ $width }) => setWidth($width)};
  -webkit-app-region: no-drag;
  user-select: ${({ $isEditable }) => ($isEditable ? 'auto' : 'none')};
  -webkit-user-select: ${({ $isEditable }) => ($isEditable ? 'auto' : 'none')};
  text-align: ${({ $textAlign }) => $textAlign};
  overflow: ${(p) =>
    p.$type === InputType.ThreadSummary && !p.$isEditable
      ? 'hidden'
      : 'visible'};
  white-space: ${(p) =>
    p.$type === InputType.ThreadSummary && !p.$isEditable ? 'wrap' : 'normal'};
  text-overflow: ${(p) =>
    p.$type === InputType.ThreadSummary && !p.$isEditable ? 'ellipsis' : ''};
  &:hover {
    cursor: ${({ $isEditable }) => ($isEditable ? 'text' : 'pointer')};
    background: ${({ theme, $isEditable }) =>
      $isEditable ? theme.lyraColors['core-badge-secondary'] : 'transparent'};
  }
  &:focus {
    background: ${({ theme }) => theme.lyraColors['core-badge-secondary']};
  }
  text-overflow: ellipsis;
  overflow: hidden;
  overflow-wrap: anywhere;
  display: -webkit-box;
  -webkit-line-clamp: ${(p) => p.$clamp};
  -webkit-box-orient: vertical;
`;
