import React, { useCallback, useEffect, useRef, useState } from 'react';
import { UIButton } from '../UIButton';
import * as Styled from './Styles';

export interface TextAreaProps {
  value?: string;
  name?: string;
  width?: number | string;
  height?: number | string;
  rows?: number;
  focused?: boolean;
  placeholder?: string;
  spacer?: 'xl' | 'lg' | 'md' | 'sm' | 'custom' | 'none';
  custom?: number;
  padding?: string;
  validate?: boolean;
  dark?: boolean;
  resizable?: boolean;
  hasSend?: boolean;
  sendOffset?: { bottom: number; right: number };
  sendSize?: number;
  sendColors?: { normal?: string; active?: string; disabled?: string };
  bgColor?: string;
  border?: boolean;
  onChange?: (value: string) => void;
  onSubmit?: (vakue: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onValidate?: (state: boolean) => void;
}

export function TextArea(props: TextAreaProps) {
  const {
    value = '',
    name = 'text_area',
    width = '100%',
    height = 'auto',
    focused = false,
    spacer = 'none',
    custom = 0,
    placeholder = '',
    rows = 6,
    dark = true,
    padding = '16px 4px 16px 16px',
    validate = true,
    resizable = true,
    hasSend = false,
    sendOffset = { bottom: 6, right: 6 },
    sendSize = 36,
    bgColor = undefined,
    border = undefined,
    onChange = () => null,
    onFocus = () => null,
    onBlur = () => null,
    onValidate = () => null,
    onSubmit = () => null,
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(focused);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [text, setText] = useState<string>(value);
  const [initiated, setInitiated] = useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const runValidation = useCallback(
    (content: string): boolean => {
      let valid = true;
      if (validate && content.length < 1) valid = false;
      if (!initiated) valid = true;
      onValidate(valid);
      return !valid;
    },
    [initiated, onValidate, validate],
  );

  // focus / blur field on prop change
  useEffect(() => {
    if (ref && ref.current) {
      if (focused) ref.current.focus();
      else ref.current.blur();
      setIsFocused(focused);
    }
  }, [focused, ref]);

  // update value on text entry or prop change
  useEffect(() => {
    setText(value);
    setInvalid(runValidation(value));
  }, [value, runValidation]);

  const margin = () => {
    if (spacer === 'none') return 0;
    if (spacer === 'custom') return custom;
    return 0;
  };

  function handleChange(content: string) {
    onChange(content);
    setText(content);
    setInvalid(runValidation(content));
  }

  function handleFocus() {
    if (ref && ref.current) ref.current.focus();
    setInitiated(true);
    setIsFocused(true);
    onFocus();
  }

  function handleBlur(content: any) {
    handleChange(content);
    setIsFocused(false);
    onBlur();
  }

  function handleSubmit(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    handleFocus();
    onSubmit(text);
    setText('');
    if (ref && ref.current) ref.current.value = '';
    handleResize();
  }

  function handleResize() {
    if (!ref || !ref.current) return;
    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }

  return (
    <Styled.Wrapper
      $width={width}
      $height={height}
      $invalid={invalid}
      $padding={padding}
      $focused={isFocused}
      $margin={margin()}
      $resize={resizable}
      $dark={dark}
      $bgColor={bgColor}
      $border={border}
      onBlur={() => handleBlur(text)}
      onFocus={() => handleFocus()}
    >
      {hasSend && (
        <Styled.Send
          $offset={sendOffset}
          $size={sendSize}
          onMouseDown={(e) => handleSubmit(e)}
        >
          <UIButton
            iconLeft={'arrow up'}
            size={'medium'}
            variant={'solid'}
            round
          />
        </Styled.Send>
      )}
      <textarea
        ref={ref}
        name={name}
        value={text}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => handleChange(e.target.value)}
        onInput={() => handleResize()}
      />
    </Styled.Wrapper>
  );
}
