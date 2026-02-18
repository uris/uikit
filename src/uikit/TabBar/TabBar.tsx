import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useTheme } from "styled-components";
import { Badge } from "../Badge/Badge";
import { Icon } from "../Icon/Icon";
import { IconButton } from "../IconButton";
import { type ToolTip, ToolTipType } from "../sharedTypes";
import * as Styled from "./Styles";
import type { TabOption } from "./_Types";

export const placeholderOptions: TabOption[] = [
	{ name: "Option 1", value: "Option 1", icon: null },
	{ name: "Option 2", value: "Option 2", icon: "check" },
];

export interface TabBarProps {
	options?: TabOption[];
	selected?: number;
	border?: boolean;
	selectedValue?: string;
	height?: number | string;
	width?: number | string;
	closeWidth?: number | string;
	padding?: number | string;
	textStyle?:
		| "textXLarge"
		| "textLarge"
		| "textRegular"
		| "textMedium"
		| "textSmall"
		| "textXSmall"
		| null;
	iconSize?: number;
	iconGap?: number;
	tabGap?: number;
	dragsApp?: boolean;
	disabled?: boolean;
	hasClose?: boolean;
	state?: string;
	size?: number;
	onToolTip?: (tip: ToolTip | null) => void;
	onChange?: (index: number) => void;
	onTabChange?: (option: TabOption) => void;
	onClose?: () => void;
}

export const TabBar = React.memo((props: TabBarProps) => {
	const {
		options = placeholderOptions,
		selected = 0,
		border = true,
		height = "100%",
		width = "100%",
		padding = 8,
		textStyle = "textRegular",
		iconSize = 20,
		iconGap = 4,
		tabGap = 0,
		dragsApp = false,
		disabled = false,
		hasClose = false,
		closeWidth = "auto",
		selectedValue = null,
		state = undefined,
		size = 1,
		onChange = () => null,
		onTabChange = () => null,
		onClose = () => null,
		onToolTip = () => null,
	} = props;

	const [index, setIndex] = useState<number>(selected);

	useEffect(() => {
		let selectedIndex = 0;
		if (selectedValue && options) {
			selectedIndex = options.findIndex(
				(option) => option.value === selectedValue,
			);
			setIndex(selectedIndex !== -1 ? selectedIndex : selected);
		} else {
			setIndex(selected);
		}
	}, [selected, selectedValue, options]);

	// Memoize handleClick
	const handleClick = useCallback(
		(i: number) => {
			setIndex(i);
			onChange(i);
			onTabChange(options[i]);
		},
		[onChange, onTabChange, options],
	);

	// Memoize handleOptionClick
	const handleOptionClick = useCallback(
		(i: number) => {
			onToolTip(null);
			handleClick(i);
		},
		[onToolTip, handleClick],
	);

	// Memoize rendered options
	const renderedOptions = useMemo(
		() =>
			options.map((option: TabOption, i: number) => (
				<Option
					key={`${i}_option_${option.name}`}
					label={option.name}
					value={i}
					showToolTip={option.toolTip}
					selected={i === index}
					onClick={handleOptionClick}
					padding={padding}
					textStyle={textStyle}
					icon={option.icon}
					iconSize={iconSize}
					iconGap={iconGap}
					dragsApp={dragsApp}
					disabled={disabled}
					state={state}
					size={size}
					count={option.count}
					onToolTip={onToolTip}
				/>
			)),
		[
			options,
			index,
			handleOptionClick,
			padding,
			textStyle,
			iconSize,
			iconGap,
			dragsApp,
			disabled,
			state,
			size,
			onToolTip,
		],
	);

	return (
		<Styled.Wrapper
			$height={height}
			$width={width}
			$border={border}
			$gap={tabGap}
		>
			{renderedOptions}
			{hasClose && (
				<Styled.CloseButton
					$padding={padding}
					onClick={onClose}
					$closeWidth={closeWidth}
				>
					<IconButton
						iconSize={iconSize - 4}
						frameSize={iconSize}
						toggle={false}
						hover={true}
						icon={"x"}
						onClick={onClose}
					/>
				</Styled.CloseButton>
			)}
		</Styled.Wrapper>
	);
});

TabBar.displayName = "TabBar";

interface TabOptionProps {
	label?: string;
	value?: number;
	icon?: string | null;
	showToolTip?: string | null;
	selected?: boolean;
	padding?: number | string;
	textStyle?:
		| "textXLarge"
		| "textLarge"
		| "textRegular"
		| "textMedium"
		| "textSmall"
		| "textXSmall"
		| null;
	iconSize?: number;
	iconGap?: number;
	dragsApp?: boolean;
	disabled?: boolean;
	size?: number;
	count?: number;
	state?: string;
	toolTipTimer?: React.RefObject<any>;
	onClick?: (value: number) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}

// Custom hook for drag functionality
function useDragWindow(
	dragsApp: boolean,
	disabled: boolean,
	onClick: (value: number) => void,
	value: number,
) {
	const doDrag = useRef<boolean | null>(null);
	const xStart = useRef<number | null>(null);
	const yStart = useRef<number | null>(null);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			doDrag.current = true;
			if (dragsApp && xStart.current !== null && yStart.current !== null) {
				const win: any = window;
				const x = e.clientX - xStart.current;
				const y = e.clientY - yStart.current;
				win.electronAPI?.appDrag({ x, y });
			}
		},
		[dragsApp],
	);

	const handleMouseUp = useCallback(() => {
		if (doDrag.current !== true || !dragsApp) {
			if (!disabled) onClick(value);
		}
		doDrag.current = null;
		xStart.current = null;
		yStart.current = null;
		const docEl = document.documentElement;
		docEl?.removeEventListener("mousemove", handleMouseMove, false);
		docEl?.removeEventListener("mouseup", handleMouseUp, false);
	}, [disabled, dragsApp, handleMouseMove, onClick, value]);

	const handleMouseDown = useCallback(
		(e: MouseEvent) => {
			doDrag.current = null;
			xStart.current = e.clientX;
			yStart.current = e.clientY;
			const docEl = document.documentElement;
			docEl?.addEventListener("mousemove", handleMouseMove, false);
			docEl?.addEventListener("mouseup", handleMouseUp, false);
		},
		[handleMouseMove, handleMouseUp],
	);

	const resetDrag = useCallback(() => {
		doDrag.current = null;
	}, []);

	return { handleMouseDown, resetDrag };
}

const Option = React.memo(
	(props: TabOptionProps) => {
		const theme = useTheme();
		const {
			label = "Option",
			value = 0,
			icon = null,
			selected = false,
			onClick = () => null,
			onToolTip = () => null,
			padding = 8,
			iconSize = 24,
			iconGap = 6,
			dragsApp = false,
			textStyle = "textRegular",
			disabled = false,
			showToolTip = null,
			state = null,
			size = 1,
			count = 0,
		} = props;

		const ref = useRef<HTMLDivElement>(null);
		const { handleMouseDown, resetDrag } = useDragWindow(
			dragsApp,
			disabled,
			onClick,
			value,
		);

		// Setup event listener with proper cleanup
		useEffect(() => {
			const el = ref.current;
			if (!el) return;

			el.addEventListener("mousedown", handleMouseDown, false);

			return () => {
				el.removeEventListener("mousedown", handleMouseDown, false);
				// Cleanup any pending mousemove/mouseup listeners
				const docEl = document.documentElement;
				docEl?.removeEventListener("mousemove", handleMouseDown, false);
				docEl?.removeEventListener("mouseup", handleMouseDown, false);
			};
		}, [handleMouseDown]);

		// Memoize icon color
		const strokeColor = useMemo(() => {
			if (!disabled && selected) return theme.lyraColors["core-button-primary"];
			return theme.lyraColors["core-text-primary"];
		}, [disabled, selected, theme]);

		// Memoize handleMouseOver
		const handleMouseOver = useCallback(
			(e: React.MouseEvent) => {
				onToolTip(null);
				if (showToolTip && ref.current) {
					const tip: ToolTip = {
						type: ToolTipType.button,
						payload: { label: showToolTip },
						event: e,
						ref,
					};
					onToolTip(tip);
				}
			},
			[showToolTip, onToolTip],
		);

		// Memoize handleMouseLeave
		const handleMouseLeave = useCallback(() => {
			if (showToolTip) onToolTip(null);
		}, [showToolTip, onToolTip]);

		// Memoize text style
		const computedTextStyle = useMemo(
			() => textStyle || theme.lyraType["body-l-regular"],
			[textStyle, theme],
		);

		return (
			<Styled.Option
				ref={ref}
				$padding={padding}
				$selected={disabled ? false : selected}
				$disabled={disabled}
				$textStyle={computedTextStyle}
				$gap={iconGap}
				$size={size}
				$iconSize={iconSize}
				className={"noDrag"}
				onMouseEnter={handleMouseOver}
				onMouseLeave={handleMouseLeave}
				onMouseDown={resetDrag}
				onMouseUp={resetDrag}
			>
				{icon && (
					<div className="icon">
						<Icon name={icon} size={iconSize} strokeColor={strokeColor} />
					</div>
				)}
				{label}
				{count !== 0 && (
					<Badge variant={"light"} hideNull={false} count={count} />
				)}
			</Styled.Option>
		);
	},
	(prevProps, nextProps) => {
		// Custom comparison for performance
		return (
			prevProps.selected === nextProps.selected &&
			prevProps.disabled === nextProps.disabled &&
			prevProps.count === nextProps.count &&
			prevProps.label === nextProps.label &&
			prevProps.icon === nextProps.icon
		);
	},
);

Option.displayName = "TabOption";
