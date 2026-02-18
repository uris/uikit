import { useAnimate } from "motion/react";
import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Badge } from "../Badge/Badge";
import { Icon } from "../Icon/Icon";
import * as Styled from "./_Styles";

export interface GrouperProps {
	title?: string;
	toggle?: boolean;
	open?: boolean;
	hasIcon?: boolean;
	iconName?: string;
	iconSize?: number;
	frameSize?: number;
	border?: number;
	count?: number | string;
	hideNull?: boolean;
	variant?: "group" | "facet";
	showFilterBadge?: boolean;
	unframed?: boolean;
	onChange?: (state: boolean) => void;
	onClick?: () => void;
}

export const Grouper = React.memo((props: GrouperProps) => {
	const {
		title = "Group Title",
		toggle = true,
		open = true,
		hasIcon = true,
		iconName = "chevron down",
		iconSize = 18,
		frameSize = 64,
		border = 0,
		count = 0,
		unframed = false,
		variant = "group",
		hideNull = true,
		showFilterBadge = false,
		onChange = () => null,
		onClick = () => null,
	} = props;
	const theme = useTheme();
	const [state, setState] = useState<boolean>(open);
	const [icon, animateIcon] = useAnimate();

	useEffect(() => setState(open), [open]);

	const animate = useCallback(
		(state: boolean) => {
			const animation = { rotate: state ? 0 : 180 };
			animateIcon(
				icon.current,
				{ ...animation },
				{ ease: "easeInOut", duration: 0.25 },
			);
		},
		[animateIcon, icon],
	);

	const handleToggle = useCallback(() => {
		if (!toggle) return;
		onClick();
		onChange(!state);
		animate(!state);
		setState(!state);
	}, [toggle, onClick, onChange, state, animate]);

	return (
		<Styled.GroupHeader
			$frameSize={frameSize}
			$iconSize={iconSize}
			$border={border}
			$variant={variant}
			$unframed={unframed}
			onClick={handleToggle}
		>
			<div className="content">
				<div className="title">
					{title}
					<Badge hideNull={hideNull} count={count} variant={"light"} />
					{showFilterBadge && (
						<Icon
							name="filter"
							size={16}
							strokeColor={theme.lyraColors["core-text-disabled"]}
						/>
					)}
				</div>
				{hasIcon && (
					<div ref={icon} className="icon">
						<Icon name={iconName} size={iconSize} />
					</div>
				)}
			</div>
		</Styled.GroupHeader>
	);
});
