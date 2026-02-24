import { describe, bench } from 'vitest';
import React from 'react';
import { ProgressIndicator } from '../../src/uikit/Progress/ProgressIndicator/ProgressIndicator';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('ProgressIndicator Component Benchmarks', () => {
	bench(
		'ProgressIndicator - Basic Mount',
		async () => {
			await measureMountTime(<Progress value={50} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Progress - With Custom Colors',
		async () => {
			await measureMountTime(
				<ProgressIndicator size={20} color="#00ff00" />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Progress - State Change (Value Update)',
		async () => {
			await measureRerenderTime(
				<ProgressIndicator size={20} />,
				(container) => {
					container.rerender(<ProgressIndicator size={64} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Progress - Memory Usage',
		async () => {
			await measureMemoryDelta(<ProgressIndicator size={20} />, 10);
		},
		{ iterations: 3 },
	);
});

export const progressBenchmarkConfig = {
	componentName: 'Progress',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () => measureMountTime(<ProgressIndicator size={20} />, 50),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<ProgressIndicator value={20} />,
					(container) => {
						container.rerender(<ProgressIndicator size={64} />);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () => measureMemoryDelta(<ProgressIndicator size={20} />, 10),
		},
	],
};
