import { motion } from 'framer-motion';
import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

export const GroupHeader = styled.div<{
  $frameSize: number;
  $iconSize: number;
  $border: number;
  $variant: 'group' | 'facet';
  $unframed: boolean;
}>`
  ${flexBox.row};
  width: 100%;
  cursor: pointer;
  padding: 0 24px;
  div.content {
    ${flexBox.rowBetween};
    width: 100%;
    gap: 6px;
    height: ${({ $frameSize, $unframed }) =>
      $unframed ? 'auto' : $frameSize}px;
    border-top: ${({ $border }) => $border}px solid
      ${({ theme }) => theme.lyraColors['core-outline-primary']};
  }
  div.title {
    ${flexBox.rowStart};
    ${({ theme }) => theme.lyraType['body-l-regular']};
    color: ${({ theme }) => theme.lyraColors['core-text-secondary']};
    flex: 1;
  }
  div.icon {
    ${flexBox.row}
    min-height: ${({ $iconSize }) => $iconSize}px;
    height: ${({ $iconSize }) => $iconSize}px;
    min-width: ${({ $iconSize }) => $iconSize}px;
    width: ${({ $iconSize }) => $iconSize}px;
  }
`;

export const Filter = styled(motion.div)`
  ${flexBox.row};
`;
