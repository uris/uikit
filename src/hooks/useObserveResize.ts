import { type RefObject, useCallback, useEffect, useState } from 'react';

type Size = {
	height: number;
	width: number;
};

export function useObserveResize(
	element: RefObject<HTMLDivElement | null> | undefined,
) {
	const [size, setSize] = useState<Size>({ width: 0, height: 0 });

	const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
		if (entries[0]) {
			setSize({
				width: entries[0].contentRect.width || 0,
				height: entries[0].contentRect.height || 0,
			});
		}
	}, []);

	useEffect(() => {
		if (element === undefined) return;
		const el = element.current;
		if (!el) return;

		// Get initial size
		const rect = el.getBoundingClientRect();
		setSize({
			width: rect.width || 0,
			height: rect.height || 0,
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
