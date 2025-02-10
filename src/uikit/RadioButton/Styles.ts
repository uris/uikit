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
  flex: ${({ $wrap }) => ($wrap ? '40%' : 1)};
  gap: 8px;
  padding: ${({ $noFrame }) => ($noFrame ? '0' : '8px 16px 8px 10px')};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.lyraColors['core-outline-primary']};
  background: ${({ $selected, theme }) =>
    $selected
      ? theme.lyraColors['core-surface-secondary']
      : theme.colors.transparent};
  cursor: pointer;
  transition: all 0.25s ease-in-out 0s;
  div.radio-icon {
    ${flexBox.column};
    width: 20px;
    height: 20px;
    max-width: 20px;
    max-height: 20px;
    min-height: 20px;
    min-width: 20px;
  }
  div.radio-title {
    ${flexBox.rowStart};
    ${({ theme }) => theme.lyraType['body-m-regular']};
    color: ${({ theme }) => theme.lyraColors['core-text-primary']};
    white-space: nowrap;
    flex: 1;
  }
  div.radio-summary {
    ${flexBox.rowStart};
    ${({ theme }) => theme.lyraType['body-s-regular']};
    color: ${({ theme }) => theme.lyraColors['core-text-tertiary']};
    flex: 1;
  }
  div.radio-content {
    ${flexBox.columnStart};
    width: 100%;
  }
`;
