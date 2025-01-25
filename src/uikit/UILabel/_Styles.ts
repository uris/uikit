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
        ? theme?.type?.desktop.textMedium
        : theme?.type?.desktop.textSmall};
    white-space: nowrap;
    font-weight: ${({ $button }) => ($button ? 500 : 520)};
    padding: ${({ $button }) => ($button ? '6px 12px' : '3px 6px')};
    width: min-content;
    border-radius: ${({ $round }) => ($round ? '100' : '4')}px;
    border: 1px solid ${({ theme }) => theme.colors.lightBorder};
    cursor: ${({ $button }) => ($button ? 'pointer' : 'defatult')};
  }
  div.status-label.red {
    background: ${({ theme, $fill }) =>
      $fill ? theme.colors.labelRedBG : theme.colors.bgNormal};
    color: ${({ theme }) => theme.colors.labelRedText};
    border-color: ${({ theme, $fill }) =>
      $fill ? theme.colors.bgTintLight : theme.colors.labelRedText};
  }
  div.status-label.green {
    background: ${({ theme, $fill }) =>
      $fill ? theme.colors.labelGreenBG : theme.colors.bgNormal};
    color: ${({ theme }) => theme.colors.labelGreenText};
    border-color: ${({ theme, $fill }) =>
      $fill ? theme.colors.bgTintLight : theme.colors.labelGreenText};
  }
  div.status-label.yellow {
    background: ${({ theme, $fill }) =>
      $fill ? theme.colors.labelYellowBG : theme.colors.bgNormal};
    color: ${({ theme }) => theme.colors.labelYellowText};
    border-color: ${({ theme, $fill }) =>
      $fill ? theme.colors.bgTintLight : theme.colors.labelYellowText};
  }
  div.status-label.grey {
    background: ${({ theme, $fill }) =>
      $fill ? theme.colors.bgDark : theme.colors.bgNormal};
    color: ${({ theme }) => theme.colors.textSecondary};
    border-color: ${({ theme, $fill }) =>
      $fill ? theme.colors.bgTintLight : theme.colors.textSecondary};
  }
  div.status-label.lightgrey {
    background: ${({ theme, $fill }) =>
      $fill ? theme.colors.bgTintLight : theme.colors.bgNormal};
    color: ${({ theme }) => theme.colors.textDisabled};
    border-color: ${({ theme, $fill }) =>
      $fill ? theme.colors.bgTintLight : theme.colors.lightBorder};
  }
  div.status-label.white {
    background: ${({ theme, $fill }) =>
      $fill ? theme.colors.bgMedium : theme.colors.bgNormal};
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme, $fill }) =>
      $fill ? theme.colors.bgTintSelected : theme.colors.textSecondary};
  }
`;
