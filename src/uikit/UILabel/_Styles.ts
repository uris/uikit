import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

export const Label = styled.div<{
  $fill: boolean;
  $round: boolean;
  $button: boolean;
}>`
  div.status-label {
    ${flexBox.row};
    ${({ $button, theme }) =>
      $button
        ? theme.lyraType['body-m-regular']
        : theme.lyraType['body-s-regular']};
    line-height: 1em;
    white-space: nowrap;
    padding: ${({ $button }) => ($button ? '6px 12px' : '4px 6px')};
    width: min-content;
    border-radius: ${({ $round }) => ($round ? '100' : '4')}px;
    border: 1px solid ${({ theme }) => theme.lyraColors['core-outline-primary']};
    cursor: ${({ $button }) => ($button ? 'pointer' : 'defatult')};
  }
  div.status-label.red {
    background: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['feedback-warning']
        : theme.lyraColors['core-surface-primary']};
    color: ${({ theme }) => theme.lyraColors['core-text-light']};
    border-color: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['core-button-disabled']
        : theme.lyraColors['core-button-disabled']};
  }
  div.status-label.green {
    background: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['feedback-warning']
        : theme.lyraColors['core-surface-primary']};
    color: ${({ theme }) => theme.lyraColors['core-text-light']};
    border-color: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['core-button-disabled']
        : theme.lyraColors['feedback-positive']};
  }
  div.status-label.yellow {
    background: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['array-yellow']
        : theme.lyraColors['core-surface-primary']};
    color: ${({ theme }) => theme.lyraColors['core-text-primary']};
    border-color: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['array-yellow']
        : theme.lyraColors['array-yellow-label']};
  }
  div.status-label.grey {
    background: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['core-surface-secondary']
        : theme.lyraColors['core-surface-primary']};
    color: ${({ theme }) => theme.lyraColors['core-text-secondary']};
    border-color: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['core-button-disabled']
        : theme.lyraColors['core-text-secondary']};
  }
  div.status-label.lightgrey {
    background: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['core-button-disabled']
        : theme.lyraColors['core-surface-primary']};
    color: ${({ theme }) => theme.lyraColors['core-text-disabled']};
    border-color: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['core-button-disabled']
        : theme.lyraColors['core-outline-primary']};
  }
  div.status-label.white {
    background: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['core-surface-secondary']
        : theme.lyraColors['core-surface-secondary']};
    color: ${({ theme }) => theme.lyraColors['core-text-primary']};
    border-color: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['core-badge-secondary']
        : theme.lyraColors['core-text-secondary']};
  }
  div.status-label.blue {
    background: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['core-button-primary']
        : theme.lyraColors['core-surface-primary']};
    color: ${({ theme }) => theme.lyraColors['core-text-light']};
    border-color: ${({ theme, $fill }) =>
      $fill
        ? theme.lyraColors['core-button-primary']
        : theme.lyraColors['core-text-secondary']};
  }
`;
