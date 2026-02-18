import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
	RadioButton,
	type RadioButtonOption,
} from "../RadioButton/RadioButton";
import * as Styled from "./Styles";

export interface RadioButtonListProps {
	options?: RadioButtonOption[];
	selectedIndexes?: number[] | null;
	selectedOptions?: string[] | null;
	showDescription?: boolean;
	label?: string | null;
	deselect?: boolean;
	multiSelect?: boolean;
	wrap?: boolean;
	sizeToFit?: boolean;
	spacer?: "xl" | "lg" | "md" | "sm" | "custom" | "none";
	custom?: number;
	gap?: number;
	offset?: number;
	tabIndexSeed?: number;
	hideRadio?: boolean;
	flex?: string | number | null;
	toggleIcon?: boolean;
	iconColor?: string;
	iconSelectedColor?: string;
	noFrame?: boolean;
	onChange?: (
		options: RadioButtonOption[] | null,
		indexes: number[] | null,
	) => void;
	onMore?: (option: RadioButtonOption, index: number) => void;
}

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
		sizeToFit = false,
		spacer = "none",
		custom = 0,
		gap = 16,
		hideRadio = false,
		flex,
		noFrame = false,
		toggleIcon = true,
		iconColor = undefined,
		iconSelectedColor = undefined,
		onChange = () => null,
		onMore = () => null,
	} = props;

	// internal array of sleected indexes
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
	function isSelected(index: number): boolean {
		if (!selected) return false;
		const exists = selected.indexOf(index) !== -1;
		return exists;
	}

	function handleChange(selection: number, state: boolean) {
		// it not multiselect just pass the current selection
		if (!multiSelect) {
			onChange(state ? [options[selection]] : [], state ? [selection] : []);
			setSelected(state ? [selection] : null);
		} else {
			// **** update the selected indexes
			let indexesSelected: number[] = selected ? [...selected] : [];
			// if deslecting and there are selections
			if (!state && selected) {
				const removeAt = indexesSelected.indexOf(selection);
				indexesSelected.splice(removeAt, 1);
			} else if (state) {
				indexesSelected = selected ? [...selected] : [];
				const exists = indexesSelected.indexOf(selection) !== -1;
				if (!exists) indexesSelected.push(selection);
			}
			// **** create array of selected options
			let updatedSelections: RadioButtonOption[] | null = [];
			for (const index of indexesSelected || []) {
				if (updatedSelections) updatedSelections.push(options[index]);
			}
			if (updatedSelections.length < 1) updatedSelections = null;
			setSelected(indexesSelected || null);
			onChange(updatedSelections, indexesSelected || null);
		}
	}

	// for clicks on the more option if present
	function handleMore(index: number) {
		onMore(options[index], index);
	}

	function setOptions() {
		return options.map((option: RadioButtonOption, i: number) => {
			return (
				<RadioButton
					option={option}
					selected={isSelected(i)}
					key={`${option.fieldName}_${i}`}
					deslect={deselect}
					checkBox={multiSelect}
					wrap={wrap}
					flex={flex}
					noFrame={noFrame}
					sizeToFit={sizeToFit}
					hideRadio={hideRadio}
					onChange={(_option, state) => handleChange(i, state)}
					onMore={() => handleMore(i)}
					tabIndex={i + 1 + 100 * tabIndexSeed}
					toggleIcon={toggleIcon}
					iconColor={isSelected(i) ? iconSelectedColor : iconColor}
				/>
			);
		});
	}

	const margin = () => {
		if (spacer === "none") return 0;
		if (spacer === "custom") return custom;
		return 0;
	};

	return (
		<Styled.Wrapper
			$wrap={wrap}
			$margin={margin()}
			$gap={gap}
			$noFrame={noFrame}
			role={"radiogroup"}
			aria-label={label ? label : "grouped selection"}
		>
			{label}
			{setOptions()}
		</Styled.Wrapper>
	);
});
