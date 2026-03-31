'use client';

import type React from 'react';
import { useCallback, useLayoutEffect, useState } from 'react';
import type { ToolTip } from '../../components/sharedTypes';

const hiddenCoords = { x: 0, y: 0 };

export function useToolTip(
	toolTip: ToolTip | null,
	tipElement: React.RefObject<HTMLDivElement | null>,
) {
	const [coords, setCoords] = useState<{ x: number; y: number } | undefined>(
		hiddenCoords,
	);

	const adjustX = useCallback((x: number) => {
		if (x < 10) return 10;
		const maxWidth = globalThis.innerWidth - 10;
		if (x > maxWidth) {
			const overflow = x - maxWidth;
			return x - overflow;
		}
		return x;
	}, []);

	const adjustY = useCallback(
		(y: number, parentY: number) => {
			if (y < 10) return 10;
			const tipHeight = tipElement.current?.offsetHeight ?? 0;
			const endY = y + tipHeight;
			const maxHeight = globalThis.innerHeight - 10;
			if (endY > maxHeight) {
				return parentY - tipHeight - 10;
			}
			return y;
		},
		[tipElement],
	);

	useLayoutEffect(() => {
		// remove tooltip from view
		if (!toolTip || !tipElement?.current) {
			setCoords(hiddenCoords);
			return;
		}

		// get the target ref
		const target = toolTip.ref?.current;
		if (!target) {
			setCoords(hiddenCoords);
			return;
		}

		// get rectangles for parent and tooltip
		const parentRect = target.getBoundingClientRect();
		const tipRect = tipElement.current.getBoundingClientRect();

		// get position and size details
		const {
			x: parentX,
			y: parentY,
			width: parentWidth,
			height: parentHeight,
		} = parentRect;
		const { width: tipWidth } = tipRect;

		// calculate the tool tip coords suc that it's placed beneath the parent
		const x = parentX + parentWidth / 2 - tipWidth / 2;
		const y = parentY + parentHeight + 10;

		// set the coords
		setCoords({ x: adjustX(x), y: adjustY(y, parentY) });
	}, [toolTip, tipElement, adjustX, adjustY]);

	return coords;
}
