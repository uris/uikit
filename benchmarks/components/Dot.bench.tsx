import { describe, bench } from 'vitest';
import React from 'react';
import { Dot } from '../../src/uikit/Dot/Dot';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('Dot Component Benchmarks', () => {
	bench(
		'Dot - Basic Mount',
		async () => {
			await measureMountTime(<Dot size={10} state={"blue"} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Dot - With Custom Size and Color',
		async () => {
			await measureMountTime(<Dot size={24} state={"blue"} color={"#000000"} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Dot - State Change (Color Update)',
		async () => {
			await measureRerenderTime(
				<Dot size={10} state={"blue"} />,
				(container) => {
					container.rerender(<Dot state={"green"} size={20} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Dot - Memory Usage',
		async () => {
			await measureMemoryDelta(<Dot size={10} state={"blue"} />, 10);
		},
		{ iterations: 3 },
	);
});

export const dotBenchmarkConfig = {
	componentName: 'Dot',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () => measureMountTime(<Dot size={10} state={"blue"} />, 50),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<Dot size={10} state={"blue"} />,
					(container) => {
						container.rerender(<Dot size={10} state={"green"} />);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () => measureMemoryDelta(<Dot size={10} state={"green"} />, 10),
		},
	],
};
