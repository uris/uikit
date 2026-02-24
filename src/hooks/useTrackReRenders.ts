import { useEffect, useRef } from 'react';
import { debug } from '../util/utils';

export function useTrackReRenders(props: any, componentName = 'Component') {
	const prev = useRef<
		{ props: any; mount: boolean; unmount: boolean } | undefined
	>({
		props,
		mount: true,
		unmount: false,
	});
	// 5 random letters (uppercase)
	const id = crypto
		.getRandomValues(new Uint8Array(5))
		.reduce((acc, val) => acc + String.fromCodePoint(65 + (val % 26)), '');
	const name = `${componentName} {${id}}`;

	// Track re-renders
	useEffect(() => {
		prev.current = debug(prev, props, name);
	});

	// Track unmount only
	// biome-ignore lint/correctness/useExhaustiveDependencies: track unmount only
	useEffect(() => {
		return () => {
			if (prev.current) {
				prev.current.unmount = true;
				debug(prev, prev, name);
			}
		};
	}, []);
}
