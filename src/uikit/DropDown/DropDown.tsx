import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTheme } from '../../hooks';
import { Icon } from '../Icon';
import css from './DropDown.module.css';
import type { DropDownOption, DropDownProps } from './_types';

export const DropDown = React.memo((props: DropDownProps) => {
	const theme = useTheme();
	const {
		name = 'Select',
		width = '100%',
		height = 'auto',
		selectedIndex = 0,
		selectedValue = '',
		options = [],
		placeholder = true,
		validate = true,
		borderRadius = 4,
		bgColor = 'transparent',
		iconColor = theme.colors['core-icon-primary'],
		paddingLeft = '8px',
		paddingRight = '12px',
		paddingTops = '8px',
		iconSize = 20,
		disabled = false,
		unframed = false,
		focused = false,
		gap = 0,
		size = 'medium',
		onChange = () => null,
		onValidate = () => null,
		onFocus = () => null,
		onBlur = () => null,
	} = props;

	const [index, setIndex] = useState<number>(selectedIndex);
	const [selectedText, setSelectedText] = useState<string>('Select an option');
	const [initiated, setInitiated] = useState<boolean>(false);
	const [color, setColor] = useState<string>(iconColor);
	const ref = useRef<HTMLSelectElement>(null);

	useEffect(() => setColor(theme.colors['core-icon-primary']), [theme]);

	// validate selection and if there's a placeholder
	// with a validate flag, set error state and event error
	useEffect(() => {
		let valid = true;
		if (validate && placeholder && index === 0) valid = false;
		if (!initiated) valid = true;
		onValidate(valid);
	}, [index, validate, placeholder, initiated, onValidate]);

	// set focus
	useEffect(() => {
		if (focused && ref?.current) {
			setInitiated(true);
			ref.current.click();
		}
	}, [focused]);

	// set selected by index
	useEffect(() => {
		if (ref?.current) {
			if (!options?.[selectedIndex]) return;
			const label = options[selectedIndex].label || 'Select an option';
			setIndex(selectedIndex);
			setSelectedText(label);
			ref.current.selectedIndex = selectedIndex;
		}
	}, [selectedIndex, options]);

	// set selected by value - FIXED: potential infinite loop
	useEffect(() => {
		if (!options || options.length === 0 || selectedValue === '') return;

		const foundIndex = options.findIndex(
			(option) =>
				option?.value?.toLowerCase() ===
					selectedValue.toString().toLowerCase() ||
				option?.label?.toLowerCase() ===
					selectedValue.toString().toLowerCase() ||
				option?.alt?.toLowerCase() === selectedValue.toString().toLowerCase(),
		);

		if (foundIndex !== -1) {
			const label = options[foundIndex].label || 'Select an option';
			setSelectedText(label);
			setIndex(foundIndex);
			if (ref.current) ref.current.selectedIndex = foundIndex;
		}
	}, [selectedValue, options]);

	// memo on change
	const handleChange = useCallback(
		(i: number) => {
			if (!options) return;
			const label = options[i].label || 'Select an option';
			setIndex(i);
			setSelectedText(label);
			if (index !== i) onChange(i, options[i]);
			onBlur(options[i].label || '');
		},
		[options, index, onChange, onBlur],
	);

	// memo focus
	const handleFocus = useCallback(() => {
		setInitiated(true);
		onFocus();
	}, [onFocus]);

	// Memoize renderOptions
	const renderedOptions = useMemo(() => {
		if (!options) return null;
		return options.map((option: DropDownOption, i: number) => (
			<option
				key={`${option?.value}_${i}`}
				value={option?.value}
				onMouseUp={() => handleChange(i)}
			>
				{option?.label}
			</option>
		));
	}, [options, handleChange]);

	// Memoize displayed text
	const displayText = useMemo(
		() => selectedText.replace('-- ', ''),
		[selectedText],
	);

	// Memoize handleMouseDown
	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLSelectElement>) => {
			if (disabled) e.preventDefault();
			handleFocus();
		},
		[disabled, handleFocus],
	);

	// Memoize onChange handler
	const handleSelectChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			handleChange(e.target.selectedIndex);
		},
		[handleChange],
	);

	const getSize = useCallback((value: string | number) => {
		if (typeof value === 'string') return value;
		return `${value}px`;
	}, []);

	const cssVars = useMemo(() => {
		return {
			'--dd-gap': `${gap}px`,
			'--dd-height': `${getSize(height)}`,
			'--dd-width': `${getSize(width)}`,
			'--dd-margin': '8px',
			'--dd-border-radius': borderRadius ? `${borderRadius}px` : '4px',
			'--dd-box-shadow-size': unframed ? '0' : '1px',
			'--dd-border-color': unframed
				? 'transparent'
				: 'var(--core-outline-primary)',
			'--dd-bg-color': bgColor ?? 'transparent',
			'--dd-padding-left': unframed ? '0' : `${getSize(paddingLeft)}`,
			'--dd-padding-right': unframed ? '0' : `${getSize(paddingRight)}`,
			'--dd-padding-tops': unframed ? '0' : `${getSize(paddingTops)}`,
			'--dd-icon-size': `${iconSize}px`,
			'--dd-color':
				placeholder && index === 0
					? 'var(--core-text-tertiary)'
					: 'var(--core-text-primary)',
		} as React.CSSProperties;
	}, [
		gap,
		height,
		width,
		borderRadius,
		bgColor,
		paddingLeft,
		paddingRight,
		paddingTops,
		unframed,
		placeholder,
		iconSize,
		index,
		getSize,
	]);

	return (
		<div className={css.wrapper} style={cssVars}>
			<div className={`${css.face} ${css[size]}`}>{displayText}</div>
			<div className={css.chevron}>
				<Icon name="chevron down" size={iconSize} strokeColor={color} />
			</div>
			<select
				className={css.select}
				defaultValue={index}
				ref={ref}
				onFocus={handleFocus}
				onMouseDown={handleMouseDown}
				onChange={handleSelectChange}
				aria-label={name}
			>
				{renderedOptions}
			</select>
		</div>
	);
});

DropDown.displayName = 'DropDown';
