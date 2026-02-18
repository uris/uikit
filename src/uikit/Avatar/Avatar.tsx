import type { Transition, Variants } from "motion/react";
import React, { useCallback, useMemo, useRef } from "react";
import { useTheme } from "styled-components";
import { type ToolTip, ToolTipType } from "../sharedTypes";
import * as Styled from "./_Styles";

export interface AvatarProps {
	size?: number;
	frame?: number;
	first?: string;
	last?: string;
	image?: string;
	border?: number;
	color?: string;
	borderColor?: string;
	bgColor?: string;
	variants?: Variants;
	transition?: Transition;
	initial?: string;
	animate?: string;
	exit?: string;
	firstOnly?: boolean;
	onToolTip?: (tip: ToolTip | null) => void;
}

export const Avatar = React.memo((props: AvatarProps) => {
	const theme = useTheme();
	const {
		first = "",
		last = "",
		image = "",
		border = 0,
		color = theme.colors["core-text-primary"],
		borderColor = theme.colors["core-surface-primary"],
		bgColor = undefined,
		transition = undefined,
		animate = undefined,
		initial = undefined,
		exit = undefined,
		firstOnly = false,
		onToolTip = () => null,
	} = props;
	const { size = 34, frame = 34 } = props;

	// Memoize initials computation
	const initials = useMemo(
		() => `${first?.charAt(0)}${firstOnly ? "" : last.charAt(0)}`,
		[first, last, firstOnly],
	);

	const ref = useRef<HTMLDivElement>(null);

	const onMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const tip: ToolTip = {
				type: ToolTipType.button,
				payload: { label: first },
				event: e,
				ref,
			};
			onToolTip(tip);
		},
		[first, onToolTip],
	);

	const onMouseLeave = useCallback(() => {
		onToolTip(null);
	}, [onToolTip]);

	// Memoize display content
	const displayContent = useMemo(
		() => (firstOnly || !image ? initials : null),
		[firstOnly, image, initials],
	);

	return (
		<Styled.Avatar
			$size={size}
			$frame={frame}
			$image={firstOnly ? "" : image}
			$border={border}
			$borderColor={borderColor}
			$bgColor={bgColor}
			$color={color}
			transition={transition}
			initial={initial}
			animate={animate}
			exit={exit}
			ref={ref}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div className="user">{displayContent}</div>
		</Styled.Avatar>
	);
});
