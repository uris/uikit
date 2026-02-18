import { AnimatePresence, type Transition, type Variants } from "motion/react";
import React, { useMemo } from "react";
import * as Styled from "./_Styles";

export interface DotProps {
	size?: number;
	topOffset?: number;
	rightOffset?: number;
	border?: number;
	position?: "inline" | "corner";
	state?: "red" | "yellow" | "green" | "blue" | "grey" | undefined;
	color?: string;
	motion?: Transition;
	motionValues?: Variants;
	show?: boolean;
}

// Extract default variants
const DEFAULT_VARIANTS: Variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

// Extract default transition
const DEFAULT_TRANSITION: Transition = { ease: "easeInOut", duration: 0.5 };

export const Dot = React.memo((props: DotProps) => {
	const {
		size = 8,
		topOffset = 2,
		rightOffset = 2,
		border = 3,
		position = "corner",
		color = undefined,
		motion = undefined,
		motionValues = undefined,
		show = false,
		state = "blue",
	} = props;

	// Memoize style object
	const style = useMemo(
		() => ({
			size,
			topOffset,
			rightOffset,
			border,
			position,
			color,
			state,
		}),
		[size, topOffset, rightOffset, border, position, color, state],
	);

	// Memoize variants
	const variants = useMemo(() => {
		if (motionValues) {
			return { ...DEFAULT_VARIANTS, ...motionValues };
		}
		return DEFAULT_VARIANTS;
	}, [motionValues]);

	// Memoize transition
	const transition = useMemo(() => {
		if (motion) {
			return { ...DEFAULT_TRANSITION, ...motion };
		}
		return DEFAULT_TRANSITION;
	}, [motion]);

	return (
		<AnimatePresence initial={false}>
			{show && (
				<Styled.Dot
					initial={"initial"}
					animate={"animate"}
					exit={"exit"}
					transition={transition}
					variants={variants}
					$props={style}
				>
					<div className="dot" />
				</Styled.Dot>
			)}
		</AnimatePresence>
	);
});
