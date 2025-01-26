import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

function setSize(value: string | number) {
  if (typeof value === 'string') return value;
  return value + 'px';
}

export const Wrapper = styled.div<{
  $width: string | number;
  $focused: boolean;
  $invalid: boolean;
  $margin: number;
  $height: number | string;
  $padding: string;
  $dark: boolean;
  $resize: boolean;
  $bgColor?: string;
  $border?: boolean;
}>`
  ${flexBox.row};
  position: relative;
  padding: ${({ $padding }) => $padding};
  margin: 0;
  margin-bottom: ${({ $margin }) => setSize($margin)}px;
  width: ${({ $width }) => setSize($width)};
  height: ${({ $height }) => setSize($height)};
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ theme, $bgColor }) =>
    $bgColor ? $bgColor : theme.colors.bgDark};
  box-shadow: 0 0 0px
    ${({ $focused, $border }) => ($focused ? 1.5 : $border ? 1 : 0)}px
    ${({ $focused, $invalid, theme }) =>
      $focused
        ? theme.colors.primaryBlue
        : $invalid
          ? theme.colors.lightBorder
          : theme.colors.lightBorder};
  transition: all 0.25s ease-in-out 0s;
  textarea {
    border: 0;
    outline: 0;
    padding: 0 16px 0 0;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: 'Booton';
    ${({ theme }) => theme?.type?.desktop.textRegular};
    font-weight: 500;
    background-color: transparent;
    box-sizing: border-box;
    resize: ${({ $resize }) => ($resize ? 'vertical' : 'none')};
    &::placeholder {
      color: ${({ theme }) => theme.colors.textDisabled};
    }
    overflow-y: auto;
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
      border: 4px solid ${({ theme }) => theme.colors.bgNormal};
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.colors.scrollBarHover};
      border-radius: 20px;
      border: 4px solid ${({ theme }) => theme.colors.bgNormal};
      cursor: default;
    }
  }
`;

export const Send = styled.div<{
  $offset: { bottom: number; right: number };
  $size: number;
}>`
  ${flexBox.row};
  position: absolute;
  min-height: ${({ $size }) => $size}px;
  min-width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  width: ${({ $size }) => $size}px;
  bottom: ${({ $offset }) => $offset.bottom}px;
  right: ${({ $offset }) => $offset.right}px;
`;
