import { AnimatePresence, type Transition, motion } from 'motion/react';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTheme } from '../../hooks';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { UIButton } from '../UIButton';
import css from './TextField.module.css';

export interface TextFieldProps {
	value?: string;
	name?: string;
	label?: string;
	labelSize?: 's' | 'm' | 'l';
	textSize?: 's' | 'm' | 'l';
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
	onValidate?: (state: boolean) => void;
	isValid?: boolean;
	inline?: boolean;
	maxLength?: number;
	size?: { width?: number | string; height?: number | string };
	padding?: string;
	borderRadius?: number | string;
	textAlign?: 'left' | 'center';
	borderColor?: { focused: string; blurred: string; error: string };
	backgroundColor?: { focused: string; blurred: string };
	color?: {
		focused: string;
		blurred: string;
		error: string;
		placeholder: string;
		disabled: string;
		label: string;
	};
	validate?: boolean;
	iconLeft?: { name?: string; size?: number; color?: string };
	clearButton?: { size?: number } | null;
	clearBlurs?: boolean;
	disabled?: boolean;
	actionButton?: boolean;
	borderType?: 'box' | 'underline' | 'none';
	inputType?: 'text' | 'password';
	noShow?: boolean;
}

// Extract motion config outside component
const MOTION_CONFIG = {
	variants: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	},
	transition: { ease: 'easeInOut', duration: 0.25 } as Transition,
};

export const TextField = React.memo(
	(props: TextFieldProps) => {
		const theme = useTheme();
		const {
			name = 'input_name',
			value = '',
			label = '',
			labelSize = 'm',
			textSize = 'm',
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
			onValidate = () => null,
			actionButton = false,
			maxLength = undefined,
			size = { width: '100%', height: 'auto' },
			padding = '8px 16px',
			borderRadius = 8,
			editable = true,
			textAlign = 'left',
			isValid = true,
			inline = false,
			noShow = false,
			borderType = 'box',
			validate = true,
			borderColor = {
				focused: 'var(--core-link-primary)',
				blurred: 'var(--core-outline-primary)',
				error: 'var(--feedback-warning)',
			},
			backgroundColor = {
				focused: 'var(--core-surface-secondary)',
				blurred: 'var(--core-surface-secondary)',
			},
			color = {
				focused: 'var(--core-text-primary)',
				blurred: 'var(--core-text-primary)',
				error: 'var(--feedback-warning)',
				placeholder: 'var(--core-text-disabled)',
				disabled: 'var(--core-text-disabled)',
				label: 'var(--core-text-secondary)',
			},
			iconLeft = null,
			clearButton = { size: 20 },
			clearBlurs = false,
			disabled = false,
			inputType = 'text',
		} = props;

		const input = useRef<HTMLInputElement>(null);
		const [text, setText] = useState<string>(value);
		const [isFocused, setIsFocused] = useState<boolean>(focused);
		const [valid, setValid] = useState<boolean>(isValid);
		const [show, setShow] = useState<boolean>(false);

		// update focused and blurred state on prop updates
		useEffect(() => {
			if (!input.current) return;
			if (focused) {
				input.current.focus();
			} else {
				input.current.blur();
			}
			setIsFocused(focused);
		}, [focused]);

		// update text value on prop change
		useEffect(() => {
			setText(value);
		}, [value]);

		// update valid on prop change
		useEffect(() => {
			setValid(isValid);
		}, [isValid]);

		// callback to check if the text is valid
		const textIsValid = useCallback(
			(entry: string) => {
				if (!validate) return;
				const ok = entry.length > 1 || entry === '';
				setValid(ok);
				if (valid !== ok) onValidate(ok);
			},
			[onValidate, valid, validate],
		);

		// memo clear text field contents
		const handleClearTextField = useCallback(() => {
			if (input?.current) {
				if (!clearBlurs) input.current.focus();
				setText('');
				textIsValid('');
			}
			onChange('');
			onClear();
		}, [clearBlurs, onChange, onClear, textIsValid]);

		// memo handling value updates based on input
		const handleValueChange = useCallback(
			(newValue: string) => {
				setText(newValue);
				onChange(newValue);
				if (!valid) textIsValid(text);
			},
			[onChange, textIsValid, text, valid],
		);

		// memo blur handler
		const handleBlur = useCallback(() => {
			textIsValid(text);
			setIsFocused(false);
			onBlur(text);
		}, [text, onBlur, textIsValid]);

		// memo key stroke handling
		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent) => {
				if (e.key === 'Enter') {
					handleBlur();
					onSubmit(text);
					input.current?.blur();
				}
				if (disabled) {
					e.preventDefault();
					return true;
				}
				onKeydown(e.key, e);
			},
			[text, disabled, onSubmit, onKeydown, handleBlur],
		);

		// memo handle focus
		const handleFocus = useCallback(() => {
			setIsFocused(true);
			onFocus(text);
		}, [text, onFocus]);

		// memo toggle show (for passwords)
		const toggleShow = useCallback(() => {
			setShow((prev) => !prev);
		}, []);

		// memo icon style
		const iconContainerStyle = useMemo(
			() =>
				iconLeft ? { width: iconLeft.size, height: iconLeft.size } : undefined,
			[iconLeft],
		);

		// memo icon color
		const iconStrokeColor = useMemo(
			() =>
				iconLeft?.color ? iconLeft.color : theme.colors['core-icon-secondary'],
			[iconLeft, theme],
		);

		// memo show clear button
		const clearButtonStyle = useMemo(
			() =>
				clearButton
					? { width: clearButton.size, height: clearButton.size }
					: undefined,
			[clearButton],
		);

		// process style values that are string, number or undefined
		const setStyleValue = useCallback((value: string | number | undefined) => {
			if (value === undefined) return 'unset';
			if (typeof value === 'string') return value;
			return `${value}px`;
		}, []);

		// memo background color
		const setBackgroundColor = useMemo(() => {
			if (inline) return 'unset';
			if (isFocused) return backgroundColor.focused ?? 'transparent';
			return backgroundColor.blurred ?? 'transparent';
		}, [inline, isFocused, backgroundColor]);

		// memo border color
		const setBorderColor = useMemo(() => {
			if (borderType === 'none') return 'transparent';
			if (validate && !valid)
				return borderColor.error ?? borderColor.blurred ?? 'transparent';
			if (isFocused)
				return borderColor.focused ?? borderColor.blurred ?? 'transparent';
			return borderColor.blurred ?? 'transparent';
		}, [borderType, valid, isFocused, borderColor, validate]);

		// memo box shadow (border style)
		const setBoxShadow = useMemo(() => {
			if (borderType === 'none') return 'unset';
			if (borderType === 'underline') return `0 1px 0 0 ${setBorderColor}`;
			return `0 0 0 1px ${setBorderColor}`;
		}, [borderType, setBorderColor]);

		// memo text color
		const textColor = useMemo(() => {
			if (validate && !valid) return color.error ?? 'var(--core-text-primary)';
			if (isFocused) return color.focused ?? 'var(--core-text-primary)';
			return color.blurred ?? 'var(--core-text-primary)';
		}, [isFocused, valid, color, validate]);

		// memo text align
		const setTextAlign = useMemo(() => {
			return textAlign ?? 'left';
		}, [textAlign]);

		// memo opacity password show / hide
		const setShowOpacity = useMemo(() => {
			if (inputType !== 'password') return '0';
			if (isFocused) return '1';
			return '0.5';
		}, [inputType, isFocused]);

		// memo css vars
		const cssVars = useMemo(() => {
			return {
				'--tf-width': setStyleValue(size.width),
				'--tf-height': setStyleValue(size.height),
				'--tf-padding': setStyleValue(padding),
				'--tf-padding-label-left': label === '' ? 'unset' : '0',
				'--tf-border-radius': setStyleValue(borderRadius),
				'--tf-bg-color': setBackgroundColor,
				'--tf-box-shadow': setBoxShadow,
				'--tf-color': textColor,
				'--tf-label-color': color.label ?? 'var(--core-text-disabled)',
				'--tf-text-align': setTextAlign,
				'--tf-show-opacity': setShowOpacity,
				'--tf-placeholder-color':
					color.placeholder ?? 'var(--core-text-disabled)',
			} as React.CSSProperties;
		}, [
			size,
			padding,
			label,
			borderRadius,
			setStyleValue,
			setBackgroundColor,
			setBoxShadow,
			textColor,
			setTextAlign,
			setShowOpacity,
			color,
		]);

		return (
			<div className={css.wrapper} style={cssVars}>
				{label && (
					<div className={`${css.label} ${css[labelSize]}`}>{label}</div>
				)}
				<div className={css.container}>
					{iconLeft && (
						<div style={iconContainerStyle}>
							<Icon
								name={iconLeft.name}
								size={iconLeft.size}
								strokeColor={iconStrokeColor}
							/>
						</div>
					)}
					<input
						className={`${css.input} ${css[textSize]}`}
						ref={input}
						type={inputType === 'password' && show ? 'text' : inputType}
						name={name}
						aria-label={name}
						autoCapitalize={'none'}
						autoCorrect={'off'}
						autoComplete={'off'}
						value={text}
						onChange={(e) => handleValueChange(e.target.value)}
						onKeyDown={handleKeyDown}
						onPaste={onPaste}
						placeholder={placeholder}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onMouseDown={(e) => e.stopPropagation()}
						disabled={!editable}
						maxLength={maxLength}
					/>
					<AnimatePresence initial={false}>
						{isFocused && clearButton && text !== '' && (
							<motion.div
								className={css.clearButton}
								style={clearButtonStyle}
								variants={MOTION_CONFIG.variants}
								initial={'initial'}
								animate={'animate'}
								exit={'exit'}
								transition={MOTION_CONFIG.transition}
								onClick={handleClearTextField}
							>
								<Icon
									name={'x'}
									size={clearButton.size}
									strokeColor={theme.colors['core-icon-secondary']}
								/>
							</motion.div>
						)}
					</AnimatePresence>
					<AnimatePresence initial={false}>
						{actionButton && (
							<motion.div
								variants={MOTION_CONFIG.variants}
								initial={'initial'}
								animate={'animate'}
								exit={'exit'}
								transition={MOTION_CONFIG.transition}
							>
								<UIButton
									label={'Translate'}
									variant={'text'}
									size={'text'}
									state={text === '' ? 'disabled' : 'normal'}
									labelColor={theme.colors['core-button-primary']}
									onClick={onAction}
								/>
							</motion.div>
						)}
					</AnimatePresence>
					{inputType === 'password' && !noShow && (
						<div className={css.showPassword}>
							<IconButton
								icon={'view'}
								toggleIcon={true}
								toggle={false}
								isToggled={show}
								iconSize={18}
								frameSize={18}
								onClick={toggleShow}
								tooltip={'Show / Hide'}
								disabled={false}
							/>
						</div>
					)}
				</div>
			</div>
		);
	},
	(prevProps, nextProps) => {
		// Custom comparison for expensive props
		return (
			prevProps.value === nextProps.value &&
			prevProps.borderType === nextProps.borderType &&
			prevProps.borderRadius === nextProps.borderRadius &&
			prevProps.borderColor === nextProps.borderColor &&
			prevProps.labelSize === nextProps.labelSize &&
			prevProps.focused === nextProps.focused &&
			prevProps.isValid === nextProps.isValid &&
			prevProps.validate === nextProps.validate &&
			prevProps.disabled === nextProps.disabled &&
			prevProps.color === nextProps.color &&
			prevProps.label === nextProps.label &&
			prevProps.inputType === nextProps.inputType &&
			prevProps.textSize === nextProps.textSize &&
			prevProps.padding === nextProps.padding &&
			prevProps.textAlign === nextProps.textAlign &&
			prevProps.placeholder === nextProps.placeholder
		);
	},
);

TextField.displayName = 'TextField';
