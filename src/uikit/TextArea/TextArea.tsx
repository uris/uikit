import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import { UIButton } from '../UIButton';
import css from './TextArea.module.css';
import type { TextAreaProps } from './_types';

export const TextArea = React.memo((props: TextAreaProps) => {
	const {
		value = '',
		name = 'text_area',
		width = '100%',
		focused = false,
		placeholder = 'Enter text here...',
		rows = 6,
		border = false,
		borderRadius = 4,
		padding = '16px 4px 16px 16px',
		validate = false,
		resizable = true,
		hasSend = false,
		sendOffset = { bottom: 6, right: 6 },
		sendSize = 36,
		returnSubmits = false,
		bgColor = undefined,
		minWidth = undefined,
		textSize = 'm',
		disabled = false,
		submitClears = true,
		onChange = () => null,
		onFocus = () => null,
		onBlur = () => null,
		onValidate = () => null,
		onSubmit = () => null,
		onKeyDown = () => null,
	} = props;

	const [isFocused, setIsFocused] = useState<boolean>(focused);
	const [invalid, setInvalid] = useState<boolean>(false);
	const [text, setText] = useState<string>(value);
	const [initiated, setInitiated] = useState<boolean>(false);
	const ref = useRef<HTMLTextAreaElement>(null);

	// update text area height
	const handleResize = useCallback(() => {
		if (!ref?.current) return;
		ref.current.style.height = 'auto';
		ref.current.style.height = `${ref.current.scrollHeight}px`;
	}, []);

	// validate content
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
		if (ref?.current) {
			if (focused) ref.current.focus();
			else ref.current.blur();
			setIsFocused(focused);
		}
	}, [focused]);

	// update value on prop change
	useEffect(() => {
		if (value) {
			setText(value);
			setInvalid(runValidation(value));
		}
	}, [value, runValidation]);

	// update height based on rows value
	// biome-ignore lint/correctness/useExhaustiveDependencies: update heigt on rows change
	useEffect(() => {
		handleResize();
	}, [rows]);

	// update value
	const handleChange = useCallback(
		(content: string) => {
			onChange(content);
			setText(content);
			setInvalid(runValidation(content));
		},
		[onChange, runValidation],
	);

	// set focus
	const handleFocus = useCallback(() => {
		if (ref?.current) ref.current.focus();
		setInitiated(true);
		setIsFocused(true);
		onFocus();
	}, [onFocus]);

	// set blur
	const handleBlur = useCallback(
		(content: any) => {
			handleChange(content);
			setIsFocused(false);
			onBlur();
		},
		[handleChange, onBlur],
	);

	// trigger submit as needed
	const handleSubmit = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
			e?.preventDefault();
			handleFocus();
			onSubmit(text);
			if (submitClears) setText('');
			if (ref?.current) ref.current.value = '';
			handleResize();
		},
		[handleFocus, onSubmit, text, submitClears, handleResize],
	);

	// handle return key
	const handleKeyDownWrapper = useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (returnSubmits && e.key === 'Enter') {
				e.preventDefault();
				e.stopPropagation();
				handleSubmit(undefined);
			}
			onKeyDown(e);
		},
		[returnSubmits, handleSubmit, onKeyDown],
	);

	// set style value
	const setStyleValue = useCallback((value: string | number) => {
		if (typeof value === 'string') return value;
		return `${value}px`;
	}, []);

	// memo border color
	const setBorderColor = useMemo(() => {
		if (isFocused) return 'var(--core-link-primary)';
		if (validate && invalid) return 'var(--feedback-warning)';
		return border ? 'var(--core-outline-primary)' : 'transparent';
	}, [isFocused, invalid, validate, border]);

	// memo text size
	const textClassName = useMemo(() => {
		if (textSize === 'l') return css.l;
		if (textSize === 'm') return css.m;
		return css.s;
	}, [textSize]);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--ta-border-radius': `${borderRadius}px`,
			'--ta-width': `${setStyleValue(width)}`,
			'--ta-min-width': minWidth ? `${minWidth}px` : 'unset',
			'--ta-bg-color': bgColor ?? 'var(--core-surface-secondary)',
			'--ta-border-color': setBorderColor,
			'--ta-padding': `${setStyleValue(padding)}`,
			'--ta-send-icon-offset-bottom': `${sendOffset.bottom}px`,
			'--ta-send-icon-offset-right': `${sendOffset.right}px`,
			'--ta-send-icon-size': `${sendSize}px`,
			'--ta-resize': resizable ? 'vertical' : 'none',
		} as React.CSSProperties;
	}, [
		width,
		minWidth,
		bgColor,
		setBorderColor,
		padding,
		sendOffset,
		sendSize,
		setStyleValue,
		borderRadius,
		resizable,
	]);

	/* START.DEBUG */
	useTrackRenders(props, 'TextArea');
	/* END.DEBUG */

	return (
		<div
			className={css.wrapper}
			style={cssVars}
			onBlur={() => handleBlur(text)}
			onFocus={() => handleFocus()}
		>
			{hasSend && (
				<div className={css.send} onMouseDown={(e) => handleSubmit(e)}>
					<UIButton
						iconLeft={'arrow up'}
						size={'medium'}
						variant={'solid'}
						round
					/>
				</div>
			)}
			<textarea
				className={`${css.textarea} ${textClassName}`}
				ref={ref}
				name={name}
				value={text}
				placeholder={placeholder}
				rows={rows}
				disabled={disabled}
				onChange={(e) => handleChange(e.target.value)}
				onInput={() => handleResize()}
				onKeyDown={(e) => handleKeyDownWrapper(e)}
			/>
		</div>
	);
});
