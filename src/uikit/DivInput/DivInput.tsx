import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { cleanString } from "../../util/utils";
import * as Styled from "./Styles";
import { InputType } from "./Styles";

export interface DivInputProps {
	onClick?: () => void;
	onDblClick?: () => void;
	onChange?: (value: string | null) => void;
	onSubmit?: (value: string) => void;
	onFocus?: (event: React.FocusEvent<HTMLDivElement>) => void;
	onBlur?: (value: string) => void;
	placeholder?: string;
	value?: string;
	isEditable?: boolean;
	type?: InputType;
	focus?: boolean;
	width?: number | string;
	textAlign?: "left" | "center" | "right";
	clamp?: number;
	fontStyle?: string;
	fontColor?: { active?: string; inactive?: string };
	padding?: string;
}

export const DivInput = React.memo((props: DivInputProps) => {
	const {
		value = "",
		placeholder = "Placeholder",
		isEditable = true,
		type = InputType.DocumentName,
		focus = false,
		width = "auto",
		textAlign = "left",
		clamp = 3,
		fontStyle = undefined,
		padding = "0px",
		onChange = () => null,
		onSubmit = () => null,
		onFocus = () => null,
		onBlur = () => null,
		onDblClick = () => null,
		onClick = () => null,
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const innerText = useRef<string>(
		value === "" ? cleanString(placeholder) : cleanString(value),
	);
	const [isFocused, setIsFocused] = useState(focus);
	const [text, setText] = useState(innerText.current);
	const [isPlaceholder, setIsPlaceholder] = useState<boolean>(false);

	// Memoize setCursor function
	const setCursor = useCallback((to: "start" | "end", length = 1) => {
		if (ref.current) {
			const range = document.createRange();
			range.setStart(ref.current, to === "start" ? 0 : length);
			range.setEnd(ref.current, to === "start" ? 0 : 1);
			const selection = window.getSelection();
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	}, []);

	// Memoize handleSelectAll
	const handleSelectAll = useCallback(() => {
		if (!ref.current?.firstChild) return;
		const range = document.createRange();
		range.selectNode(ref.current.firstChild);
		window.getSelection()?.removeAllRanges();
		window.getSelection()?.addRange(range);
	}, []);

	// Combined effect for related state updates
	useEffect(() => {
		if (!ref.current) return;

		// Set contentEditable
		ref.current.contentEditable = isEditable ? "true" : "false";

		// Handle focus
		if (focus) {
			handleSelectAll();
			ref.current.focus();
		}
		setIsFocused(focus);

		// Update text
		const newText =
			value === "" ? cleanString(placeholder) : cleanString(value);
		innerText.current = newText;
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
		(e: React.FormEvent<HTMLDivElement>) => {
			let textString = "";
			const stripped = e.currentTarget.innerText.replace(/\s+/g, "");
			if (stripped.length === 0 && placeholder && ref.current) {
				ref.current.innerText = placeholder;
				setIsPlaceholder(true);
				setCursor("start");
			} else if (isPlaceholder) {
				const inputEvent = e.nativeEvent as InputEvent;
				textString = inputEvent.data || "";
				innerText.current = textString;
				if (ref.current) {
					ref.current.innerText = textString;
					setCursor("end");
				}
			} else {
				textString = e.currentTarget.innerText;
				innerText.current = cleanString(textString || "");
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
			if (e.key === "Enter" && ref.current) {
				e.preventDefault();
				ref.current.innerHTML = cleanString(innerText.current);
				onChange(null);
				onSubmit(innerText.current);
				ref?.current.blur();
				return true;
			}
			if (e.key === "<" || e.key === ">") {
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
			const pasteText = cleanString(e.clipboardData.getData("text/plain"));
			const selection = window.getSelection();
			if (!selection?.rangeCount) return;
			selection?.deleteFromDocument();
			selection?.getRangeAt(0).insertNode(document.createTextNode(pasteText));
			selection?.collapseToEnd();
			const newText = ref.current?.innerText || "";
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
			if (blurText === "") {
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
			if (isPlaceholder) setTimeout(() => setCursor("start"), 50);
			onClick();
		},
		[isPlaceholder, setCursor, onClick],
	);

	// Memoize wrapper style
	const wrapperStyle = useMemo(() => ({ pointerEvents: "none" as const }), []);
	const inputStyle = useMemo(() => ({ pointerEvents: "all" as const }), []);

	// avoid issues with safari that refocuses editable divs on blur
	// by wrapping it with a pointer events none
	return (
		<div style={wrapperStyle}>
			<Styled.Input
				$clamp={clamp}
				$type={type}
				$isEditable={isEditable}
				$width={width}
				$textAlign={textAlign}
				$isFocused={isFocused}
				$fontStyle={fontStyle}
				$padding={padding}
				$isPlaceholder={isPlaceholder}
				ref={ref}
				style={inputStyle}
				className={"editableDiv"}
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
				{value ? value : placeholder}
			</Styled.Input>
		</div>
	);
});

DivInput.displayName = "DivInput";
