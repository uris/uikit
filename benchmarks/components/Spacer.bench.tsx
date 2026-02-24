import { describe, bench } from 'vitest';
import React from 'react';
import { Spacer } from '../../src/uikit/Spacer/Spacer';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('Spacer Component Benchmarks', () => {
	bench(
		'Spacer - Basic Mount',
		async () => {
			await measureMountTime(<Spacer />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Spacer - With Custom Size',
		async () => {
			await measureMountTime(<Spacer size={20} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Spacer - State Change (Size Update)',
		async () => {
			await measureRerenderTime(
				<Spacer size={10} />,
				(container) => {
					container.rerender(<Spacer size={30} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Spacer - Memory Usage',
		async () => {
			await measureMemoryDelta(<Spacer size={20} />, 10);
		},
		{ iterations: 3 },
	);
});
