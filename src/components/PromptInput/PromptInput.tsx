'use client';

import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTheme } from '../../hooks';
import { Button } from '../Button';
import { type FileItem, FileList } from '../FileList';
import css from './PromptInput.module.css';
import type { PromptProps } from './_types';

const PromptInputBase = React.forwardRef<HTMLDivElement, PromptProps>(
	(props, ref) => {
		const {
			children,
			attachments = [],
			value = '',
			working = false,
			maxHeight,
			borderStyle = 'gradient',
			borderColor,
			borderColorOn,
			borderAnimate = true,
			borderWidth = 1,
			borderRadius = 8,
			focused = false,
			placeholder = 'Ask me anything ...',
			placeholderWorking = 'Working ...',
			submitClears = true,
			submitEnablesStop = true,
			enterSubmits = true,
			attachButton = true,
			sendButton = true,
			stopEnabled = false,
			textSize = 'm',
			maxLength,
			toolbarGap = 8,
			onChange,
			onBlur,
			onFocus,
			onSubmit,
			onStop,
			onAttachmentsChange,
		} = props;
		const { isDark } = useTheme();
		const [isFocused, setIsFocused] = useState<boolean>(focused ?? false);
		const [isWorking, setIsWorking] = useState<boolean>(working ?? false);
		const [isStopEnabled, setIsStopEnabled] = useState<boolean>(stopEnabled);
		const [textValue, setTextValue] = useState<string | undefined>(value);
		const textAreaRef = useRef<HTMLTextAreaElement>(null);

		// focus the textarea and report the current prompt state
		const handleFocus = useCallback(() => {
			setIsFocused(true);
			textAreaRef?.current?.focus();
			onFocus?.(textAreaRef.current?.value, attachments);
		}, [onFocus, attachments]);

		// blur the textarea and report the current prompt state
		const handleBlur = useCallback(() => {
			setIsFocused(false);
			textAreaRef.current?.blur();
			onBlur?.(textAreaRef.current?.value, attachments);
		}, [onBlur, attachments]);

		// forward attachment updates and keep the parent prompt state in sync
		const handleAttachmentsChange = useCallback(
			(newFiles: FileItem[]) => {
				onAttachmentsChange?.(newFiles);
				onChange?.(textAreaRef.current?.value, newFiles);
			},
			[onAttachmentsChange, onChange],
		);

		// update local prompt text and notify the consumer
		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLTextAreaElement>) => {
				const newValue = e.target.value;
				setTextValue(newValue);
				onChange?.(newValue, attachments);
			},
			[onChange, attachments],
		);

		// submit the current prompt when not already working or stopping
		const handleSubmit = useCallback(() => {
			if (isWorking || isStopEnabled) return;
			const currentValue = textAreaRef.current?.value;
			if (currentValue) {
				onSubmit?.(currentValue, attachments);
				setIsWorking(true);
				if (submitClears) setTextValue('');

				if (submitEnablesStop) setIsStopEnabled(true);
				handleBlur();
			}
		}, [
			submitClears,
			onSubmit,
			handleBlur,
			submitEnablesStop,
			isWorking,
			isStopEnabled,
			attachments,
		]);

		// stop the current run and return focus to the textarea
		const handleStop = useCallback(() => {
			setIsWorking(false);
			setIsStopEnabled(false);
			onStop?.();
			handleFocus();
		}, [onStop, handleFocus]);

		// optionally submit on enter from the textarea
		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
				if (e.key === 'Enter' && enterSubmits) {
					e.preventDefault();
					if (isWorking) return;
					handleSubmit();
				}
			},
			[handleSubmit, isWorking, enterSubmits],
		);

		// route the send button to submit or stop based on the current state
		const handleClickSend = useCallback(
			(e: React.MouseEvent<HTMLButtonElement>) => {
				e.preventDefault();
				e.stopPropagation();
				if (isWorking && !isStopEnabled) return;
				isStopEnabled ? handleStop() : handleSubmit();
			},
			[handleSubmit, handleStop, isStopEnabled, isWorking],
		);

		// keep the attach button from stealing wrapper click behavior
		const handleClickAttach = useCallback(
			(e: React.MouseEvent<HTMLButtonElement>) => {
				e.preventDefault();
				e.stopPropagation();
			},
			[],
		);

		// return focus to the textarea when the toolbar is clicked
		const handleClickButtonBar = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				e.preventDefault();
				if (isWorking) return;
				handleFocus();
			},
			[handleFocus, isWorking],
		);

		// resolve the outer border treatment from style, focus, and working state
		const setBorderColor = useMemo(() => {
			if (borderStyle === 'gradient') {
				const radial = isDark
					? 'var(--conic-gradient-dark)'
					: 'var(--conic-gradient-light)';
				if (isWorking && borderAnimate) return radial;
				if (isFocused) return borderColorOn ?? radial;
				return borderColor ?? radial;
			}
			if (borderStyle === 'solid') {
				if (isWorking) return borderColorOn ?? 'var(--core-outline-special)';
				if (isFocused) return borderColorOn ?? 'var(--core-outline-special)';
				return borderColor ?? 'transparent';
			}
			return 'transparent';
		}, [
			borderStyle,
			isFocused,
			borderColorOn,
			borderColor,
			isWorking,
			borderAnimate,
			isDark,
		]);

		// resolve the placeholder text from the current working state
		const setPlaceholder = useMemo(() => {
			if (isWorking && placeholderWorking) return placeholderWorking;
			return placeholder;
		}, [isWorking, placeholder, placeholderWorking]);

		// resolve the send button icon color from working and content state
		const setSendIconColor = useMemo(() => {
			if (isStopEnabled || isWorking) return 'var(--core-text-primary)';
			if (textValue !== '') return 'var(--core-text-light)';
			return 'var(--core-text-disabled)';
		}, [textValue, isWorking, isStopEnabled]);

		// resolve the send button state from content and stop mode
		const sendButtonState = useMemo(() => {
			if (isStopEnabled) return 'normal';
			return textValue === '' && !isWorking ? 'disabled' : 'normal';
		}, [textValue, isStopEnabled, isWorking]);

		// resolve the attach button state while work is in progress
		const attachState = useMemo(() => {
			if (!isWorking) return 'normal';
			return 'disabled';
		}, [isWorking]);

		// sync focus requests from the controlled prop
		useEffect(() => {
			if (focused) textAreaRef.current?.focus();
			else textAreaRef.current?.blur();
		}, [focused]);

		// sync the textarea value from the controlled prop
		useEffect(() => {
			const currentValue = textAreaRef.current?.value;
			if (currentValue !== value) setTextValue(value);
		}, [value]);

		// sync the local working state from the controlled prop
		useEffect(() => {
			if (working !== undefined) setIsWorking(working);
		}, [working]);

		// sync stop-mode availability from the controlled prop
		useEffect(() => setIsStopEnabled(stopEnabled), [stopEnabled]);

		// compose CSS custom properties for border treatment and sizing
		const cssVars = useMemo(() => {
			return {
				'--prompt-border-color': setBorderColor,
				'--prompt-max-height': maxHeight ? `${maxHeight}px` : 'unset',
				'--prompt-border-width': borderWidth ? `${borderWidth}px` : '0',
				'--prompt-state': isWorking && borderAnimate ? 'running' : 'paused',
				'--prompt-border-radius': borderRadius ? `${borderRadius}px` : '8px',
				'--prompt-inner-border-radius': borderRadius
					? `${borderRadius - 1}px`
					: '7px',
			} as React.CSSProperties;
		}, [
			isWorking,
			borderAnimate,
			setBorderColor,
			borderWidth,
			borderRadius,
			maxHeight,
		]);

		return (
			<div className={css.wrapperBg} ref={ref} style={cssVars}>
				<div className={css.textareaWrapper}>
					{attachments.length > 0 && (
						<div className={css.attachments}>
							<FileList
								files={attachments}
								onChange={handleAttachmentsChange}
								bgColor={'var(--core-surface-primary)'}
								size={'s'}
								direction={'row'}
								gap={8}
								iconSize={24}
							/>
						</div>
					)}
					<textarea
						id={'promptInput'}
						name={'promptInput'}
						className={`${css.textarea} ${css[textSize]}`}
						ref={textAreaRef}
						value={textValue ?? ''}
						onChange={handleChange}
						placeholder={setPlaceholder}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						maxLength={maxLength}
						rows={1}
					/>
					{(children || attachButton || sendButton) && (
						<div className={css.buttonBar} onMouseDown={handleClickButtonBar}>
							<div className={css.toolBar} style={{ gap: toolbarGap }}>
								{attachButton && (
									<Button
										round
										label={undefined}
										variant={'outline'}
										iconLeft={'plus'}
										iconSize={20}
										state={attachState}
										onMouseDown={handleClickAttach}
									/>
								)}
								{children}
							</div>
							{sendButton && (
								<Button
									round
									label={undefined}
									variant={isStopEnabled ? 'outline' : 'solid'}
									iconLeft={isStopEnabled ? 'stop' : 'arrow up'}
									iconSize={isStopEnabled ? 16 : 20}
									state={sendButtonState}
									bgColorDisabled={'var(--core-outline-primary)'}
									progress={!isStopEnabled}
									working={!isStopEnabled && isWorking}
									onMouseDown={handleClickSend}
									iconColor={setSendIconColor}
								/>
							)}
						</div>
					)}
				</div>
			</div>
		);
	},
);

PromptInputBase.displayName = 'PromptInput';

export const PromptInput = React.memo(PromptInputBase);
