import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { useObserveResize } from '../../../hooks/useObserveResize';
import { FileList } from '../FileList/FileList';
import { UIButton } from '../../UIButton/UIButton';
import {
  JurisdictionFocus,
  PromptType,
  Role,
  SendMessage,
  UploadDocument,
} from '../_Types';
import { ToolTip } from '../../../uikit/sharedTypes';
import * as Styled from './_Styles';

export interface MessageInputProps {
  maxHeight?: number;
  focused?: boolean;
  height?: string;
  placeholder?: string;
  value?: string;
  role?: string;
  showFilters?: boolean;
  isFetching?: boolean;
  isStreaming?: boolean;
  isShort?: boolean;
  error?: string | null;
  jurisdiction?: JurisdictionFocus | null;
  jurisdictionClick?: () => void;
  attachClick?: () => void;
  complianceCheckClick?: () => void;
  onClearAttachment?: () => void;
  onToolTip?: (tip: ToolTip | null) => void;
  onChange?: (prompt: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onSend?: (message: SendMessage) => void;
  onStop?: () => void;
}

export function MessageInput(props: MessageInputProps) {
  const {
    maxHeight = 300,
    focused = false,
    error = null,
    value = '',
    placeholder = 'Ask me anything about HR compliance',
    isStreaming = false,
    isFetching = false,
    isShort = true,
    jurisdiction = null,
    jurisdictionClick = () => null,
    attachClick = () => null,
    onClearAttachment = () => null,
    complianceCheckClick = () => null,
    onChange = () => null,
    onBlur = () => null,
    onFocus = () => null,
    onStop = () => null,
    onSend = () => null,
    onToolTip = () => null,
  } = props;
  const theme = useTheme();
  const ref = useRef<HTMLTextAreaElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const size = useObserveResize(wrapperRef);
  const [message, setMessage] = useState<string>(value);
  const [isFocused, setIsFocused] = useState<boolean>(focused);
  const [promptType, setPromptType] = useState<PromptType>(PromptType.text);
  const [upload, setUpload] = useState<UploadDocument | null>(null);
  const [invalid, setInvalid] = useState<string | null>(error);

  // reset size if the warpper size changes
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.height = '0px';
      ref.current.style.height =
        Math.min(ref.current.scrollHeight, maxHeight) + 'px';
    }
  }, [size, message, maxHeight]);

  // reset the message text of the active document is changed
  useEffect(() => setMessage(value), [value]);

  // enable setting focus byt changing the focus prop
  useEffect(() => {
    if (ref && ref.current) {
      if (focused) ref.current.focus();
      else ref.current.blur();
      setIsFocused(focused);
    }
  }, [focused]);

  // update error is prop changes
  useEffect(() => setInvalid(error), [error]);

  function resetHeight() {
    if (ref && ref.current) {
      ref.current.style.height = '0px';
      ref.current.style.height =
        Math.min(ref.current.scrollHeight, maxHeight) + 'px';
    }
  }

  const doSubmit = (
    e:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
      | undefined,
  ) => {
    e?.preventDefault();
    e?.stopPropagation();
    onToolTip(null);
    if (message !== '' && ref.current) {
      const newMessage: SendMessage = {
        id: crypto.randomUUID(),
        content: message,
        timestamp: new Date().toISOString(),
        promptType,
        role: Role.user,
        htmlContent: '',
        files: [],
        done: false,
      };
      onSend(newMessage);
      setMessage('');
      onChange('');
      resetHeight();
      setIsFocused(false);
      ref.current.blur();
      ref.current.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey && e.key === 'Enter') doSubmit(e);
  };

  function setFocus() {
    if (ref && ref.current) {
      ref.current.focus();
      setIsFocused(true);
      onFocus();
    }
  }

  function setBlur() {
    if (ref && ref.current) {
      ref.current.blur();
      setIsFocused(false);
      onBlur();
    }
  }

  function setDisabled() {
    if (isStreaming) return 'normal';
    else if (!isStreaming && upload) return 'normal';
    else if (invalid && invalid !== '') return 'disabled';
    else if (!isStreaming && isFetching) return 'disabled';
    else if (!isStreaming && message === '') return 'disabled';
    return 'normal';
  }

  const iconColor = () => {
    if (isFetching || isStreaming) {
      if (theme.name === 'lightMode')
        return theme?.lyraColors?.['core-text-light'];
      return theme?.lyraColors?.['core-surface-primary'];
    } else if (message === '') {
      return theme?.lyraColors?.['core-surface-secondary'];
    } else return theme?.lyraColors?.['core-text-light'];
  };

  function handleUpload(
    e: React.MouseEvent<any> | undefined,
    type: PromptType,
  ) {
    e?.preventDefault();
    e?.stopPropagation();
    setPromptType(type);
    if (promptType === PromptType.compliance) attachClick();
    else complianceCheckClick();
  }

  function handleChange(input: string) {
    if (message !== input) onChange(input);
    setMessage(input);
  }

  function handleStop(e: React.MouseEvent<any> | undefined) {
    e?.preventDefault();
    e?.stopPropagation();
    onToolTip(null);
    setBlur();
    onStop();
  }

  function handleClearAttachment() {
    setUpload(null);
    onClearAttachment();
  }

  const working = () => {
    if (isStreaming) return false;
    if (isFetching) return true;
    return false;
  };

  const toolTip = () => {
    if (isStreaming) return 'Stop';
    if (isFetching) return 'Working ...';
    return 'Send';
  };

  const setJurisdiction = () => {
    const country = jurisdiction?.country;
    const state = jurisdiction?.state;
    if (!country || country === 'None') return 'None';
    if (state !== 'None') return state;
    return country;
  };

  return (
    <Styled.Wrapper
      className={isFocused ? 'focused' : ''}
      $isFocused={isFocused}
      $isShort={isShort}
      onClick={() => {
        if (!isFocused) setFocus();
      }}
      ref={wrapperRef}
    >
      <AnimatePresence initial={false}>
        {upload && (
          <FileList onClearAttachment={() => handleClearAttachment()} />
        )}
      </AnimatePresence>
      <Styled.InputWrapper $isShort={isShort}>
        <Styled.TextArea
          id={'messageInput'}
          name={'messageInput'}
          ref={ref}
          value={message}
          onChange={({ target }) => handleChange(target.value)}
          onInput={() => resetHeight()}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder={placeholder}
          disabled={isStreaming}
          onFocus={() => setFocus()}
          onBlur={() => setBlur()}
          rows={1}
        />
      </Styled.InputWrapper>
      <Styled.ButtonRow>
        <Styled.ActionButtons $isShort={isShort}>
          <UIButton
            iconLeft={'attach'}
            tooltip={'Attach file'}
            onClick={(e) => handleUpload(e, PromptType.file)}
            variant={'text'}
            size={'text'}
            onToolTip={(tip) => onToolTip(tip)}
          />
          <UIButton
            iconLeft={'compliance check'}
            tooltip={'Compliance check'}
            onClick={(e) => handleUpload(e, PromptType.compliance)}
            variant={'text'}
            size={'text'}
            onToolTip={(tip) => onToolTip(tip)}
          />
          <UIButton
            label={`Focus: ${setJurisdiction()}`}
            tooltip={'Jurisdication Focus'}
            onClick={(_e) => jurisdictionClick()}
            iconLeft={'focus'}
            variant={'text'}
            size={'text'}
            labelColor={theme?.lyraColors?.['core-text-secondary']}
            onToolTip={(tip) => onToolTip(tip)}
          />
        </Styled.ActionButtons>
        <Styled.Send>
          <UIButton
            variant={'solid'}
            iconLeft={isStreaming ? 'stop' : 'arrow up'}
            bgColorDisabled={theme?.lyraColors?.['core-badge-secondary']}
            bgColor={
              isFetching || isStreaming
                ? theme?.lyraColors?.['core-text-primary']
                : theme?.lyraColors?.['core-button-primary']
            }
            iconColor={iconColor()}
            state={setDisabled()}
            size={'medium'}
            progress={true}
            working={working()}
            round
            onClick={(e) => {
              if (isStreaming) handleStop(e);
              if (isFetching) return;
              else doSubmit(e);
            }}
            tooltip={toolTip()}
            onToolTip={(tip) => onToolTip(tip)}
          />
        </Styled.Send>
      </Styled.ButtonRow>
    </Styled.Wrapper>
  );
}
