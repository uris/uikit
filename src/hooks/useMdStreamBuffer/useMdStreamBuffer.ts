import { useCallback, useEffect, useRef, useState } from 'react';
import { MdBuffer } from '../../utils';
import type {
	MarkdownStreamBufferOptions,
	MarkdownStreamBufferSnapshot,
} from '../../utils';

export function useMDStreamBuffer(options?: MarkdownStreamBufferOptions) {
	const bufferRef = useRef<MdBuffer | null>(null);
	const [healthy, setHealthy] = useState<string>('');
	const [raw, setRaw] = useState<string>('');
	const [isComplete, setIsComplete] = useState<boolean>(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: sets up on mount only
	useEffect(() => {
		bufferRef.current = new MdBuffer({
			...options,
			onFlush: (snapshot: MarkdownStreamBufferSnapshot) => {
				const { healthy, raw, isComplete } = snapshot;
				setHealthy(healthy);
				setRaw(raw);
				setIsComplete(isComplete);
			},
		});

		return () => {
			bufferRef.current?.dispose();
			bufferRef.current = null;
		};
	}, []);

	const append = useCallback((value: string) => {
		if (!value) return;
		bufferRef.current?.append(value);
	}, []);

	const flush = useCallback(() => {
		return bufferRef.current?.flush();
	}, []);

	const complete = useCallback(() => {
		return bufferRef.current?.complete();
	}, []);

	const reset = useCallback(() => {
		bufferRef.current?.reset();
		setHealthy('');
		setRaw('');
	}, []);

	return { raw, healthy, isComplete, append, flush, complete, reset };
}
