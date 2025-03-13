import { motion } from 'framer-motion';
import styled from 'styled-components';
import { flexBox } from '../../../util/flexBox';

export const Wrapper = styled.div<{ $isFocused: boolean; $isShort: boolean }>`
  ${flexBox.columnEnd};
  align-self: center;
  width: 100%;
  min-width: 300px;
  overflow: hidden;
  padding: 0;
  border-radius: 16px;
  background: ${({ theme }) => theme.lyraColors['core-surface-secondary']};
  box-shadow: 0 0 1px ${({ $isShort }) => ($isShort ? 1 : 1)}px
    ${({ theme }) => theme.lyraColors['core-outline-primary']};
  outline: none;
  &.focused {
    box-shadow: 0 0 1px ${({ $isShort }) => ($isShort ? 2 : 2)}px
      ${({ theme }) => theme.colors.primaryBlue};
  }
  transition: all 0.3s ease-in-out 0s;
`;

export const Content = styled.div<{ $scrolls: boolean }>`
  ${flexBox.columnStart};
  gap: 8px;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  border-bottom: ${({ $scrolls }) => ($scrolls ? 1 : 0)}px solid
    ${({ theme }) => theme.lyraColors['core-outline-primary']};
  padding: 16px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
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
      ${({ theme }) => theme.lyraColors['core-surface-secondary']};
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.lyraColors['scroll-bar-hover']};
    border-radius: 20px;
    border: 4px solid
      ${({ theme }) => theme.lyraColors['core-surface-secondary']};
  }
`;

export const TextArea = styled.textarea<{ $scrolls: boolean }>`
  ${({ theme }) => theme.lyraType['body-m-regular']};
  padding: 0;
  padding-left: 24px;
  width: 100%;
  overflow-y: ${({ $scrolls }) => ($scrolls ? 'auto' : 'hidden')};
  resize: none;
  border: 0;
  outline: none;
  color: ${({ theme }) => theme.lyraColors['core-text-primary']};
  background: transparent;
`;

export const ButtonRow = styled.div`
  ${flexBox.rowBetween};
  width: 100%;
  padding: 8px 16px;
`;

export const ActionButtons = styled.div<{ $isShort: boolean }>`
  ${flexBox.row};
  ${({ theme }) => theme.lyraType['body-m-regular']};
  color: ${({ theme }) => theme.lyraColors['core-text-disabled']};
  z-index: 1;
  gap: 12px;
`;

export const Send = styled.div`
  ${flexBox.row};
  position: relative;
`;

export const AnimatedButton = styled(motion.div)`
  ${flexBox.row};
  width: 32px;
  height: 32px;
`;

export const IconLabel = styled.div`
  ${({ theme }) => theme.lyraType['body-s-regular']};
  color: ${({ theme }) => theme.lyraColors['core-text-disabled']};
  ${flexBox.row};
  cursor: pointer;
`;

export const InputWrapper = styled.div<{ $isShort: boolean }>`
  ${flexBox.columnEnd};
  align-items: flex-end;
  width: 100%;
  padding: ${({ $isShort }) =>
    $isShort ? '4px 4px 0px 4px' : '4px 4px 16px 4px'};
`;
