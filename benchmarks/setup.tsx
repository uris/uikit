import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock motion/react for performance testing
// This prevents animation overhead from skewing results
vi.mock('motion/react', async () => {
	const actual = await vi.importActual('motion/react');
	return {
		...actual,
		motion: new Proxy(
			{},
			{
				get: (_target, prop: string) => {
					// Return a basic div wrapper for motion components
					const Component = ({ children, ...props }: any) => {
						return <div {...props}>{children}</div>;
					};
					Component.displayName = `motion.${prop}`;
					return Component;
				},
			},
		),
	};
});

// Disable render debug hook during benchmarks so timings focus on component behavior.
vi.mock('../src/hooks/useTrackRenders', () => ({
	useTrackRenders: () => {},
}));

// Setup global performance marks
global.performance.mark = global.performance.mark || (() => {});
global.performance.measure =
	global.performance.measure ||
	(() => ({ duration: 0, name: '', entryType: 'measure', startTime: 0 }));
global.performance.clearMarks = global.performance.clearMarks || (() => {});
global.performance.clearMeasures =
	global.performance.clearMeasures || (() => {});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	takeRecords() {
		return [];
	}
	unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
	constructor() {}
	disconnect() {}
	observe() {}
	unobserve() {}
} as any;
