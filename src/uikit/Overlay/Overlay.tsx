import { AnimatePresence } from "motion/react";
import React, { useCallback, useMemo } from "react";
import * as Styled from "./Styles";

export interface OverlayProps {
	opacity?: number;
	color?: string;
	type?: "clear" | "dark";
	global?: boolean;
	overlay?: any;
	onClick?: () => void;
	toggleOverlay?: (state: boolean) => void;
}

export const Overlay = React.memo((props: OverlayProps) => {
	const {
		onClick = () => null,
		toggleOverlay = () => null,
		opacity = 0,
		color = "#00000010",
		type = "clear",
		global = false,
		overlay,
	} = props;

	const show = !global || (global && overlay);

	// Memoize computed opacity value
	const computedOpacity = useMemo(() => {
		if (type === "clear") return 0;
		if (opacity) return opacity;
		if (type === "dark") return 0.8;
		return 0;
	}, [type, opacity]);

	const handleClick = useCallback(() => {
		if (global) toggleOverlay(false);
		onClick();
	}, [global, toggleOverlay, onClick]);

	const handleContextMenu = useCallback((e: React.MouseEvent) => {
		e.preventDefault();
	}, []);

	return (
		<AnimatePresence initial={false}>
			{show && (
				<Styled.Overlay
					initial={{ opacity: 0 }}
					animate={{ opacity: computedOpacity }}
					exit={{ opacity: 0 }}
					$opacity={computedOpacity}
					$color={color}
					onClick={handleClick}
					onContextMenu={handleContextMenu}
				/>
			)}
		</AnimatePresence>
	);
});
