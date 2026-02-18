import React, { useCallback } from "react";
import * as Styled from "./_Styles";

export interface UILabelProps {
	label?: string;
	state?:
		| "red"
		| "yellow"
		| "green"
		| "blue"
		| "grey"
		| "lightgrey"
		| "white"
		| undefined;
	noFill?: boolean;
	round?: boolean;
	button?: boolean;
	onClick?: (e: React.MouseEvent<any>) => void;
}

export const UILabel = React.memo((props: UILabelProps) => {
	const {
		label,
		state,
		noFill = false,
		button = false,
		round = false,
		onClick = () => null,
	} = props;
	const handleClick = useCallback(
		(e: React.MouseEvent<any>) => {
			if (button) onClick(e);
		},
		[button, onClick],
	);

	return (
		<Styled.Label
			$fill={!noFill}
			$button={button}
			$round={round}
			onClick={handleClick}
		>
			<div className={`status-label ${state}`}>{label}</div>
		</Styled.Label>
	);
});
