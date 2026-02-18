import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import * as Styled from "./_Styles";

export interface PagerProps {
	size?: number;
	index?: number;
	color?: string;
	colorOn?: string;
	colorHover?: string;
	pages?: number;
	gap?: number;
	onChange?: (index: number) => void;
}

export const Pager = React.memo((props: PagerProps) => {
	const theme = useTheme();
	const {
		size = 8,
		index = 0,
		color = theme.colors["core-badge-secondary"],
		colorHover = theme.colors["core-badge-secondary"],
		colorOn = theme.colors["core-text-secondary"],
		pages = 2,
		gap = 4,
		onChange = () => null,
	} = props;
	const [selected, setSelected] = useState<number>(index);
	const [bullets, setBullets] = useState<number[]>([]);
	const styles = useMemo(
		() => ({ size, color, colorOn, colorHover, gap }),
		[size, color, colorOn, colorHover, gap],
	);

	useEffect(() => {
		const items = Array.from({ length: pages }, (_, i) => i);
		setBullets(items);
	}, [pages]);
	useEffect(() => setSelected(index), [index]);

	const handleClick = useCallback(
		(i: number) => {
			setSelected(i);
			onChange(i);
		},
		[onChange],
	);

	return (
		<Styled.Wrapper $styles={styles}>
			{bullets.map((bulletId: number) => {
				return (
					<div
						key={`paging_bullet_${bulletId}`}
						className={`bullet ${selected === bulletId ? "selected" : ""}`}
						onClick={() => handleClick(bulletId)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault(); // Prevent page scrolling on space key
								handleClick(bulletId);
							}
						}}
						onTouchStart={() => handleClick(bulletId)}
						role={"button"}
						tabIndex={bulletId}
					/>
				);
			})}
		</Styled.Wrapper>
	);
});
