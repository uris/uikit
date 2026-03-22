import { AnimatePresence, motion } from 'motion/react';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTheme } from '../../hooks';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import css from './TextField.module.css';
import { MOTION_CONFIG, type TextFieldProps } from './_types';

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
			size = { width: 'auto', height: 'auto' },
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
				label: 'var(--core-text-primary)',
			},
			iconLeft = null,
			clearButton = { size: 20 },
			clearBlurs = false,
			disabled = false,
			inputType = 'text',
			...divAttributes
		} = props;
		const { id: divId, className, style, ...rest } = divAttributes;
		const divStyle = style ?? ({} as React.CSSProperties);
		const divClass = className ? ` ${className}` : '';

		const input = useRef<HTMLInputElement>(null);
		const [text, setText] = useState<string>(value);
		const [isFocused, setIsFocused] = useState<boolean>(focused);
		const [valid, setValid] = useState<boolean>(isValid);
		const [show, setShow] = useState<boolean>(false);

		// sync the input focus state from the controlled prop
		useEffect(() => {
			if (!input.current) return;
			if (focused) {
				input.current.focus();
			} else {
				input.current.blur();
			}
			setIsFocused(focused);
		}, [focused]);

		// sync the input value from the controlled prop
		useEffect(() => {
			setText(value);
		}, [value]);

		// sync the validation state from the controlled prop
		useEffect(() => {
			setValid(isValid);
		}, [isValid]);

		// validate the current text and notify consumers when the result changes
		const textIsValid = useCallback(
			(entry: string) => {
				if (!validate) return;
				const ok = entry.length > 1 || entry === '';
				setValid(ok);
				if (valid !== ok) onValidate(ok);
			},
			[onValidate, valid, validate],
		);

		// clear the field value and optionally preserve focus
		const handleClearTextField = useCallback(() => {
			if (input?.current) {
				if (!clearBlurs) input.current.focus();
				setText('');
				textIsValid('');
			}
			onChange('');
			onClear();
		}, [clearBlurs, onChange, onClear, textIsValid]);

		// update local and external state when the input value changes
		const handleValueChange = useCallback(
			(newValue: string) => {
				if (disabled) return;
				setText(newValue);
				onChange(newValue);
				if (!valid) textIsValid(text);
			},
			[onChange, textIsValid, text, valid, disabled],
		);

		// validate and report the final value when the input loses focus
		const handleBlur = useCallback(() => {
			if (disabled) return;
			textIsValid(text);
			setIsFocused(false);
			onBlur(text);
		}, [text, onBlur, textIsValid, disabled]);

		// handle enter-key submission and forward keyboard events
		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent) => {
				if (disabled) return;
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

		// update focus state and report the current value on focus
		const handleFocus = useCallback(() => {
			if (disabled) return;
			setIsFocused(true);
			onFocus(text);
		}, [text, onFocus, disabled]);

		// toggle password visibility when the show button is used
		const toggleShow = useCallback(() => {
			setShow((prev) => !prev);
		}, []);

		// derive the left icon container dimensions from the icon config
		const iconContainerStyle = useMemo(
			() =>
				iconLeft ? { width: iconLeft.size, height: iconLeft.size } : undefined,
			[iconLeft],
		);

		// resolve the left icon stroke color from the theme and icon config
		const iconStrokeColor = useMemo(
			() =>
				iconLeft?.color
					? iconLeft.color
					: theme.current.colors['core-icon-secondary'],
			[iconLeft, theme],
		);

		// derive the clear-button dimensions from the button config
		const clearButtonStyle = useMemo(
			() =>
				clearButton
					? { width: clearButton.size, height: clearButton.size }
					: undefined,
			[clearButton],
		);

		// normalize size and spacing values before applying them as CSS
		const setStyleValue = useCallback((value: string | number | undefined) => {
			if (value === undefined) return 'unset';
			if (typeof value === 'string') return value;
			return `${value}px`;
		}, []);

		// resolve the background color from inline and focus states
		const setBackgroundColor = useMemo(() => {
			if (inline) return 'unset';
			if (isFocused) return backgroundColor.focused ?? 'transparent';
			return backgroundColor.blurred ?? 'transparent';
		}, [inline, isFocused, backgroundColor]);

		// resolve the border color from focus and validation state
		const setBorderColor = useMemo(() => {
			if (borderType === 'none') return 'transparent';
			if (validate && !valid)
				return borderColor.error ?? borderColor.blurred ?? 'transparent';
			if (isFocused)
				return borderColor.focused ?? borderColor.blurred ?? 'transparent';
			return borderColor.blurred ?? 'transparent';
		}, [borderType, valid, isFocused, borderColor, validate]);

		// resolve the border rendering style for box and underline modes
		const setBoxShadow = useMemo(() => {
			if (borderType === 'none') return 'unset';
			if (borderType === 'underline') return `0 1px 0 0 ${setBorderColor}`;
			return `0 0 0 1px ${setBorderColor}`;
		}, [borderType, setBorderColor]);

		// resolve the input text color from validation and focus state
		const textColor = useMemo(() => {
			if (validate && !valid) return color.error ?? 'var(--core-text-primary)';
			if (isFocused) return color.focused ?? 'var(--core-text-primary)';
			return color.blurred ?? 'var(--core-text-primary)';
		}, [isFocused, valid, color, validate]);

		// resolve the text alignment fallback
		const setTextAlign = useMemo(() => {
			return textAlign ?? 'left';
		}, [textAlign]);

		// resolve the show-password control opacity from focus state
		const setShowOpacity = useMemo(() => {
			if (inputType !== 'password') return '0';
			if (isFocused) return '1';
			return '0.5';
		}, [inputType, isFocused]);

		// compose CSS custom properties for layout, color, and interaction states
		const cssVars = useMemo(() => {
			return {
				'--tf-input-width': size.width !== 'unset' && '100%',
				'--tf-field-size': size.width === 'auto' ? 'content' : 'unset',
				'--tf-width': setStyleValue(size.width),
				'--tf-height': setStyleValue(size.height),
				'--tf-padding': setStyleValue(padding),
				'--tf-padding-label-left': label === '' ? 'unset' : '0',
				'--tf-border-radius': setStyleValue(borderRadius),
				'--tf-bg-color': setBackgroundColor,
				'--tf-box-shadow': setBoxShadow,
				'--tf-color': textColor,
				'--tf-label-color': disabled
					? 'var(--core-text-disabled)'
					: color.label,
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
			disabled,
		]);

		/* START.DEBUG */
		useTrackRenders(props, 'TextField');
		/* END.DEBUG */

		return (
			<div
				id={divId}
				className={`${css.wrapper}${divClass}`}
				style={{ ...divStyle, ...cssVars }}
				{...rest}
			>
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
						disabled={!editable || disabled}
						maxLength={maxLength}
					/>
					<AnimatePresence initial={false}>
						{isFocused && clearButton && text !== '' && (
							<motion.button
								type="button"
								aria-label="Clear text"
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
									strokeColor={theme.current.colors['core-icon-secondary']}
								/>
							</motion.button>
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
								<Button
									label={'Translate'}
									variant={'text'}
									size={'text'}
									state={text === '' ? 'disabled' : 'normal'}
									labelColor={theme.current.colors['core-button-primary']}
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
