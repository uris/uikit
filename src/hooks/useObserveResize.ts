import { type RefObject, useCallback, useEffect, useState } from 'react';

type Size = {
	height: number;
	width: number;
};

export function useObserveResize(
	element: RefObject<HTMLDivElement | null> | undefined,
	options?: { ignore?: 'width' | 'height' },
) {
	const [size, setSize] = useState<Size>({ width: 0, height: 0 });

	const handleResize = useCallback(
		(entries: ResizeObserverEntry[]) => {
			if (entries[0]) {
				const width = element?.current?.offsetWidth || 0;
				const height = element?.current?.offsetHeight || 0;
				const widthChange = width !== size.width;
				const heightChange = height !== size.height;
				if (options?.ignore === 'width' && !heightChange) return;
				if (options?.ignore === 'height' && !widthChange) return;
				if (size.width !== width || size.height !== height) {
					setSize({ width, height });
				}
			}
		},
		[size, element, options],
	);

	useEffect(() => {
		if (element === undefined) return;
		const el = element.current;
		if (!el) return;

		// Get initial size
		const newWidth = el.offsetWidth || 0;
		const newHeight = el.offsetHeight || 0;

		// set the new size of different to previous
		setSize((prev) => {
			if (prev.width === newWidth && prev.height === newHeight) {
				return prev; // same so no need to trigger re-renders
			}
			return { width: newWidth, height: newHeight };
		});

		// Observe size changes
		const resizeObserver = new ResizeObserver(handleResize);
		resizeObserver.observe(el);

		return () => {
			resizeObserver.unobserve(el);
			resizeObserver.disconnect();
		};
	}, [element, handleResize]);

	return size;
}
