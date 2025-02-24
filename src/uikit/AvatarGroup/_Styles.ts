import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

export const Wrapper = styled.div<{
  $overlap: number;
  $gap: number;
  $margin: number;
}>`
  ${flexBox.rowStart};
  gap: ${({ $gap }) => $gap}px;
  margin: 0 ${({ $margin }) => ($margin ? $margin : 0)}px;
  div.avatar {
    display: inline-block;
    margin-left: ${({ $overlap }) => ($overlap > 0 ? -$overlap : 0)}px;
    border-radius: 100%;
    &:first-child {
      margin-left: 0;
    }
  }
`;
