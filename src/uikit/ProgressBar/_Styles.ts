import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

export const Bar = styled.div`
  ${flexBox.row};
  width: 100%;
  gap: 10px;
  padding: 16px 0;
`;

export const Step = styled.div<{ $state: 'done' | 'current' | 'disabled' }>`
  ${flexBox.rowStart};
  gap: 10px;
  div.step {
    ${flexBox.rowStart};
    gap: 8px;
    div.number {
      ${flexBox.row};
      ${({ theme }) => theme?.type?.desktop.textMedium};
      font-weight: 420;
      width: 20px;
      height: 20px;
      border-radius: 100px;
      border: 1px solid
        ${({ theme, $state }) =>
          $state === 'done' || $state === 'current'
            ? theme.colors.primaryBlue
            : theme.colors.lightBorder};
      background: ${({ theme, $state }) =>
        $state === 'done'
          ? theme.colors.primaryBlue
          : $state === 'current'
            ? theme.colors.transparent
            : theme.colors.lightBorder};
      color: ${({ theme, $state }) =>
        $state === 'disabled'
          ? theme.colors.textSecondary
          : theme.colors.primaryBlue};
      transition: all 0.25s ease-in-out 0s;
    }
    div.title {
      ${({ theme }) => theme?.type?.desktop.textMedium};
      font-weight: 420;
      color: ${({ theme, $state }) =>
        $state === 'disabled'
          ? theme.colors.textDisabled
          : theme.colors.textPrimary};
    }
  }
  div.line {
    height: 1px;
    width: 32px;
    min-height: 1px;
    min-width: 32px;
    background: ${({ theme }) => theme.colors.lightBorder};
  }
`;
