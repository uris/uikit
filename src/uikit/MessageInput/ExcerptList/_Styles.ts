import styled from 'styled-components';
import { flexBox } from '../../../util/flexBox';

export const ExcerptList = styled.div`
  ${flexBox.rowStart};
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
`;

export const ExcerptButton = styled.div`
  ${flexBox.rowStart};
  align-items: flex-start;
  padding: 10px 16px;
  background: ${({ theme }) => theme.lyraColors['core-surface-primary']};
  border: 1px solid ${({ theme }) => theme.lyraColors['core-outline-primary']};
  border-radius: 24px;
  min-height: 48px;
  cursor: default;
  div.icon {
    ${flexBox.row};
    height: 20px;
    width: 20px;
  }
  div.label {
    padding: 0px 16px 0px 8px;
    ${({ theme }) => theme.lyraType['body-m-regular']};
    color: ${({ theme }) => theme.lyraColors['core-text-primary']};
    max-width: 300px;
    line-height: 1.5em;
    overflow: hidden;
    word-break: normal;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    user-select: none;
    -webkit-user-select: none;
  }
  div.clear {
    ${flexBox.row};
    height: 20px;
    width: 20px;
  }
`;
