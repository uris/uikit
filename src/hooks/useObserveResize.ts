import { RefObject, useEffect, useState } from 'react';

type Size = {
  height: number;
  width: number;
};

export function useObserveResize(element: RefObject<HTMLDivElement | null>) {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  useEffect(() => {
    if (!element.current) return;
    const resizeObserver = new ResizeObserver(
      (entry: ResizeObserverEntry[]) => {
        setSize({
          width: entry[0].contentRect.width || 0,
          height: entry[0].contentRect.height || 0,
        });
      },
    );
    resizeObserver.observe(element.current);
    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return size;
}
