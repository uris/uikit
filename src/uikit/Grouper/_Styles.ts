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
    height: ${({ $frameSize, $unframed }) =>
      $unframed ? 'auto' : $frameSize}px;
    border-top: ${({ $border }) => $border}px solid
      ${({ theme }) => theme.colors.lightBorder};
  }
  div.title {
    ${flexBox.rowStart};
    ${({ theme }) => theme?.type?.desktop.textRegular};
    font-weight: 480;
    color: ${({ theme }) => theme.colors.textSecondary};
    flex: 1;
    gap: 6px;
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
