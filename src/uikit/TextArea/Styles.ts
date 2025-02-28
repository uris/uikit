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
  $textSize?: 's' | 'm' | 'l';
}>`
  ${flexBox.columnStart};
  position: relative;
  padding: ${({ $padding }) => $padding};
  margin: 0;
  margin-bottom: ${({ $margin }) => setSize($margin)}px;
  width: ${({ $width }) => setSize($width)};
  height: ${({ $height }) => setSize($height)};
  border-radius: 12px;
  overflow: hidden;
  background-color: ${({ theme, $bgColor }) =>
    $bgColor ? $bgColor : theme.lyraColors['core-surface-secondary']};
  box-shadow: 0 0 0px
    ${({ $focused, $border }) => ($focused ? 1.5 : $border ? 1 : 0)}px
    ${({ $focused, $invalid, theme }) =>
      $focused
        ? theme.lyraColors['core-button-primary']
        : $invalid
          ? theme.lyraColors['core-outline-primary']
          : theme.lyraColors['core-outline-primary']};
  transition: all 0.25s ease-in-out 0s;
  textarea {
    border: 0;
    outline: 0;
    padding: 0 16px 0 0;
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.lyraColors['core-text-primary']};
    ${({ theme, $textSize }) =>
      $textSize === 'l'
        ? theme.lyraType['body-l-regular']
        : $textSize === 'm'
          ? theme.lyraType['body-m-regular']
          : theme.lyraType['body-s-regular']};
    background-color: transparent;
    box-sizing: border-box;
    resize: ${({ $resize }) => ($resize ? 'vertical' : 'none')};
    &::placeholder {
      color: ${({ theme }) => theme.lyraColors['core-text-disabled']};
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
      background-color: ${({ theme }) => theme.lyraColors['scroll-bar']};
      border-radius: 20px;
      border: 4px solid
        ${({ theme }) => theme.lyraColors['core-surface-primary']};
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.lyraColors['scroll-bar']};
      border-radius: 20px;
      border: 4px solid
        ${({ theme }) => theme.lyraColors['core-surface-primary']};
      cursor: default;
    }
  }
  div.actions {
    ${flexBox.rowStart};
    width: 100%;
    ${({ theme }) => theme.lyraType['body-xs-regular']};
    color: ${({ theme }) => theme.lyraColors['core-text-disabled']};
    gap: 16px;
  }
  span.tip {
    ${flexBox.rowStart};
    gap: 4px;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    cursor: default;
  }
  span.key {
    ${flexBox.row};
    display: inline-flex;
    ${({ theme }) => theme.lyraType['body-xs-medium']};
    border: 1px solid ${({ theme }) => theme.lyraColors['core-outline-primary']};
    border-radius: 4px;
    text-transform: capitalize;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    padding: 2px 6px;
    cursor: pointer;
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
