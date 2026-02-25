import { motion } from 'motion/react';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { cleanString } from '../../util/utils';
import css from './DivInput.module.css';

export interface DivInputProps {
	name?:string;
	onClick?: () => void;
	onDblClick?: () => void;
	onChange?: (value: string | null) => void;
	onSubmit?: (value: string) => void;
	onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
	onBlur?: (value: string) => void;
	placeholder?: string;
	value?: string;
	isEditable?: boolean;
	wrap?: boolean;
	focus?: boolean;
	width?: number | string;
	textAlign?: 'left' | 'center' | 'right';
	clamp?: number;
	padding?: string;
	radius?: number;
	bgColor?: string;
}

export const DivInput = React.memo((props: DivInputProps) => {
	const {
		value = '',
		name = "Input Field",
		placeholder = 'Placeholder',
		isEditable = true,
		wrap = false,
		focus = false,
		width = 'auto',
		textAlign = 'left',
		clamp = 3,
		padding = '0px',
		onChange = () => null,
		onSubmit = () => null,
		onFocus = () => null,
		onBlur = () => null,
		onDblClick = () => null,
		onClick = () => null,
		radius = 4,
		bgColor = 'var(--core-surface-secondary)',
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const innerText = useRef<string>(
		value === '' ? cleanString(placeholder) : cleanString(value),
	);
	const [isFocused, setIsFocused] = useState(focus);
	const [text, setText] = useState(innerText.current);
	const [isPlaceholder, setIsPlaceholder] = useState<boolean>(false);

	// Memoize setCursor function
	const setCursor = useCallback((to: 'start' | 'end', length = 1) => {
		if (ref.current) {
			const range = document.createRange();
			range.setStart(ref.current, to === 'start' ? 0 : length);
			range.setEnd(ref.current, to === 'start' ? 0 : 1);
			const selection = globalThis.getSelection();
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	}, []);

	// Memoize handleSelectAll
	const handleSelectAll = useCallback(() => {
		if (!ref.current?.firstChild) return;
		const range = document.createRange();
		range.selectNode(ref.current.firstChild);
		globalThis.getSelection()?.removeAllRanges();
		globalThis.getSelection()?.addRange(range);
	}, []);

	// Combined effect for related state updates
	useEffect(() => {
		if (!ref.current) return;

		// Set contentEditable
		ref.current.contentEditable = isEditable ? 'true' : 'false';

		// Handle focus
		if (focus) {
			handleSelectAll();
			ref.current.focus();
		}
		setIsFocused(focus);

		// Update text
		const newText =
			value === '' ? cleanString(placeholder) : cleanString(value);
		innerText.current = newText;
		ref.current.innerText = newText;
		setText(newText);
	}, [value, placeholder, focus, isEditable, handleSelectAll]);

	// Effect for placeholder state
	useEffect(() => {
		if (placeholder) {
			setIsPlaceholder(text === placeholder);
		}
	}, [placeholder, text]);

	// Memoize handleSetValue
	const handleSetValue = useCallback(
		(e: React.InputEvent<HTMLDivElement>) => {
			let textString = '';
			const stripped = e.currentTarget.innerText.replaceAll(/\s+/g, '');
			if (stripped.length === 0 && placeholder && ref.current) {
				ref.current.innerText = placeholder;
				setIsPlaceholder(true);
				setCursor('start');
			} else if (isPlaceholder) {
				const textString = e.currentTarget.innerText.replace(placeholder, '');
				innerText.current = cleanString(textString);
				if (ref.current) {
					ref.current.innerText = cleanString(textString);
					setCursor('end');
				}
			} else {
				textString = e.currentTarget.innerText;
				innerText.current = cleanString(textString || '');
			}
			onChange(innerText.current);
			setText(innerText.current);
		},
		[placeholder, isPlaceholder, onChange, setCursor],
	);

	// Memoize handleKeyDown
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			// stop propagation to avoid conflicts with listeners to shortcuts while editing
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
		},
		[onChange, onSubmit],
	);

	// Memoize handlePaste
	const handlePaste = useCallback(
		(e: React.ClipboardEvent<HTMLDivElement>) => {
			e.preventDefault();
			const pasteText = cleanString(e.clipboardData.getData('text/plain'));
			const selection = globalThis.getSelection();
			if (!selection?.rangeCount) return;
			selection?.deleteFromDocument();
			selection?.getRangeAt(0).insertNode(document.createTextNode(pasteText));
			selection?.collapseToEnd();
			const newText = ref.current?.innerText || '';
			onChange(cleanString(newText));
			innerText.current = cleanString(newText);
			return true;
		},
		[onChange],
	);

	// Memoize handleFocus
	const handleFocus = useCallback(
		(e: React.FocusEvent<HTMLDivElement>) => {
			setIsFocused(true);
			onFocus(e);
		},
		[onFocus],
	);

	// Memoize handleBlur
	const handleBlur = useCallback(
		(_e: React.FocusEvent<HTMLDivElement>) => {
			if (!ref.current) return;
			const blurText = cleanString(innerText.current);
			if (blurText === '') {
				ref.current.innerText = placeholder;
				innerText.current = placeholder;
			}
			onChange(null);
			onSubmit(innerText.current);
			setIsFocused(false);
			onBlur(blurText);
		},
		[placeholder, onChange, onSubmit, onBlur],
	);

	// Memoize handleClick
	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			e.preventDefault();
			e.stopPropagation();
			if (isPlaceholder) setTimeout(() => setCursor('start'), 50);
			onClick();
		},
		[isPlaceholder, setCursor, onClick],
	);

	// calc css values as number / string
	const setWidth = useCallback((width: number | string) => {
		if (typeof width === 'string') return width;
		return `${width}px`;
	}, []);

	// memo cssVars
	const cssVars = useMemo(() => {
		return {
			'--div-input-color': isPlaceholder
				? 'var(--core-text-tertiary)'
				: 'var(--core-text-primary)',
			'--div-input-width': `${setWidth(width)}`,
			'--div-input-user-select': isEditable ? 'text' : 'none',
			'--div-input-padding': padding ?? '0',
			'--div-input-text-align': textAlign ?? 'left',
			'--div-input-white-space': isEditable && wrap ? 'wrap' : 'no-wrap',
			'--div-input-line-clamp':
				isEditable && isFocused ? 'none' : (clamp ?? 'none'),
			'--div-input-cursor': isEditable ? 'text' : 'default',
			'--div-input-bg': isEditable
				? (bgColor ?? 'var(--core-surface-secondary)')
				: 'transparent',
			'--div-input-wrapper-bg':
				isEditable && isFocused
					? (bgColor ?? 'var(--core-surface-secondary)')
					: 'transparent',
			'--div-input-border-radius': `${radius}px`,
		} as React.CSSProperties;
	}, [
		clamp,
		wrap,
		isEditable,
		width,
		textAlign,
		isFocused,
		padding,
		isPlaceholder,
		setWidth,
		bgColor,
		radius,
	]);

	// avoid issues with safari that refocuses editable divs on blur
	// by wrapping it with a pointer events none
	return (
		<div
			className={css.wrapper}
			style={cssVars}
			role={'textbox'}
			aria-label={name}
		>
			<motion.div
				className={css.input}
				ref={ref}
				contentEditable={isEditable}
				suppressContentEditableWarning={true}
				onInput={handleSetValue}
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onPaste={handlePaste}
				onDoubleClick={onDblClick}
				onClick={handleClick}
			>
				{value ?? placeholder}
			</motion.div>
		</div>
	);
});

DivInput.displayName = 'DivInput';
