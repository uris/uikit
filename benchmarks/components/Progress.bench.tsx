import { describe, bench } from 'vitest';
import React from 'react';
import { Progress } from '../../src/uikit/Progress/Progress';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('Progress Component Benchmarks', () => {
	bench(
		'Progress - Basic Mount',
		async () => {
			await measureMountTime(<Progress value={50} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Progress - With Custom Colors',
		async () => {
			await measureMountTime(
				<Progress value={75} color="#00ff00" bgColor="#cccccc" />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Progress - State Change (Value Update)',
		async () => {
			await measureRerenderTime(
				<Progress value={25} />,
				(container) => {
					container.rerender(<Progress value={75} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Progress - Memory Usage',
		async () => {
			await measureMemoryDelta(<Progress value={50} />, 10);
		},
		{ iterations: 3 },
	);
});
