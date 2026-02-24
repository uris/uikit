import { describe, bench } from 'vitest';
import React from 'react';
import { DocIcon } from '../../src/uikit/DocIcon/DocIcons';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('DocIcon Component Benchmarks', () => {
	bench(
		'DocIcon - Basic Mount',
		async () => {
			await measureMountTime(<DocIcon type="pdf" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'DocIcon - Various Types',
		async () => {
			await measureMountTime(<DocIcon type="doc" size={32} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'DocIcon - State Change (Type Update)',
		async () => {
			await measureRerenderTime(
				<DocIcon type="pdf" />,
				(container) => {
					container.rerender(<DocIcon type="xls" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'DocIcon - Memory Usage',
		async () => {
			await measureMemoryDelta(<DocIcon type="pdf" />, 10);
		},
		{ iterations: 3 },
	);
});

export const docIconBenchmarkConfig = {
	componentName: 'DocIcon',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () => measureMountTime(<DocIcon type="pdf" />, 50),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<DocIcon type="pdf" />,
					(container) => {
						container.rerender(<DocIcon type="xls" />);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () => measureMemoryDelta(<DocIcon type="pdf" />, 10),
		},
	],
};
