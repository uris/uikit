import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTheme } from '../../hooks';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { Icon } from '../Icon';
import css from './DropDown.module.css';
import type { DropDownOption, DropDownProps } from './_types';

export type { DropDownOption };

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
		iconColor = theme.current.colors['core-icon-primary'],
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
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';

	const [index, setIndex] = useState<number>(selectedIndex);
	const [selectedText, setSelectedText] = useState<string>('Select an option');
	const [initiated, setInitiated] = useState<boolean>(false);
	const [color, setColor] = useState<string>(iconColor);
	const ref = useRef<HTMLSelectElement>(null);

	// keep the chevron color aligned with the active theme
	useEffect(() => setColor(theme.current.colors['core-icon-primary']), [theme]);

	// validate the current selection once the field has been interacted with
	useEffect(() => {
		let valid = true;
		if (validate && placeholder && index === 0) valid = false;
		if (!initiated) valid = true;
		onValidate(valid);
	}, [index, validate, placeholder, initiated, onValidate]);

	// trigger the native select interaction when focus is requested externally
	useEffect(() => {
		if (focused && ref?.current) {
			setInitiated(true);
			ref.current.click();
		}
	}, [focused]);

	// sync the selected option from the controlled index prop
	useEffect(() => {
		if (ref?.current) {
			if (!options?.[selectedIndex]) return;
			const label = options[selectedIndex].label || 'Select an option';
			setIndex(selectedIndex);
			setSelectedText(label);
			ref.current.selectedIndex = selectedIndex;
		}
	}, [selectedIndex, options]);

	// sync the selected option from the controlled value prop
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

	// update local selection state and notify consumers when the option changes
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

	// mark the field as initiated and notify focus listeners
	const handleFocus = useCallback(() => {
		setInitiated(true);
		onFocus();
	}, [onFocus]);

	// derive the rendered option elements from the options list
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

	// resolve the display label shown in the custom face element
	const displayText = useMemo(
		() => selectedText.replace('-- ', ''),
		[selectedText],
	);

	// block interaction when disabled and otherwise treat pointer down as focus
	const handleMouseDown = useCallback(
		(e: React.MouseEvent<HTMLSelectElement>) => {
			if (disabled) e.preventDefault();
			handleFocus();
		},
		[disabled, handleFocus],
	);

	// forward native select changes through the shared change handler
	const handleSelectChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			handleChange(e.target.selectedIndex);
		},
		[handleChange],
	);

	// normalize width and height values before applying them as CSS
	const getSize = useCallback((value: string | number) => {
		if (typeof value === 'string') return value;
		return `${value}px`;
	}, []);

	// compose CSS custom properties for layout, spacing, and visual state
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

	/* START.DEBUG */
	useTrackRenders(props, 'DropDown');
	/* END.DEBUG */

	return (
		<div
			id={divId}
			className={`${css.wrapper}${divClass}`}
			style={{ ...divStyle, ...cssVars }}
			{...rest}
		>
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
