import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, Transition } from 'framer-motion';
import { useTheme } from 'styled-components';
import { UIIcon } from '../UIIcon/UIIcon';
import { DropDownOption } from '../DropDown/DropDown';
import { Flag } from '../Flags/Flag';
import { UIButton } from '../UIButton';
import { IconButton } from '../IconButton';
import * as Styled from './Styles';

export interface TextFieldProps {
  value?: string;
  name?: string;
  label?: string;
  labelSize?: number;
  placeholder?: string;
  focused?: boolean;
  editable?: boolean;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onFocus?: (value: string) => void;
  onKeydown?: (key: string, event: React.KeyboardEvent) => void;
  onSubmit?: (value: string) => void;
  onPaste?: (value: React.ClipboardEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onAction?: () => void;
  isValid?: boolean;
  inline?: boolean;
  maxLength?: number;
  size?: { width?: number | string; height?: number | string };
  padding?: string;
  borderRadius?: number | string;
  textAlign?: 'left' | 'center';
  labelAlignsRight?: boolean;
  borderColor?: { focused: string; blurred: string; error: string };
  backgroundColor?: { focused: string; blurred: string };
  color?: {
    focused: string;
    blurred: string;
    error: string;
    placeholder: string;
    disabled: string;
  };
  iconLeft?: { name?: string; size?: number; color?: string };
  flagLeft?: { flag?: string; size?: number };
  clearButton?: { size?: number } | null;
  clearBlurs?: boolean;
  disabled?: boolean;
  actionButton?: boolean;
  textType?: string;
  inputType?: 'text' | 'password';
  sendButton?: boolean;
  options?: DropDownOption[];
  noShow?: boolean;
}

export function TextField(props: TextFieldProps) {
  const theme = useTheme();
  const {
    name = 'input_name',
    value = '',
    label = '',
    labelSize = 15,
    placeholder = 'placeholder',
    focused = false,
    onSubmit = () => null,
    onChange = () => null,
    onBlur = () => null,
    onFocus = () => null,
    onKeydown = () => null,
    onAction = () => null,
    onPaste = () => null,
    onClear = () => null,
    actionButton = false,
    maxLength = undefined,
    size = { width: '100%', height: 36 },
    padding = '8px 16px',
    borderRadius = 8,
    editable = true,
    textAlign = 'left' as any,
    labelAlignsRight = true,
    isValid = true,
    inline = false,
    noShow = false,
    flagLeft = undefined,
    borderColor = {
      focused: theme.lyraColors['core-button-primary'],
      blurred: 'transparent',
      error: theme.lyraColors['feedback-warning'],
    },
    backgroundColor = {
      focused: theme.lyraColors['core-surface-secondary'],
      blurred: theme.lyraColors['core-surface-secondary'],
    },
    color = {
      focused: theme.lyraColors['core-text-primary'],
      blurred: theme.lyraColors['core-text-secondary'],
      error: theme.lyraColors['core-text-primary'],
      placeholder: theme.lyraColors['core-text-disabled'],
      disabled: theme.lyraColors['core-text-disabled'],
    },
    iconLeft = null,
    clearButton = { size: 20 },
    clearBlurs = false,
    disabled = false,
    textType,
    inputType = 'text',
  } = props;
  const input = useRef<HTMLInputElement>(null);
  const [text, setText] = useState<string>(value);
  const [isFocused, setIsFocused] = useState<boolean>(focused);
  const [show, setShow] = useState<boolean>(false);
  const styles = {
    borderColor,
    backgroundColor,
    color,
    isValid,
    borderRadius,
    size,
    padding,
    textAlign,
    labelSize,
  };
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const transition: Transition = { ease: 'easeInOut', duration: 0.25 };
  useEffect(() => {
    if (input && input.current) {
      if (focused) input.current.focus();
      else input.current.blur();
      setIsFocused(focused);
    }
  }, [focused]);
  useEffect(() => {
    setText(value);
  }, [value]);
  useEffect(() => {
    if (input?.current && focused) {
      input.current.focus();
    }
  }, [focused, input]);

  function handleClearTextField() {
    if (input?.current) {
      if (!clearBlurs) input.current.focus();
      setText('');
    }
    onChange('');
    onClear();
  }

  function handleValueChange(value: string) {
    setText(value);
    onChange(value);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleBlur();
      onSubmit(text);
      if (input.current) input?.current.blur();
    }
    if (disabled) {
      e.preventDefault();
      return true;
    }
    onKeydown(e.key, e);
  }
  function handleFocus() {
    setIsFocused(true);
    onFocus(text);
  }
  function handleBlur() {
    setIsFocused(false);
    onBlur(text);
  }

  return (
    <Styled.InputWrapper
      $props={styles}
      $focused={isFocused}
      $isvalid={isValid}
      $inline={inline}
    >
      {flagLeft && <Flag flag={flagLeft.flag} size={flagLeft.size} />}
      {label !== '' && <Styled.Label $props={styles}>{label}</Styled.Label>}
      <Styled.InputContainer $padding={padding}>
        {iconLeft && (
          <div style={{ width: iconLeft.size, height: iconLeft.size }}>
            <UIIcon
              name={iconLeft.name}
              size={iconLeft.size}
              strokeColor={
                iconLeft.color
                  ? iconLeft.color
                  : theme.lyraColors['core-icon-secondary']
              }
            />
          </div>
        )}
        <Styled.Input
          $textType={textType}
          $props={styles}
          $isvalid={isValid}
          $focused={isFocused}
          $label={label}
          $labelRight={labelAlignsRight}
          ref={input}
          type={inputType === 'password' && show ? 'text' : inputType}
          name={name}
          aria-label={name}
          autoCapitalize={'none'}
          autoCorrect={'off'}
          autoComplete={'off'}
          value={text}
          onChange={(e) => handleValueChange(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          onPaste={(e) => onPaste(e)}
          placeholder={placeholder}
          onFocus={() => handleFocus()}
          onBlur={() => handleBlur()}
          onMouseDown={(e) => e.stopPropagation()}
          disabled={!editable}
          maxLength={maxLength}
        />
        <AnimatePresence initial={false}>
          {clearButton && text !== '' && (
            <motion.div
              style={{ width: clearButton.size, height: clearButton.size }}
              variants={variants}
              initial={'initial'}
              animate={'animate'}
              exit={'exit'}
              transition={transition}
              onClick={() => handleClearTextField()}
            >
              <UIIcon
                name={'x'}
                size={clearButton.size}
                strokeColor={theme.lyraColors['core-icon-secondary']}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence initial={false}>
          {actionButton && (
            <motion.div
              variants={variants}
              initial={'initial'}
              animate={'animate'}
              exit={'exit'}
              transition={transition}
            >
              <UIButton
                label={'Translate'}
                variant={'text'}
                size={'text'}
                state={text === '' ? 'disabled' : 'normal'}
                labelColor={theme.lyraColors['core-button-primary']}
                onClick={() => onAction()}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {inputType === 'password' && !noShow && (
          <Styled.ButtonShow $disabled={false} $on={show} $focused={focused}>
            <IconButton
              icon={'view'}
              toggleIcon={true}
              toggle={false}
              isToggled={show}
              iconSize={18}
              frameSize={18}
              onClick={() => setShow(!show)}
              tooltip={'Show / Hide'}
              disabled={false}
            />
          </Styled.ButtonShow>
        )}
      </Styled.InputContainer>
    </Styled.InputWrapper>
  );
}
