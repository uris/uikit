import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

export const SummaryBar = styled.div`
  ${flexBox.rowStart};
  min-height: 30px;
  gap: 8px;
  ${({ theme }) => theme.lyraType['body-s-regular']};
  background: ${({ theme }) => theme.lyraColors['core-surface-primary']};
  line-height: 1em;
  color: ${({ theme }) => theme.lyraColors['core-text-primary']};
  border: 1px solid ${({ theme }) => theme.lyraColors['core-outline-primary']};
  box-shadow: ${({ theme }) => theme.lyraColors['surface-shadow-soft']};
  border-radius: 100px;
  transition: all 0.25s ease-in-out 0s;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  padding: 12px 16px 12px 12px;
  white-space: nowrap;
  div.pagging {
    ${flexBox.rowStart};
    gap: 4px;
    div.current span {
      color: ${({ theme }) => theme.lyraColors['core-text-primary']};
    }
    div.current span.resolved {
      color: ${({ theme }) => theme.lyraColors['core-text-disabled']};
    }
  }
  div.actions {
    ${flexBox.rowStart};
    gap: 8px;
  }
  div.divider {
    width: 1px;
    height: 16px;
    background: ${({ theme }) => theme.lyraColors['core-outline-primary']};
  }
`;
