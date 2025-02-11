import styled from 'styled-components';
import { flexBox } from '../../../util/flexBox';

export const Upload = styled.div`
  ${flexBox.rowBetween};
  padding: 16px;
  margin-bottom: 8px;
  width: 100%;
  position: relative;
  ${({ theme }) => theme.lyraType['body-m-regular']};
  color: ${({ theme }) => theme.lyraColors['core-text-primary']};
  background: ${({ theme }) => theme.lyraColors['core-surface-secondary']};
  border-radius: 8px;
  gap: 8px;
`;

export const Document = styled.div`
  ${flexBox.rowStart};
  width: 100%;
  gap: 16px;
`;

export const Icon = styled.div`
  ${flexBox.row};
  min-height: 44px;
  height: 44px;
  overflow: hidden;
`;

export const DocumentInfo = styled.div`
  ${flexBox.columnStart};
  flex: 1;
  gap: 4px;
  div.filename {
    ${flexBox.rowStart};
    ${({ theme }) => theme.lyraType['body-m-regular']};
    color: ${({ theme }) => theme.lyraColors['core-text-primary']};
    font-weight: 500;
    text-overflow: ellipsis;
    overflow: hidden;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  div.filetype {
    ${({ theme }) => theme.lyraType['body-s-regular']};
    color: ${({ theme }) => theme.lyraColors['core-text-primary']};
    text-overflow: ellipsis;
    overflow: hidden;
    overflow-wrap: anywhere;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;
