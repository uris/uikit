import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import { RadioButton, type RadioButtonOption } from '../RadioButton';
import css from './RadioButtonList.module.css';
import type { RadioButtonListProps } from './_types';

export const RadioButtonList = React.memo((props: RadioButtonListProps) => {
	const {
		options = [],
		selectedIndexes = null,
		selectedOptions = null,
		label = null,
		deselect = false,
		multiSelect = false,
		wrap = false,
		tabIndexSeed = 0,
		spacer = 'none',
		custom = 0,
		gap = 16,
		hideRadio = false,
		noFrame = false,
		toggleIcon = true,
		iconColor = undefined,
		iconSelectedColor = undefined,
		onChange = () => null,
	} = props;

	// internal array of selected indexes
	const [selected, setSelected] = useState<number[] | null>(selectedIndexes);

	// update indexes selected based on prop
	useEffect(() => setSelected(selectedIndexes), [selectedIndexes]);

	// update indexes selected if setting selections via field name / values
	useEffect(() => {
		if (!selectedOptions || !options) return;
		const selections: number[] = [];
		for (const item of selectedOptions) {
			for (let i = 0; i < options.length; i++) {
				const option = options[i];
				if (option.fieldName === item) selections.push(i);
			}
		}
		setSelected(selections);
	}, [selectedOptions, options]);

	// returns if a specific option index is selected
	const isSelected = useCallback(
		(index: number): boolean => {
			if (!selected) return false;
			return selected.includes(index);
		},
		[selected],
	);

	const doMultiSelection = useCallback(
		(selection: number, state: boolean) => {
			// **** update the selected indexes
			let indexesSelected: number[] = selected ? [...selected] : [];
			// if deselecting and there are selections
			if (!state && selected) {
				const removeAt = indexesSelected.indexOf(selection);
				indexesSelected.splice(removeAt, 1);
			} else if (state) {
				indexesSelected = selected ? [...selected] : [];
				const exists = indexesSelected.includes(selection);
				if (!exists) indexesSelected.push(selection);
			}
			// **** create an array of selected options
			let updatedSelections: RadioButtonOption[] | null = [];
			for (const index of indexesSelected || []) {
				if (updatedSelections) updatedSelections.push(options[index]);
			}
			if (updatedSelections.length < 1) updatedSelections = null;
			setSelected(indexesSelected || null);
			onChange(updatedSelections, indexesSelected || null);
		},
		[selected, options, onChange],
	);

	const doSingleSelection = useCallback(
		(selection: number, state: boolean) => {
			onChange(state ? [options[selection]] : [], state ? [selection] : []);
			setSelected(state ? [selection] : null);
		},
		[options, onChange],
	);

	const handleChange = useCallback(
		(selection: number, state: boolean) => {
			// it not multiselect just pass the current selection
			if (multiSelect) {
				doMultiSelection(selection, state);
			} else {
				doSingleSelection(selection, state);
			}
		},
		[multiSelect, doMultiSelection, doSingleSelection],
	);

	const renderedOptions = useMemo(() => {
		return options.map((option: RadioButtonOption, i: number) => {
			return (
				<RadioButton
					option={option}
					selected={isSelected(i)}
					key={`${option.fieldName}_${i}`}
					deselect={deselect}
					wrap={wrap}
					noFrame={noFrame}
					hideRadio={hideRadio}
					onChange={(_option, state) => handleChange(i, state)}
					tabIndex={i + 1 + 100 * tabIndexSeed}
					toggleIcon={toggleIcon}
					iconColor={isSelected(i) ? iconSelectedColor : iconColor}
				/>
			);
		});
	}, [
		options,
		isSelected,
		deselect,
		wrap,
		noFrame,
		hideRadio,
		handleChange,
		tabIndexSeed,
		toggleIcon,
		iconColor,
		iconSelectedColor,
	]);

	// memo margin
	const margin = useMemo(() => {
		if (spacer === 'none') return 0;
		if (spacer === 'custom') return custom;
		return 0;
	}, [spacer, custom]);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--rb-list-flex-wrap': wrap ? 'wrap' : 'nowrap',
			'--rb-list-margin-bottom': noFrame ? 0 : `${margin}px`,
			'--rb-gap': `${gap}px`,
		} as React.CSSProperties;
	}, [wrap, margin, gap, noFrame]);

	/* START.DEBUG */
	useTrackRenders(props, 'Radio Button List');
	/* END.DEBUG */

	return (
		<div
			className={`${css.wrapper} ${noFrame ? css.column : css.row}`}
			style={cssVars}
		>
			{label}
			{renderedOptions}
		</div>
	);
});
