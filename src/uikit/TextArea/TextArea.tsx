import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { ProgressIndicator } from "../Progress";
import { UIButton } from "../UIButton";
import { UIChip } from "../UIChip";
import * as Styled from "./Styles";

export interface TextAreaProps {
	value?: string;
	name?: string;
	width?: number | string;
	minWidth?: number | string;
	height?: number | string;
	rows?: number;
	focused?: boolean;
	placeholder?: string;
	spacer?: "xl" | "lg" | "md" | "sm" | "custom" | "none";
	custom?: number;
	padding?: string;
	validate?: boolean;
	dark?: boolean;
	resizable?: boolean;
	hasSend?: boolean;
	sendOffset?: { bottom: number; right: number };
	sendSize?: number;
	sendColors?: { normal?: string; active?: string; disabled?: string };
	bgColor?: string;
	border?: boolean;
	returnSubmits?: boolean;
	showTips?: boolean;
	tips?: Tip[];
	textSize?: "s" | "m" | "l";
	showProgress?: boolean;
	disabled?: boolean;
	submitClears?: boolean;
	onChange?: (value: string) => void;
	onSubmit?: (vakue: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onValidate?: (state: boolean) => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	onAction?: (action: Tip) => void;
}

export type Tip = {
	icon?: string;
	iconRight?: boolean;
	key: string;
	label?: string;
};

export const TextArea = React.memo((props: TextAreaProps) => {
	const {
		value = "",
		name = "text_area",
		width = "100%",
		height = "auto",
		focused = false,
		spacer = "none",
		custom = 0,
		placeholder = "",
		rows = 6,
		dark = true,
		padding = "16px 4px 16px 16px",
		validate = true,
		resizable = true,
		hasSend = false,
		sendOffset = { bottom: 6, right: 6 },
		sendSize = 36,
		returnSubmits = false,
		bgColor = undefined,
		border = undefined,
		minWidth = undefined,
		tips = [],
		textSize = "m",
		showProgress = false,
		disabled = false,
		submitClears = true,
		onChange = () => null,
		onFocus = () => null,
		onBlur = () => null,
		onValidate = () => null,
		onSubmit = () => null,
		onKeyDown = () => null,
		onAction = () => null,
	} = props;
	const theme = useTheme();

	const [isFocused, setIsFocused] = useState<boolean>(focused);
	const [invalid, setInvalid] = useState<boolean>(false);
	const [text, setText] = useState<string>(value);
	const [initiated, setInitiated] = useState<boolean>(false);
	const ref = useRef<HTMLTextAreaElement>(null);

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

	// update value on text entry or prop change
	useEffect(() => {
		if (text !== value) {
			setText(value);
			setInvalid(runValidation(value));
		}
	}, [value, text, runValidation]);

	const margin = useCallback(() => {
		if (spacer === "none") return 0;
		if (spacer === "custom") return custom;
		return 0;
	}, [spacer, custom]);

	const handleResize = useCallback(() => {
		if (!ref || !ref.current) return;
		ref.current.style.height = "auto";
		ref.current.style.height = `${ref.current.scrollHeight}px`;
	}, []);

	const handleChange = useCallback(
		(content: string) => {
			onChange(content);
			setText(content);
			setInvalid(runValidation(content));
		},
		[onChange, runValidation],
	);

	const handleFocus = useCallback(() => {
		if (ref?.current) ref.current.focus();
		setInitiated(true);
		setIsFocused(true);
		onFocus();
	}, [onFocus]);

	const handleBlur = useCallback(
		(content: any) => {
			handleChange(content);
			setIsFocused(false);
			onBlur();
		},
		[handleChange, onBlur],
	);

	const handleSubmit = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
			e?.preventDefault();
			handleFocus();
			onSubmit(text);
			if (submitClears) setText("");
			if (ref?.current) ref.current.value = "";
			handleResize();
		},
		[handleFocus, onSubmit, text, submitClears, handleResize],
	);

	const handleKeyDownWrapper = useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (returnSubmits && e.key === "Enter") {
				e.preventDefault();
				e.stopPropagation();
				handleSubmit(undefined);
			}
			onKeyDown(e);
		},
		[returnSubmits, handleSubmit, onKeyDown],
	);

	const handleAction = useCallback(
		(
			e:
				| React.MouseEvent<HTMLDivElement>
				| React.KeyboardEvent<HTMLSpanElement>
				| undefined,
			action: Tip,
		) => {
			console.log("action");
			e?.preventDefault();
			e?.stopPropagation();
			onAction(action);
			ref.current?.focus();
			setIsFocused(true);
		},
		[onAction],
	);

	return (
		<Styled.Wrapper
			$width={width}
			$minWidth={minWidth}
			$height={height}
			$invalid={invalid}
			$padding={padding}
			$focused={isFocused}
			$margin={margin()}
			$resize={resizable}
			$dark={dark}
			$bgColor={bgColor}
			$border={border}
			$textSize={textSize}
			onBlur={() => handleBlur(text)}
			onFocus={() => handleFocus()}
		>
			{hasSend && (
				<Styled.Send
					$offset={sendOffset}
					$size={sendSize}
					onMouseDown={(e) => handleSubmit(e)}
				>
					<UIButton
						iconLeft={"arrow up"}
						size={"medium"}
						variant={"solid"}
						round
					/>
				</Styled.Send>
			)}
			<textarea
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
			{tips.length > 0 && (
				<div className="actions">
					{!showProgress &&
						tips.map((action: Tip, index: number) => {
							return (
								<div
									className="option"
									key={`${action.key}-${action.label}-${index}`}
								>
									<UIChip
										variant={"small"}
										onMouseDown={(e) => handleAction(e, action)}
										icon={action.icon}
										iconRight={action.iconRight}
										label={action.key}
										background={theme.colors["core-surface-primary"]}
									/>
									{action.label}
								</div>
							);
						})}
					{showProgress && <ProgressIndicator show inline />}
				</div>
			)}
		</Styled.Wrapper>
	);
});
