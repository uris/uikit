import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IconButton } from "../IconButton";
import css from "./RadioButton.module.css";
import {useTheme} from "../../hooks";

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
	deselect?: boolean;
	tabIndex?: number;
	wrap?: boolean;
	list?: boolean;
	hideRadio?: boolean;
	toggleIcon?: boolean;
	iconColor?: string;
	noFrame?: boolean;
	onChange?: (option: RadioButtonOption, state: boolean) => void;
}

export const RadioButton = React.memo((props: RadioButtonProps) => {
	const theme = useTheme();
	const {
		option,
		selected = false,
		deselect = true,
		tabIndex = 1,
		wrap = false,
		list = false,
		hideRadio = false,
		toggleIcon = true,
		noFrame = false,
		iconColor,
		onChange = () => null,
	} = props;
	const [isSelected, setIsSelected] = useState<boolean>(selected);

	useEffect(() => setIsSelected(selected), [selected]);

	const handleChange = useCallback(
		() => {
			if (isSelected && !deselect) return;
			else setIsSelected(!isSelected);
			onChange(option, !isSelected);
		},
		[isSelected, deselect, onChange, option],
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

	// memo icon color
	const setIconColor = useMemo(()=>{
		if(iconColor) return iconColor;
		return toggleIcon && isSelected
			? theme.colors["core-button-primary"]
			: theme.colors["core-icon-primary"]
		
	},[iconColor, toggleIcon, isSelected, theme])

	// memo icon name
	const iconName = useMemo(
		() => (toggleIcon && isSelected ? "checked" : "unchecked"),
		[toggleIcon, isSelected],
	);
	
	// memo flex
	const setFlex = useMemo(()=>{
		if(list) return "unset"
		return wrap ? "40%" : "1"
	},[list, wrap])
	
	// memo css vars
	const cssVars = useMemo(()=>{
		return {
			"--rb-max-width": wrap ? "50%" : "100%",
			"--rb-flex": setFlex,
			"--rb-padding": noFrame ? "0" : "8px 16px 8px 10px",
			"--rb-bg": isSelected ? "var(--core-surface-secondary)" : "transparent",
		} as React.CSSProperties
	},[setFlex, isSelected, wrap, noFrame])
	

	return (
		<div
			className={css.wrapper}
			style={cssVars}
			onClick={handleChange}
			onKeyDown={handleKeyDown}
			tabIndex={tabIndex}
			role={"option"}
			aria-label={option.title}
			aria-selected={isSelected}
		>
			{option.icon && !hideRadio && (
				<div className={css.radioIcon}>
					<IconButton toggle={false} icon={iconName} color={setIconColor} frameSize={20} iconSize={20} />
				</div>
			)}
			<div className={css.radioContent}>
				<div className={css.radioTitle}>{option.title}</div>
				{option.description && option.description !== "" && (
					<div className={css.radioSummary}>{option.description}</div>
				)}
			</div>
		</div>
	);
});
