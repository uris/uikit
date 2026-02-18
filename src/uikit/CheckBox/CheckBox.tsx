import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import { Icon } from "../Icon/Icon";
import * as Styled from "./_Styles";

export interface CheckBoxProps {
	size?: number;
	checked?: "partial" | boolean;
	disabled?: boolean;
	color?: string;
	label?: string;
	onChange?: (state: boolean) => void;
}

export const CheckBox = React.memo((props: CheckBoxProps) => {
	const {
		size = 20,
		checked = false,
		disabled = false,
		color = undefined,
		label = undefined,
		onChange = () => null,
	} = props;
	const theme = useTheme();
	const [state, setState] = useState<"partial" | boolean>(checked);

	useEffect(() => setState(checked), [checked]);

	// Memoize styles object
	const styles = useMemo(
		() => ({
			size,
			disabled,
			checked,
		}),
		[size, disabled, checked],
	);

	// Memoize icon name
	const iconName = useMemo(() => {
		if (state === true) return "checked";
		if (state === "partial") return "partial";
		return "unchecked";
	}, [state]);

	// Memoize icon color
	const iconColor = useMemo(() => {
		if (color) return color;
		if (disabled) return theme.colors["core-icon-disabled"];
		if (state === "partial") return theme.colors["core-icon-primary"];
		if (!state) return theme.colors["core-icon-secondary"];
		return theme.colors["core-gp-logo-primary"];
	}, [color, disabled, state, theme]);

	const handleToggle = useCallback(() => {
		let newState = false;
		switch (state) {
			case true:
				newState = false;
				break;
			case false:
				newState = true;
				break;
			case "partial":
				newState = true;
				break;
		}
		setState(newState);
		onChange(newState);
	}, [state, onChange]);

	return (
		<Styled.CheckBox $props={styles} onClick={handleToggle}>
			<Icon name={iconName} strokeColor={iconColor} />
			{label && <span className="label">{label}</span>}
		</Styled.CheckBox>
	);
});
