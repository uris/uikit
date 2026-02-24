import { describe, bench } from 'vitest';
import React from 'react';
import { Badge } from '../../src/uikit/Badge/Badge';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('Badge Component Benchmarks', () => {
	bench(
		'Badge - Basic Mount',
		async () => {
			await measureMountTime(<Badge count={5} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Badge - High Count (99+)',
		async () => {
			await measureMountTime(<Badge count={150} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Badge - Light Variant',
		async () => {
			await measureMountTime(<Badge count={10} variant="light" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Badge - String Count',
		async () => {
			await measureMountTime(<Badge count="NEW" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Badge - State Change (Count Update)',
		async () => {
			await measureRerenderTime(
				<Badge count={5} />,
				(container) => {
					container.rerender(<Badge count={99} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Badge - Memory Usage',
		async () => {
			await measureMemoryDelta(<Badge count={42} />, 10);
		},
		{ iterations: 3 },
	);
});
