import { motion } from 'framer-motion';
import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

export const Button = styled(motion.div)<{ $underline: boolean }>`
  ${flexBox.row};
  position: relative;
  width: auto;
  div.label {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    &:hover {
      text-decoration: ${({ $underline }) =>
        $underline ? 'underline' : 'none'};
    }
  }
  div.count {
    position: absolute;
    ${flexBox.row};
    top: 0;
    right: 0;
    transform: translateX(10px) translateY(-2px);
  }
`;
