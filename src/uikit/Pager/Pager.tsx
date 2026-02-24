import React, { useCallback, useEffect, useMemo, useState } from 'react';
import css from './Pager.module.css';

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
	const {
		size = 8,
		index = 0,
		color = undefined,
		colorHover = undefined,
		colorOn = undefined,
		pages = 2,
		gap = 4,
		onChange = () => null,
	} = props;
	const [selected, setSelected] = useState<number>(index);

	const bullets = useMemo(() => {
		return Array.from({ length: pages }, (_, i) => i);
	}, [pages]);

	useEffect(() => setSelected(index), [index]);

	const handleClick = useCallback(
		(i: number) => {
			setSelected(i);
			onChange(i);
		},
		[onChange],
	);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--pager-gap': `${gap}px`,
			'--pager-size': `${size}px`,
			'--pager-color': color ?? 'var(--core-text-disabled)',
			'--pager-colorOn': colorOn ?? 'var(--core-text-primary)',
			'--pager-colorHover': colorHover ?? 'var(--core-text-disabled)',
		} as React.CSSProperties;
	}, [gap, size, color, colorOn, colorHover]);

	return (
		<div style={cssVars} className={css.wrapper}>
			{bullets.map((bulletId: number) => {
				return (
					<input
						className={`${css.bullet} ${selected === bulletId ? css.selected : ''}`}
						type={'button'}
						key={`paging_bullet_${bulletId}`}
						onClick={() => handleClick(bulletId)}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault(); // Prevent page scrolling on space key
								handleClick(bulletId);
							}
						}}
						onTouchStart={() => handleClick(bulletId)}
						tabIndex={bulletId}
					/>
				);
			})}
		</div>
	);
});
