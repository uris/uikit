import { AnimatePresence } from 'motion/react';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../../../hooks';
import { UIButton } from '../../UIButton';
import type { ToolTip } from '../../sharedTypes';
import { type DocExcerpt, ExcerptList } from '../ExcerptList/ExcerptList';
import { FileList } from '../FileList/FileList';
import { UserList } from '../UserList/UserList';
import { PrompState, type UserPresence } from '../UserList/_Types';
import {
	type JurisdictionFocus,
	PromptType,
	Role,
	type SendMessage,
} from '../_Types';
import css from './MessageInput.module.css';

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
	files?: File[];
	excerpts?: DocExcerpt[];
	users?: UserPresence[];
	currentUser?: string;
	owner?: string;
	presenceID?: string;
	jurisdiction?: JurisdictionFocus | null;
	jurisdictionClick?: () => void;
	attachClick?: (e: React.MouseEvent<any> | undefined) => void;
	onChangeFiles?: (files: File[]) => void;
	onChangeExcerpts?: (excerpts: DocExcerpt[]) => void;
	onTogglePrompt?: (presence: UserPresence) => void;
	onToolTip?: (tip: ToolTip | null) => void;
	onChange?: (prompt: string) => void;
	onBlur?: () => void;
	onFocus?: () => void;
	onSend?: (message: SendMessage) => void;
	onStop?: () => void;
}

export function MessageInput(props: Readonly<MessageInputProps>) {
	const {
		maxHeight = 300,
		focused = false,
		error = null,
		value = '',
		placeholder = 'Ask me anytning HR compliance',
		isStreaming = false,
		isFetching = false,
		isShort = true,
		jurisdiction = null,
		files = [],
		excerpts = [],
		users = [],
		currentUser,
		presenceID,
		owner,
		jurisdictionClick = () => null,
		attachClick = () => null,
		onChangeFiles = () => null,
		onChangeExcerpts = () => null,
		onTogglePrompt = () => null,
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
	const [message, setMessage] = useState<string>(value);
	const [isFocused, setIsFocused] = useState<boolean>(focused);
	const [promptType, setPromptType] = useState<PromptType>(PromptType.text);
	const [invalid, setInvalid] = useState<string | null>(error);
	const [remoteDisabled, setRemoteDisabled] = useState<boolean>(false);

	// reset size if the wrapper size changes
	useEffect(() => {
		if (ref?.current) {
			ref.current.style.height = '0px';
			ref.current.style.height = `${Math.min(ref.current.scrollHeight, maxHeight)}px`;
		}
	}, [maxHeight]);

	// reset the message text of the active document is changed
	useEffect(() => setMessage(value), [value]);

	// enable setting focus byt changing the focus prop
	useEffect(() => {
		if (ref?.current) {
			if (focused) ref.current.focus();
			else ref.current.blur();
			setIsFocused(focused);
		}
	}, [focused]);

	// disabled prompt if remote owner disabled the user
	useEffect(() => {
		if (users.length > 0) {
			const myPresensce = users.filter((user: UserPresence) => {
				return user.email === currentUser;
			});
			if (myPresensce && myPresensce.length > 0) {
				setRemoteDisabled(myPresensce[0].promptState === PrompState.Disabled);
			}
			return;
		}
		setRemoteDisabled(false);
	}, [users, currentUser]);

	// update error is prop changes
	useEffect(() => setInvalid(error), [error]);

	const resetHeight = useCallback(() => {
		if (ref?.current) {
			ref.current.style.height = '0px';
			ref.current.style.height = `${Math.min(ref.current.scrollHeight, maxHeight)}px`;
		}
	}, [maxHeight]);

	const doSubmit = useCallback(
		(
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
					role: Role.USER,
					htmlContent: '',
					files,
					excerpts,
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
		},
		[
			message,
			promptType,
			files,
			excerpts,
			onSend,
			onChange,
			resetHeight,
			onToolTip,
		],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (!e.shiftKey && e.key === 'Enter' && message !== '') doSubmit(e);
			else return;
		},
		[message, doSubmit],
	);

	const setFocus = useCallback(() => {
		if (ref?.current) {
			ref.current.focus();
			setIsFocused(true);
			onFocus();
		}
	}, [onFocus]);

	const setBlur = useCallback(() => {
		if (ref?.current) {
			ref.current.blur();
			setIsFocused(false);
			onBlur();
		}
	}, [onBlur]);

	const setDisabled = useCallback(() => {
		if (remoteDisabled) return 'disabled';
		if (isStreaming) return 'normal';
		if (!isStreaming && files.length > 0) return 'normal';
		if (invalid && invalid !== '') return 'disabled';
		if (!isStreaming && isFetching) return 'disabled';
		if (!isStreaming && message === '') return 'disabled';
		return 'normal';
	}, [remoteDisabled, isStreaming, files.length, invalid, isFetching, message]);

	const iconColor = useCallback(() => {
		if (isFetching || isStreaming) {
			if (theme.name === 'lightMode') return theme?.colors?.['core-text-light'];
			return theme?.colors?.['core-surface-primary'];
		}
		if (message === '') {
			return theme?.colors?.['core-surface-secondary'];
		}
		return theme?.colors?.['core-text-light'];
	}, [isFetching, isStreaming, theme.name, theme?.colors, message]);

	const handleUpload = useCallback(
		(e: React.MouseEvent<any> | undefined, type: PromptType) => {
			e?.preventDefault();
			e?.stopPropagation();
			setPromptType(type);
			attachClick(e);
		},
		[attachClick],
	);

	const handleChange = useCallback(
		(input: string) => {
			if (message !== input) onChange(input);
			setMessage(input);
		},
		[message, onChange],
	);

	const handleStop = useCallback(
		(e: React.MouseEvent<any> | undefined) => {
			e?.preventDefault();
			e?.stopPropagation();
			onToolTip(null);
			setBlur();
			onStop();
		},
		[onToolTip, setBlur, onStop],
	);

	const working = useCallback(() => {
		if (isStreaming) return false;
		if (isFetching) return true;
		return false;
	}, [isStreaming, isFetching]);

	const toolTip = useCallback(() => {
		if (isStreaming) return 'Stop';
		if (isFetching) return 'Working ...';
		return 'Send';
	}, [isStreaming, isFetching]);

	const setJurisdiction = useCallback(() => {
		const country = jurisdiction?.country;
		const state = jurisdiction?.state;
		if (!country || country === 'None') return 'None';
		if (state !== 'None') return state;
		return country;
	}, [jurisdiction?.country, jurisdiction?.state]);

	// memo css vars
	const cssVars = useMemo(() => {
		const shadowValue = isShort ? 0 : 1;
		return {
			'--wrapper-padding': isShort
				? '16px 12px 8px 16px'
				: '16px 12px 16px 16px',
			'--wrapper-shadow': `0 0 1px ${shadowValue}px transparent`,
			// biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
			'--wrapper-shadow-focused': `0 0 1px 2px var(--core-outline-special)`,
			'--input-wrapper-padding': isShort
				? '4px 4px 0px 4px'
				: '4px 4px 16px 4px',
		} as React.CSSProperties;
	}, [isShort]);

	const wrapperClassName = [css.wrapper, isFocused ? 'focused' : '']
		.filter(Boolean)
		.join(' ');

	return (
		<div
			className={wrapperClassName}
			style={cssVars}
			onKeyDown={() => null}
			onClick={() => {
				if (!isFocused) setFocus();
			}}
			ref={wrapperRef}
		>
			<AnimatePresence initial={false}>
				{excerpts.length > 0 && (
					<ExcerptList
						excerpts={excerpts}
						onChange={(excerpts: DocExcerpt[]) => onChangeExcerpts(excerpts)}
						onToolTip={(tip) => onToolTip(tip)}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence initial={false}>
				{files.length > 0 && (
					<FileList
						files={files}
						onChange={(items: File[]) => onChangeFiles(items)}
						onToolTip={(tip) => onToolTip(tip)}
					/>
				)}
			</AnimatePresence>
			<div className={css.inputWrapper} style={cssVars}>
				<textarea
					id={'messageInput'}
					name={'messageInput'}
					className={css.textarea}
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
			</div>
			<AnimatePresence initial={false}>
				{users.length > 0 && (
					<UserList
						userPresence={users}
						owner={owner}
						currentUser={currentUser}
						presenceID={presenceID}
						onTogglePrompt={(presence) => onTogglePrompt(presence)}
						onToolTip={(tip) => onToolTip(tip)}
					/>
				)}
			</AnimatePresence>
			<div className={css.buttonRow}>
				<div className={css.actionButtons}>
					<UIButton
						variant={'outline'}
						iconLeft={'plus'}
						tooltip={'Attach file'}
						onClick={(e) => handleUpload(e, PromptType.file)}
						size={'medium'}
						iconColor={theme.colors['core-icon-primary']}
						round
						onToolTip={(tip) => onToolTip(tip)}
					/>
					<UIButton
						paddingRight={18}
						paddingLeft={8}
						variant={'outline'}
						label={`Focus: ${setJurisdiction()}`}
						tooltip={'Jurisdication Focus'}
						onClick={(_e) => jurisdictionClick()}
						iconLeft={'focus'}
						size={'medium'}
						iconColor={theme.colors['core-icon-primary']}
						labelColor={theme?.colors?.['core-text-secondary']}
						onToolTip={(tip) => onToolTip(tip)}
					/>
				</div>
				<div className={css.send}>
					<UIButton
						variant={'solid'}
						iconLeft={isStreaming ? 'stop' : 'arrow up'}
						bgColorDisabled={theme?.colors?.['core-badge-secondary']}
						bgColor={
							isFetching || isStreaming
								? theme?.colors?.['core-text-primary']
								: theme?.colors?.['core-button-primary']
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
							doSubmit(e);
						}}
						tooltip={toolTip()}
						onToolTip={(tip) => onToolTip(tip)}
					/>
				</div>
			</div>
		</div>
	);
}
