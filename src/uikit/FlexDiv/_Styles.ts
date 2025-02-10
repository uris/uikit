import { motion } from 'framer-motion';
import styled from 'styled-components';

export const BaseLayout = styled(motion.div)<{
  $scrollY: boolean;
  $scrollX: boolean;
  $flexBox: string;
  $background: string;
}>`
  ${({ $flexBox }) => $flexBox};
  font-family:
    'Booton',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Open Sans',
    'Helvetica Neue',
    sans-serif;
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
    background-color: ${({ theme }) => theme.lyraColors['scroll-bar']};
    border-radius: 20px;
    border: 4px solid
      ${({ theme, $background }) =>
        $background ? $background : theme.lyraColors['core-surface-primary']};
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.lyraColors['scroll-bar-hover']};
    border-radius: 20px;
    border: 4px solid
      ${({ theme, $background }) =>
        $background ? $background : theme.lyraColors['core-surface-primary']};
    cursor: default;
  }
`;
