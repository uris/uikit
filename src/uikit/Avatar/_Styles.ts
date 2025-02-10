import { motion } from 'framer-motion';
import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

function setFontSize(value: number) {
  let size = Math.round(value / 3);
  size = Math.min(size, 24);
  size = Math.max(size, 14);
  return size;
}

export const Avatar = styled(motion.div)<{
  $size: number;
  $frame: number;
  $image: any;
  $border: number;
  $borderColor: string;
  $bgColor?: string;
}>`
  ${flexBox.row};
  position: relative;
  min-height: ${({ $frame }) => $frame}px;
  min-width: ${({ $frame }) => $frame}px;
  height: ${({ $frame }) => $frame}px;
  width: ${({ $frame }) => $frame}px;
  div.user {
    ${flexBox.row};
    ${({ theme }) => theme.lyraType['body-m-regular']};
    font-size: ${({ $frame }) => setFontSize($frame)}px;
    text-transform: uppercase;
    border-radius: 100%;
    border: ${({ $border }) => $border}px solid
      ${({ $borderColor }) => $borderColor};
    min-height: ${({ $size }) => $size}px;
    min-width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    width: ${({ $size }) => $size}px;
    background: ${({ theme, $bgColor }) =>
      $bgColor ? $bgColor : theme.lyraColors['core-outline-primary']};
    color: ${({ theme }) => theme.lyraColors['core-text-primary']};
    background-image: url('${({ $image }) => $image}');
    background-size: cover;
  }
`;
