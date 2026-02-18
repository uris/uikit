import React, { useMemo } from "react";
import * as Styled from "./_Styles";

export interface BadgeProps {
	count?: number | string;
	hideNull?: boolean;
	variant?: "light" | "dark";
}

export const Badge = React.memo((props: BadgeProps) => {
	const { count = 0, variant = "dark", hideNull = true } = props;

	// Memoize display count
	const displayCount = useMemo(() => {
		if (typeof count === "number" && count > 99) return "99+";
		return count.toString();
	}, [count]);

	if (!count || (hideNull && count === 0)) return null;

	return <Styled.Badge $variant={variant}>{displayCount}</Styled.Badge>;
});
