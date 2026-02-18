import { AnimatePresence, type Transition, motion } from "motion/react";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useTheme } from "styled-components";
import type { DropDownOption } from "../DropDown/DropDown";
import { Icon } from "../Icon/Icon";
import { IconButton } from "../IconButton";
import { UIButton } from "../UIButton";
import * as Styled from "./Styles";

export interface TextFieldProps {
	value?: string;
	name?: string;
	label?: string;
	labelSize?: number;
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
	isValid?: boolean;
	inline?: boolean;
	maxLength?: number;
	size?: { width?: number | string; height?: number | string };
	padding?: string;
	borderRadius?: number | string;
	textAlign?: "left" | "center";
	labelAlignsRight?: boolean;
	borderColor?: { focused: string; blurred: string; error: string };
	backgroundColor?: { focused: string; blurred: string };
	color?: {
		focused: string;
		blurred: string;
		error: string;
		placeholder: string;
		disabled: string;
	};
	iconLeft?: { name?: string; size?: number; color?: string };
	clearButton?: { size?: number } | null;
	clearBlurs?: boolean;
	disabled?: boolean;
	actionButton?: boolean;
	textType?: string;
	inputType?: "text" | "password";
	sendButton?: boolean;
	options?: DropDownOption[];
	noShow?: boolean;
}

// Extract motion config outside component
const MOTION_CONFIG = {
	variants: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	},
	transition: { ease: "easeInOut", duration: 0.25 } as Transition,
};

export const TextField = React.memo(
	(props: TextFieldProps) => {
		const theme = useTheme();
		const {
			name = "input_name",
			value = "",
			label = "",
			labelSize = 15,
			placeholder = "placeholder",
			focused = false,
			onSubmit = () => null,
			onChange = () => null,
			onBlur = () => null,
			onFocus = () => null,
			onKeydown = () => null,
			onAction = () => null,
			onPaste = () => null,
			onClear = () => null,
			actionButton = false,
			maxLength = undefined,
			size = { width: "100%", height: 36 },
			padding = "8px 16px",
			borderRadius = 8,
			editable = true,
			textAlign = "left",
			labelAlignsRight = true,
			isValid = true,
			inline = false,
			noShow = false,
			borderColor = {
				focused: theme.lyraColors["core-button-primary"],
				blurred: "transparent",
				error: theme.lyraColors["feedback-warning"],
			},
			backgroundColor = {
				focused: theme.lyraColors["core-surface-secondary"],
				blurred: theme.lyraColors["core-surface-secondary"],
			},
			color = {
				focused: theme.lyraColors["core-text-primary"],
				blurred: theme.lyraColors["core-text-secondary"],
				error: theme.lyraColors["core-text-primary"],
				placeholder: theme.lyraColors["core-text-disabled"],
				disabled: theme.lyraColors["core-text-disabled"],
			},
			iconLeft = null,
			clearButton = { size: 20 },
			clearBlurs = false,
			disabled = false,
			textType,
			inputType = "text",
		} = props;

		const input = useRef<HTMLInputElement>(null);
		const [text, setText] = useState<string>(value);
		const [isFocused, setIsFocused] = useState<boolean>(focused);
		const [show, setShow] = useState<boolean>(false);

		// Memoize computed styles
		const computedStyles = useMemo(
			() => ({
				borderColor,
				backgroundColor,
				color,
				isValid,
				borderRadius,
				size,
				padding,
				textAlign,
				labelSize,
			}),
			[
				borderColor,
				backgroundColor,
				color,
				isValid,
				borderRadius,
				size,
				padding,
				textAlign,
				labelSize,
			],
		);

		// Combined focus effect (replaces duplicate effects)
		useEffect(() => {
			if (!input.current) return;

			if (focused) {
				input.current.focus();
			} else {
				input.current.blur();
			}
			setIsFocused(focused);
		}, [focused]);

		// Sync value with text state
		useEffect(() => {
			setText(value);
		}, [value]);

		// Memoize handleClearTextField
		const handleClearTextField = useCallback(() => {
			if (input?.current) {
				if (!clearBlurs) input.current.focus();
				setText("");
			}
			onChange("");
			onClear();
		}, [clearBlurs, onChange, onClear]);

		// Memoize handleValueChange
		const handleValueChange = useCallback(
			(newValue: string) => {
				setText(newValue);
				onChange(newValue);
			},
			[onChange],
		);

		// Memoize handleBlur
		const handleBlur = useCallback(() => {
			setIsFocused(false);
			onBlur(text);
		}, [text, onBlur]);

		// Memoize handleKeyDown
		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent) => {
				if (e.key === "Enter") {
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

		// Memoize handleFocus
		const handleFocus = useCallback(() => {
			setIsFocused(true);
			onFocus(text);
		}, [text, onFocus]);

		// Memoize toggleShow
		const toggleShow = useCallback(() => {
			setShow((prev) => !prev);
		}, []);

		// Memoize icon container style
		const iconContainerStyle = useMemo(
			() =>
				iconLeft ? { width: iconLeft.size, height: iconLeft.size } : undefined,
			[iconLeft],
		);

		// Memoize icon stroke color
		const iconStrokeColor = useMemo(
			() =>
				iconLeft?.color
					? iconLeft.color
					: theme.lyraColors["core-icon-secondary"],
			[iconLeft, theme],
		);

		// Memoize clear button style
		const clearButtonStyle = useMemo(
			() =>
				clearButton
					? { width: clearButton.size, height: clearButton.size }
					: undefined,
			[clearButton],
		);

		return (
			<Styled.InputWrapper
				$props={computedStyles}
				$focused={isFocused}
				$isvalid={isValid}
				$inline={inline}
			>
				{label !== "" && (
					<Styled.Label $props={computedStyles}>{label}</Styled.Label>
				)}
				<Styled.InputContainer $padding={padding}>
					{iconLeft && (
						<div style={iconContainerStyle}>
							<Icon
								name={iconLeft.name}
								size={iconLeft.size}
								strokeColor={iconStrokeColor}
							/>
						</div>
					)}
					<Styled.Input
						$textType={textType}
						$props={computedStyles}
						$isvalid={isValid}
						$focused={isFocused}
						$label={label}
						$labelRight={labelAlignsRight}
						ref={input}
						type={inputType === "password" && show ? "text" : inputType}
						name={name}
						aria-label={name}
						autoCapitalize={"none"}
						autoCorrect={"off"}
						autoComplete={"off"}
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
						{clearButton && text !== "" && (
							<motion.div
								style={clearButtonStyle}
								variants={MOTION_CONFIG.variants}
								initial={"initial"}
								animate={"animate"}
								exit={"exit"}
								transition={MOTION_CONFIG.transition}
								onClick={handleClearTextField}
							>
								<Icon
									name={"x"}
									size={clearButton.size}
									strokeColor={theme.lyraColors["core-icon-secondary"]}
								/>
							</motion.div>
						)}
					</AnimatePresence>
					<AnimatePresence initial={false}>
						{actionButton && (
							<motion.div
								variants={MOTION_CONFIG.variants}
								initial={"initial"}
								animate={"animate"}
								exit={"exit"}
								transition={MOTION_CONFIG.transition}
							>
								<UIButton
									label={"Translate"}
									variant={"text"}
									size={"text"}
									state={text === "" ? "disabled" : "normal"}
									labelColor={theme.lyraColors["core-button-primary"]}
									onClick={onAction}
								/>
							</motion.div>
						)}
					</AnimatePresence>
					{inputType === "password" && !noShow && (
						<Styled.ButtonShow $disabled={false} $on={show} $focused={focused}>
							<IconButton
								icon={"view"}
								toggleIcon={true}
								toggle={false}
								isToggled={show}
								iconSize={18}
								frameSize={18}
								onClick={toggleShow}
								tooltip={"Show / Hide"}
								disabled={false}
							/>
						</Styled.ButtonShow>
					)}
				</Styled.InputContainer>
			</Styled.InputWrapper>
		);
	},
	(prevProps, nextProps) => {
		// Custom comparison for expensive props
		return (
			prevProps.value === nextProps.value &&
			prevProps.focused === nextProps.focused &&
			prevProps.isValid === nextProps.isValid &&
			prevProps.disabled === nextProps.disabled
		);
	},
);

TextField.displayName = "TextField";
