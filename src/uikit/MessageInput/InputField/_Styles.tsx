import { motion } from "motion/react";
import styled from "styled-components";
import { flexBox } from "../../../util/flexBox";

export const Wrapper = styled.div<{ $isFocused: boolean; $isShort: boolean }>`
  ${flexBox.columnEnd};
  align-self: center;
  width: 100%;
  min-width: 300px;
  overflow: visible;
  overflow-y: hidden;
  padding: ${({ $isShort }) =>
		$isShort ? "16px 12px 8px 16px;" : "16px 12px 16px 16px;"};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.bgDark};
  box-shadow: 0 0 1px ${({ $isShort }) => ($isShort ? 0 : 1)}px
    ${({ theme }) => theme.colors.transparent};
  outline: none;
  &.focused {
    box-shadow: 0 0 1px ${({ $isShort }) => ($isShort ? 2 : 2)}px
      ${({ theme }) => theme.colors.primaryBlue};
  }
  transition: all 0.3s ease-in-out 0s;
`;

export const TextArea = styled.textarea`
  ${({ theme }) => theme.lyraType["body-m-regular"]};
  padding: 0;
  width: 100%;
  overflow-y: hidden;
  resize: none;
  border: 0;
  outline: none;
  color: ${({ theme }) => theme.lyraColors["core-text-primary"]};
  background: transparent;
  padding-bottom: 5px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.textDisabled};
  }
`;

export const ButtonRow = styled.div`
  ${flexBox.rowBetween};
  width: 100%;
  padding: 0;
`;

export const ActionButtons = styled.div<{ $isShort: boolean }>`
  ${flexBox.row};
  ${({ theme }) => theme.lyraType["body-m-regular"]};
  color: ${({ theme }) => theme.lyraColors["core-text-disabled"]};
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
  ${({ theme }) => theme.lyraType["body-s-regular"]};
  color: ${({ theme }) => theme.lyraColors["core-text-disabled"]};
  ${flexBox.row};
  cursor: pointer;
`;

export const InputWrapper = styled.div<{ $isShort: boolean }>`
  ${flexBox.columnEnd};
  align-items: flex-end;
  width: 100%;
  padding: ${({ $isShort }) =>
		$isShort ? "4px 4px 0px 4px" : "4px 4px 16px 4px"};
`;
