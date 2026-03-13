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

		// process focus callback
		const handleFocus = useCallback(() => {
			setIsFocused(true);
			textAreaRef?.current?.focus();
			onFocus?.(textAreaRef.current?.value, attachments);
		}, [onFocus, attachments]);

		// process blur callback
		const handleBlur = useCallback(() => {
			setIsFocused(false);
			textAreaRef.current?.blur();
			onBlur?.(textAreaRef.current?.value, attachments);
		}, [onBlur, attachments]);

		// handle attachments change
		const handleAttachmentsChange = useCallback(
			(newFiles: FileItem[]) => {
				onAttachmentsChange?.(newFiles);
				onChange?.(textAreaRef.current?.value, newFiles);
			},
			[onAttachmentsChange, onChange],
		);

		// callback to handle text change
		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLTextAreaElement>) => {
				const newValue = e.target.value;
				setTextValue(newValue);
				onChange?.(newValue, attachments);
			},
			[onChange, attachments],
		);

		// handle submit contents
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

		// handle stop working
		const handleStop = useCallback(() => {
			setIsWorking(false);
			setIsStopEnabled(false);
			onStop?.();
			handleFocus();
		}, [onStop, handleFocus]);

		// callback to handle keydown
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

		// callback to handle send button click
		const handleClickSend = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				e.preventDefault();
				e.stopPropagation();
				if (isWorking && !isStopEnabled) return;
				isStopEnabled ? handleStop() : handleSubmit();
			},
			[handleSubmit, handleStop, isStopEnabled, isWorking],
		);

		// callback to handle submit click
		const handleClickAttach = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				e.preventDefault();
				e.stopPropagation();
			},
			[],
		);

		// focus the text area when clicking on the button bar
		const handleClickButtonBar = useCallback(
			(e: React.MouseEvent<HTMLDivElement>) => {
				e.preventDefault();
				if (isWorking) return;
				handleFocus();
			},
			[handleFocus, isWorking],
		);

		// border color - gradient or solid color or none
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

		// placeholder text
		const setPlaceholder = useMemo(() => {
			if (isWorking && placeholderWorking) return placeholderWorking;
			return placeholder;
		}, [isWorking, placeholder, placeholderWorking]);

		// set send button icon color
		const setSendIconColor = useMemo(() => {
			if (isStopEnabled || isWorking) return 'var(--core-text-primary)';
			if (textValue !== '') return 'var(--core-text-light)';
			return 'var(--core-text-disabled)';
		}, [textValue, isWorking, isStopEnabled]);

		// set the state of the "send" button
		const sendButtonState = useMemo(() => {
			if (isStopEnabled) return 'normal';
			return textValue === '' && !isWorking ? 'disabled' : 'normal';
		}, [textValue, isStopEnabled, isWorking]);

		// set attach icon color
		const attachState = useMemo(() => {
			if (!isWorking) return 'normal';
			return 'disabled';
		}, [isWorking]);

		// update focused state
		useEffect(() => {
			if (focused) textAreaRef.current?.focus();
			else textAreaRef.current?.blur();
		}, [focused]);

		// update text value based on prop change
		useEffect(() => {
			const currentValue = textAreaRef.current?.value;
			if (currentValue !== value) setTextValue(value);
		}, [value]);

		// update working state
		useEffect(() => {
			if (working !== undefined) setIsWorking(working);
		}, [working]);

		// update stop enabled
		useEffect(() => setIsStopEnabled(stopEnabled), [stopEnabled]);

		// memo dynamic css vars
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
