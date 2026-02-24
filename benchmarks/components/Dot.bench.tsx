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
			await measureMountTime(<Dot />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Dot - With Custom Size and Color',
		async () => {
			await measureMountTime(<Dot size={12} color="#ff0000" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Dot - State Change (Color Update)',
		async () => {
			await measureRerenderTime(
				<Dot color="#ff0000" />,
				(container) => {
					container.rerender(<Dot color="#00ff00" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Dot - Memory Usage',
		async () => {
			await measureMemoryDelta(<Dot size={10} />, 10);
		},
		{ iterations: 3 },
	);
});
