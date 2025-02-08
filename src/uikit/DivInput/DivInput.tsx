import React, { useEffect, useRef, useState } from 'react';
import { cleanString } from '../../util/utils';
import * as Styled from './Styles';

export const enum InputType {
  DocumentName,
  SidebarFolder,
  MessageInput,
  ThreadSummary,
}

export interface DivInputProps {
  onClick?: () => void;
  onDblClick?: () => void;
  onChange?: (value: string | null) => void;
  onSubmit?: (value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onBlur?: (value: string) => void;
  placeholder?: string;
  value?: string;
  isEditable?: boolean;
  type?: InputType;
  focus?: boolean;
  width?: number | string;
  textAlign?: 'left' | 'center' | 'right';
  clamp?: number;
  fontStyle?: string;
  fontColor?: { active?: string; inactive?: string };
  padding?: string;
}

export function DivInput(props: DivInputProps) {
  const {
    value = '',
    placeholder = 'Placeholder',
    isEditable = true,
    type = InputType.DocumentName,
    focus = false,
    width = 'auto',
    textAlign = 'left',
    clamp = 3,
    fontStyle = undefined,
    padding = '0px',
    onChange = () => null,
    onSubmit = () => null,
    onFocus = () => null,
    onBlur = () => null,
    onDblClick = () => null,
    onClick = () => null,
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const innerText = useRef<string>(
    value === '' ? cleanString(placeholder) : cleanString(value),
  );
  const [isFocused, setIsFocused] = useState(focus);
  const [text, setText] = useState(innerText.current);
  useEffect(() => {
    if (focus && ref?.current) {
      handleSelectAll();
      ref.current.focus();
    }
    setIsFocused(focus);
  }, [focus]);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.contentEditable = isEditable ? 'true' : 'false';
    }
  }, [isEditable]);

  useEffect(() => {
    if (value === '') innerText.current = cleanString(placeholder);
    else innerText.current = cleanString(value);
    setText(innerText.current);
  }, [value, placeholder]);

  const handleSetValue = () => {
    const text = ref.current?.innerText;
    innerText.current = cleanString(innerText.current);
    innerText.current = text || '';
    onChange(innerText.current);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // stop propagation to avoid conflicts with listners to shorcuts while editing
    e.stopPropagation();
    if (e.key === 'Enter' && ref.current) {
      e.preventDefault();
      ref.current.innerHTML = cleanString(innerText.current);
      onChange(null);
      onSubmit(innerText.current);
      ref?.current.blur();
      return true;
    }
    if (e.key === '<' || e.key === '>') {
      e.preventDefault();
      return false;
    }
  };

  const handleSelectAll = () => {
    if (!ref.current?.firstChild) return;
    let range = document.createRange();
    range.selectNode(ref.current.firstChild);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = cleanString(e.clipboardData.getData('text/plain'));
    const selection = window.getSelection();
    if (!selection?.rangeCount) return;
    selection?.deleteFromDocument();
    selection?.getRangeAt(0).insertNode(document.createTextNode(text));
    selection?.collapseToEnd();
    const newText = ref.current?.innerText || '';
    onChange(cleanString(newText));
    innerText.current = cleanString(newText);
    return true;
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsFocused(true);
    onFocus(e);
  };

  const handleBlur = (_e: React.FocusEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const text = cleanString(innerText.current);
    if (text === '') {
      ref.current.innerText = placeholder;
      innerText.current = placeholder;
    }
    onChange(null);
    onSubmit(innerText.current);
    setIsFocused(false);
    onBlur(text);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <Styled.Input
      $clamp={clamp}
      $type={type}
      $isEditable={isEditable}
      $width={width}
      $textAlign={textAlign}
      $isFocused={isFocused}
      $fontStyle={fontStyle}
      $padding={padding}
      ref={ref}
      className={'editableDiv'}
      contentEditable={isEditable}
      suppressContentEditableWarning={true}
      onInput={() => handleSetValue()}
      onKeyDown={(e) => handleKeyDown(e)}
      onFocus={(e) => handleFocus(e)}
      onBlur={(e) => handleBlur(e)}
      onPaste={(e) => handlePaste(e)}
      onDoubleClick={() => onDblClick()}
      onClick={(e) => handleClick(e)}
    >
      {text}
    </Styled.Input>
  );
}
