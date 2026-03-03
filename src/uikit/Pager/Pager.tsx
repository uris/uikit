import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { accessibleKeyDown } from '../../util/utils';
import css from './Pager.module.css';
import type { PagerProps } from './_types';

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
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';
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

	/* START.DEBUG */
	useTrackRenders(props, 'Pager');
	/* END.DEBUG */

	return (
		<div
			id={divId}
			style={{ ...divStyle, ...cssVars }}
			className={`${css.wrapper}${divClass}`}
			{...rest}
		>
			{bullets.map((bulletId: number) => {
				return (
					<input
						className={`${css.bullet} ${selected === bulletId ? css.selected : ''}`}
						type={'button'}
						key={`paging_bullet_${bulletId}`}
						onClick={() => handleClick(bulletId)}
						onKeyDown={(e) => accessibleKeyDown(e, () => handleClick(bulletId))}
						onTouchStart={() => handleClick(bulletId)}
						tabIndex={bulletId}
					/>
				);
			})}
		</div>
	);
});
