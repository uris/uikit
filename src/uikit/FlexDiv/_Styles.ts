import { motion } from 'framer-motion';
import styled from 'styled-components';

export const BaseLayout = styled(motion.div)<{
  $scrollY: boolean;
  $scrollX: boolean;
  $flexBox: string;
  $background: string;
}>`
  ${({ $flexBox }) => $flexBox};
  overflow: hidden;
  overflow-y: ${({ $scrollY }) => ($scrollY ? 'auto' : 'hidden')};
  overflow-x: ${({ $scrollX }) => ($scrollX ? 'auto' : 'hidden')};
  background: ${({ $background }) => $background};
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 14px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.scrollBar};
    border-radius: 20px;
    border: 4px solid
      ${({ theme, $background }) =>
        $background ? $background : theme.colors.bgNormal};
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.scrollBarHover};
    border-radius: 20px;
    border: 4px solid
      ${({ theme, $background }) =>
        $background ? $background : theme.colors.bgNormal};
    cursor: default;
  }
`;
