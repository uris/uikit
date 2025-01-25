import styled from 'styled-components';
import { motion } from 'framer-motion';
import { flexBox } from '../../util/flexBox';
import { setSizeStyle } from '../../util/utils';

type Styles = {
  borderColor?: { focused: string; blurred: string; error: string };
  backgroundColor?: { focused: string; blurred: string };
  color?: {
    focused: string;
    blurred: string;
    error: string;
    placeholder: string;
    disabled: string;
  };
  size?: { width?: number | string; height?: number | string };
  borderRadius?: number | string;
  padding?: string;
  textAlign?: string;
  labelSize?: number;
};

export const InputWrapper = styled(motion.div)<{
  $props: Styles;
  $focused: boolean;
  $isvalid: boolean;
  $inline: boolean;
}>`
  ${flexBox.rowStart};
  gap: 8px;
  position: relative;
  overflow: visible;
  width: ${({ $props }) => setSizeStyle($props.size?.width)};
  height: ${({ $props }) => setSizeStyle($props.size?.height)};
  border-radius: ${({ $props }) => setSizeStyle($props.borderRadius)};
  background: ${({ $props, $focused, $inline }) =>
    $inline
      ? 'unset'
      : $focused
        ? $props.backgroundColor?.focused
        : $props.backgroundColor?.blurred};
  box-shadow: 0 ${({ $inline }) => ($inline ? 1 : 0)}px
    ${({ $inline }) => ($inline ? 0 : 1)}px
    ${({ $focused, $inline }) => ($inline ? 0 : $focused ? 1.5 : 1)}px
    ${({ $focused, $isvalid, $props }) =>
      $focused
        ? $props.borderColor?.focused
        : !$isvalid
          ? $props.borderColor?.error
          : $props.borderColor?.blurred};
  transition: all 0.25s ease-in-out 0s;
`;

export const InputContainer = styled.div<{ $padding: string }>`
  ${flexBox.rowStart};
  width: 100%;
  height: 100%;
  gap: 4px;
  padding: ${(p) => p.$padding};
`;

export const Label = styled.div<{ $props: Styles }>`
  ${flexBox.rowStart};
  ${({ theme }) => theme?.type?.desktop.textRegular};
  font-family: 'Booton';
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: ${({ $props }) => $props.padding};
  height: auto;
  overflow: hidden;
  min-width: min-content;
  white-space: nowrap;
`;

export const Input = styled.input<{
  $textType: string;
  $props: Styles;
  $focused: boolean;
  $isvalid: boolean;
  $label: string;
  $labelRight: boolean;
}>`
  ${({ $textType }) => $textType};
  font-family: 'Booton';
  color: ${({ $props, $focused, $isvalid }) =>
    !$isvalid
      ? $props.color?.error
      : $focused
        ? $props.color?.focused
        : $props.color?.blurred};
  background-color: transparent;
  box-sizing: border-box;
  outline: none;
  border: 0;
  height: 100%;
  width: 100%;
  padding-left: ${({ $label }) => ($label !== '' ? 0 : 'unset')};
  text-align: ${({ $label, $labelRight, $props }) =>
    $label && $labelRight ? 'right' : $props.textAlign};
  &::placeholder {
    color: ${({ $props }) => $props.color?.placeholder};
  }
  &:focus::placeholder {
    color: ${({ $props }) => $props.color?.placeholder};
  }
  &:disabled {
    color: ${({ $props }) => $props.color?.disabled};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: 0 0 0 50px ${({ theme }) => theme.colors.bgTintNormal} inset !important;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const ButtonShow = styled.div<{
  $on: boolean;
  $disabled: boolean;
  $focused: boolean;
}>`
  ${flexBox.row};
  min-height: 18px;
  min-width: 18px;
  max-height: 18px;
  max-width: 18px;
  opacity: ${({ $on, $disabled, $focused }) =>
    $focused ? 1 : $disabled ? 0.5 : $on ? 1 : 0.5};
  &:hover {
    opacity: ${({ $disabled, $focused }) =>
      $focused ? 1 : $disabled ? 0.5 : 1};
  }
`;
