import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

const width = (width?: number | string) => {
  if (width === 'fill') return 'unset';
  if (typeof width === 'string') return width;
  return width + 'px';
};

export const Card = styled.div<{ $width?: number | string }>`
  ${flexBox.rowStart};
  ${({ theme }) => theme.lyraType['body-m-regular']};
  color: ${({ theme }) => theme.lyraColors['core-text-primary']};
  width: ${({ $width }) => ($width ? width($width) : 'unset')};
  max-width: min-content;
  flex: ${({ $width }) => ($width === 'fill' ? 1 : 'unset')};
  gap: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.lyraColors['core-outline-primary']};
  padding: 8px;
  padding-right: 14px;
  cursor: pointer;
  transition: all 0.25s ease-in-out 0s;
  &:hover {
    color: ${({ theme }) => theme.lyraColors['core-button-primary']};
    border: 1px solid ${({ theme }) => theme.lyraColors['core-button-primary']};
  }
  div.icon {
    ${flexBox.row};
    min-width: 20px;
    min-height: 20px;
    max-width: 20px;
    max-height: 20px;
  }
  div.label {
    flex: 1;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    overflow-wrap: anywhere;
    display: -webkit-box;
    white-space: nowrap;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;
