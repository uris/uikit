import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTheme } from '../../hooks';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { type ToolTip, ToolTipType } from '../sharedTypes';
import css from './TabBar.module.css';
import type { TabOption } from './_Types';

export const placeholderOptions: TabOption[] = [
	{ name: 'Option 1', value: 'Option 1', icon: null },
	{ name: 'Option 2', value: 'Option 2', icon: 'wallet' },
];

export interface TabBarProps {
	options?: TabOption[];
	selected?: number;
	underline?: boolean;
	border?: boolean;
	selectedValue?: string;
	height?: number | string;
	width?: number | string;
	tabWidth?: 'min-content' | 'distribute' | number;
	closeWidth?: number | string;
	padding?: number | string;
	textStyle?:
		| 'textXLarge'
		| 'textLarge'
		| 'textRegular'
		| 'textMedium'
		| 'textSmall'
		| 'textXSmall'
		| null;
	iconSize?: number;
	iconGap?: number;
	tabGap?: number;
	disabled?: boolean;
	hasClose?: boolean;
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
		underline = true,
		height = '100%',
		width = '100%',
		tabWidth = 'distribute',
		padding = 8,
		textStyle = 'textRegular',
		iconSize = 20,
		iconGap = 8,
		tabGap = 0,
		disabled = false,
		hasClose = false,
		closeWidth = 'auto',
		selectedValue = null,
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
			setIndex(selectedIndex === -1 ? selected : selectedIndex);
		} else {
			setIndex(selected);
		}
	}, [selected, selectedValue, options]);

	// memo handleClick
	const handleClick = useCallback(
		(i: number) => {
			setIndex(i);
			onChange(i);
			onTabChange(options[i]);
		},
		[onChange, onTabChange, options],
	);

	// memo handleOptionClick
	const handleOptionClick = useCallback(
		(i: number) => {
			onToolTip(null);
			handleClick(i);
		},
		[onToolTip, handleClick],
	);

	// memo rendered options
	const renderedOptions = useMemo(
		() =>
			options.map((option: TabOption, i: number) => (
				<Option
					key={`${i}_option_${option.name}`}
					label={option.name}
					value={i}
					showToolTip={option.toolTip}
					selected={i === index}
					padding={padding}
					icon={option.icon}
					iconSize={iconSize}
					iconGap={iconGap}
					disabled={disabled}
					count={option.count}
					onClick={handleOptionClick}
					onToolTip={onToolTip}
					underline={underline}
					tabWidth={tabWidth}
				/>
			)),
		[
			options,
			index,
			padding,
			textStyle,
			iconSize,
			iconGap,
			disabled,
			underline,
			tabWidth,
			onToolTip,
			handleOptionClick,
		],
	);

	const setStyle = useCallback((value: string | number) => {
		if (typeof value === 'string') return value;
		return `${value}px`;
	}, []);

	const cssVars = useMemo(() => {
		return {
			'--tab-bar-gap': `${tabGap}px`,
			'--tab-bar-height': `${setStyle(height)}px`,
			'--tab-bar-width': setStyle(width),
			'--tab-bar-border-bottom': `${border ? '1px' : '0'}`,
			'--tab-bar-close-width': `${closeWidth}px`,
			'--tab-bar-close-padding': padding ? `${padding}px` : '8px',
		} as React.CSSProperties;
	}, [tabGap, height, width, border, setStyle]);

	return (
		<div className={css.wrapper} style={cssVars}>
			{renderedOptions}
			{hasClose && (
				<div className={css.close}>
					<IconButton
						iconSize={iconSize - 4}
						frameSize={iconSize}
						toggle={false}
						hover={true}
						icon={'x'}
						onClick={onClose}
					/>
				</div>
			)}
		</div>
	);
});

TabBar.displayName = 'TabBar';

interface TabOptionProps {
	label?: string;
	value?: number;
	icon?: string | null;
	showToolTip?: string | null;
	selected?: boolean;
	padding?: number | string;
	iconSize?: number;
	iconGap?: number;
	disabled?: boolean;
	count?: number;
	tabWidth?: 'min-content' | 'distribute' | number;
	underline?: boolean;
	onClick?: (value: number) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}

const Option = React.memo(
	(props: TabOptionProps) => {
		const theme = useTheme();
		const {
			label = 'Option',
			value = 0,
			icon = null,
			selected = false,
			onClick = () => null,
			onToolTip = () => null,
			padding = 8,
			iconSize = 20,
			iconGap = 6,
			disabled = false,
			showToolTip = null,
			underline = true,
			tabWidth = 'distribute',
			count = 0,
		} = props;

		const ref = useRef<HTMLDivElement>(null);

		// memo icon color
		const strokeColor = useMemo(() => {
			if (!disabled && selected) return theme.colors['core-button-primary'];
			if (disabled) return theme.colors['core-text-disabled'];
			return theme.colors['core-text-primary'];
		}, [disabled, selected, theme]);

		// memo handleMouseOver
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

		// memo handleMouseLeave
		const handleMouseLeave = useCallback(() => {
			if (showToolTip) onToolTip(null);
		}, [showToolTip, onToolTip]);

		// memo color
		const textColor = useMemo(() => {
			if (disabled) return 'var(--core-text-disabled)';
			if (selected) return 'var(--core-button-primary)';
			return 'var(--core-text-primary)';
		}, [disabled, selected]);

		// memo tab width
		const setTabWidth = useMemo(() => {
			if (tabWidth === 'min-content') return 'min-content';
			if (tabWidth === 'distribute') return 'unset';
			return `${tabWidth}px`;
		}, [tabWidth]);

		// memo flex tab
		const setTabFlex = useMemo(() => {
			if (tabWidth === 'distribute') return '1';
			return 'unset';
		}, [tabWidth]);

		// memo underline
		const setUnderline = useMemo(() => {
			if (selected && underline && !disabled) return '1px';
			return '0';
		}, [underline, disabled, selected]);

		const cssVars = useMemo(() => {
			return {
				'--tab-bar-option-border': setUnderline,
				'--tab-bar-option-padding': `${padding}px`,
				'--tab-bar-option-icon-size': `${iconSize}px`,
				'--tab-bar-option-cursor': disabled ? 'default' : 'pointer',
				'--tab-bar-option-gap': `${iconGap ?? 0}px`,
				'--tab-bar-option-color': textColor,
				'--tab-bar-option-width': setTabWidth,
				'--tab-bar-option-flex': setTabFlex,
			} as React.CSSProperties;
		}, [
			padding,
			iconSize,
			disabled,
			icon,
			textColor,
			selected,
			underline,
			iconGap,
		]);

		return (
			<div
				className={css.option}
				style={cssVars}
				ref={ref}
				role={'option'}
				aria-selected={selected}
				tabIndex={0}
				onMouseEnter={handleMouseOver}
				onMouseLeave={handleMouseLeave}
				onClick={() => onClick(value)}
				onKeyDown={() => onClick(value)}
			>
				{icon && (
					<div className={css.icon}>
						<Icon name={icon} size={iconSize} strokeColor={strokeColor} />
					</div>
				)}
				{label}
				{count !== 0 && (
					<Badge variant={'light'} hideNull={false} count={count} />
				)}
			</div>
		);
	},
	(prevProps, nextProps) => {
		// Custom comparison for performance
		return (
			prevProps.selected === nextProps.selected &&
			prevProps.underline === nextProps.underline &&
			prevProps.tabWidth === nextProps.tabWidth &&
			prevProps.disabled === nextProps.disabled &&
			prevProps.iconGap === nextProps.iconGap &&
			prevProps.iconSize === nextProps.iconSize &&
			prevProps.count === nextProps.count &&
			prevProps.label === nextProps.label &&
			prevProps.icon === nextProps.icon
		);
	},
);

Option.displayName = 'TabOption';
