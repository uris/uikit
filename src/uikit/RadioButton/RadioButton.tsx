import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { IconButton } from "../IconButton";
import * as Styled from "./Styles";

export type RadioButtonOption = {
	fieldName?: string;
	title?: string;
	description?: string;
	state?: boolean;
	icon?: string;
};

export interface RadioButtonProps {
	selected?: boolean;
	option: RadioButtonOption;
	deslect?: boolean;
	tabIndex?: number;
	checkBox?: boolean;
	wrap?: boolean;
	sizeToFit?: boolean;
	hideRadio?: boolean;
	flex?: string | number | null;
	toggleIcon?: boolean;
	iconColor?: string;
	noFrame?: boolean;
	onChange?: (option: RadioButtonOption, state: boolean) => void;
	onMore?: (option: RadioButtonOption, state: boolean) => void;
}

export const RadioButton = React.memo((props: RadioButtonProps) => {
	const theme = useTheme();
	const {
		option,
		selected = false,
		deslect = false,
		tabIndex = 1,
		wrap = false,
		sizeToFit = false,
		hideRadio = false,
		toggleIcon = true,
		noFrame = false,
		flex,
		onChange = () => null,
	} = props;
	const [isSelected, setIsSelected] = useState<boolean>(selected);

	useEffect(() => setIsSelected(selected), [selected]);

	const handleChange = useCallback(
		(checked?: boolean) => {
			if (isSelected && !deslect) return;
			if (checked !== undefined) setIsSelected(checked);
			else setIsSelected(!isSelected);
			onChange(option, !isSelected);
		},
		[isSelected, deslect, onChange, option],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.code === "Space") {
				e.preventDefault();
				e.stopPropagation();
				handleChange();
			}
		},
		[handleChange],
	);

	// Memoize icon color
	const iconColor = useMemo(
		() =>
			toggleIcon && isSelected
				? theme.lyraColors["core-button-primary"]
				: theme.lyraColors["core-icon-primary"],
		[toggleIcon, isSelected, theme],
	);

	// Memoize icon name
	const iconName = useMemo(
		() => (toggleIcon && isSelected ? "checked" : "unchecked"),
		[toggleIcon, isSelected],
	);

	return (
		<Styled.Wrapper
			$wrap={wrap}
			$sizeToFit={sizeToFit}
			$offset={3}
			$selected={isSelected}
			$noImage={!option.icon}
			$hideRadio={hideRadio}
			$flex={flex}
			$noFrame={noFrame}
			onClick={() => handleChange(isSelected)}
			onKeyDown={handleKeyDown}
			tabIndex={tabIndex}
			// biome-ignore lint/a11y/useSemanticElements: Custom radio button component with complex styling - using div with proper ARIA attributes
			role={"radio"}
			aria-label={option.title}
		>
			{option.icon && (
				<div className="radio-icon">
					<IconButton toggle={false} icon={iconName} color={iconColor} />
				</div>
			)}
			<div className="radio-content noselect">
				<div className="radio-title">{option.title}</div>
				{option.description && option.description !== "" && (
					<div className="radio-summary">{option.description}</div>
				)}
			</div>
		</Styled.Wrapper>
	);
});
