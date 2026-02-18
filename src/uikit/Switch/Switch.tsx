import type { Transition } from "motion/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import * as Styled from "./_Styles";

export interface SwitchProps {
	state?: boolean;
	height?: number;
	width?: number;
	bgColorOff?: string;
	bgColorOn?: string;
	knobColor?: string;
	padding?: number;
	onChange?: (state: boolean) => void;
}

// Extract static transition config
const TRANSITION: Transition = { ease: "easeInOut", duration: 0.3 };

export const Switch = React.memo((props: SwitchProps) => {
	const theme = useTheme();
	const {
		state = false,
		height = 22,
		width = 44,
		padding = 3,
		bgColorOn = theme.colors["feedback-positive"],
		bgColorOff = theme.colors["core-badge-secondary"],
		knobColor = theme.colors["core-text-light"],
		onChange = () => null,
	} = props;
	const [on, setOn] = useState<boolean>(state);

	// Sync with prop changes
	useEffect(() => {
		setOn(state);
	}, [state]);

	const handleClick = useCallback(() => {
		setOn(!on);
		onChange(!on);
	}, [on, onChange]);

	// Memoize computed knob size
	const knobSize = useMemo(() => height - padding * 2 || 0, [height, padding]);

	// Memoize animation values
	const animateValue = useMemo(
		() => ({ backgroundColor: on ? bgColorOn : bgColorOff }),
		[on, bgColorOn, bgColorOff],
	);

	// Memoize style object
	const wrapperStyle = useMemo(
		() => ({ justifyContent: on ? "flex-end" : "flex-start" }),
		[on],
	);

	// Memoize knob style
	const knobStyle = useMemo(
		() => ({ backgroundColor: knobColor }),
		[knobColor],
	);

	return (
		<Styled.Wrapper
			$height={height}
			$width={width}
			$padding={padding}
			transition={TRANSITION}
			initial={state ? bgColorOn : bgColorOff}
			animate={animateValue}
			style={wrapperStyle}
			onClick={handleClick}
		>
			<Styled.Knob
				layout={true}
				transition={TRANSITION}
				$size={knobSize}
				style={knobStyle}
			/>
		</Styled.Wrapper>
	);
});
