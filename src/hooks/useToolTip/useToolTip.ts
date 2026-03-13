import type React from 'react';
import { useLayoutEffect, useState } from 'react';
import type { ToolTip } from '../../components/sharedTypes';

const hiddenCoords = { x: 0, y: 0 };

export function useToolTip(
	toolTip: ToolTip | null,
	tipElement: React.RefObject<HTMLDivElement | null>,
) {
	const [coords, setCoords] = useState<{ x: number; y: number } | undefined>(
		hiddenCoords,
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
		setCoords({ x, y });
	}, [toolTip, tipElement]);

	return coords;
}
