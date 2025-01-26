import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

export const Wrapper = styled.div<{
  $offset: number;
  $selected: boolean;
  $noImage: boolean;
  $wrap: boolean;
  $sizeToFit: boolean;
  $hideRadio: boolean;
  $flex: any;
  $noFrame: boolean;
}>`
  ${flexBox.rowStart};
  max-width: ${({ $wrap }) => ($wrap ? '50%' : '100%')};
  flex: ${({ $wrap }) => ($wrap ? '40%' : '100%')};
  gap: 0px;
  padding: ${({ $noFrame }) => ($noFrame ? '0' : '8px 4px')};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.lightBorder};
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.bgTintLight : theme.colors.transparent};
  cursor: pointer;
  transition: all 0.25s ease-in-out 0s;
  div.radio-icon {
    ${flexBox.column};
  }
  div.radio-title {
    ${flexBox.rowStart};
    ${({ theme }) => theme?.type?.desktop.textRegular};
    font-weight: 420;
    color: ${({ theme }) => theme.colors.textSecondary};
    flex: 1;
  }
  div.radio-summary {
    ${flexBox.rowStart};
    ${({ theme }) => theme?.type?.desktop.textMedium};
    color: ${({ theme }) => theme.colors.textTertiary};
    line-height: 1.5em;
    font-weight: 500;
    flex: 1;
  }
  div.radio-content {
    ${flexBox.columnStart};
    width: 100%;
    gap: 4px;
  }
`;
