import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

export const Bar = styled.div`
  ${flexBox.row};
  width: 100%;
  gap: 10px;
  padding: 16px 0;
`;

export const Step = styled.div<{
  $state: 'done' | 'current' | 'disabled';
  $clickable: boolean;
}>`
  ${flexBox.rowStart};
  gap: 10px;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  div.step {
    ${flexBox.rowStart};
    gap: 8px;
    div.number {
      ${flexBox.row};
      ${({ theme }) => theme.lyraType['body-m-regular']};
      font-weight: 420;
      width: 20px;
      height: 20px;
      border-radius: 100px;
      border: 1px solid
        ${({ theme, $state }) =>
          $state === 'done' || $state === 'current'
            ? theme.lyraColors['core-button-primary']
            : theme.lyraColors['core-outline-primary']};
      background: ${({ theme, $state }) =>
        $state === 'done'
          ? theme.lyraColors['core-button-primary']
          : $state === 'current'
            ? 'transparent'
            : theme.lyraColors['core-outline-primary']};
      color: ${({ theme, $state }) =>
        $state === 'disabled'
          ? theme.lyraColors['core-text-secondary']
          : theme.lyraColors['core-button-primary']};
      transition: all 0.25s ease-in-out 0s;
    }
    div.title {
      ${({ theme }) => theme.lyraType['body-m-regular']};
      font-weight: 420;
      color: ${({ theme, $state }) =>
        $state === 'disabled'
          ? theme.lyraColors['core-text-disabled']
          : theme.lyraColors['core-text-primary']};
    }
  }
  div.line {
    height: 1px;
    width: 32px;
    min-height: 1px;
    min-width: 32px;
    background: ${({ theme }) => theme.lyraColors['core-outline-primary']};
  }
`;
