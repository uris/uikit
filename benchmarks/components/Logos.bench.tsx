import { describe, bench } from 'vitest';
import React from 'react';
import { Logos } from '../../src/uikit/Logos/Logos';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('Logos Component Benchmarks', () => {
	bench(
		'Logos - Basic Mount',
		async () => {
			await measureMountTime(<Logos type="default" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Logos - With Custom Size',
		async () => {
			await measureMountTime(<Logos type="default" size={64} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Logos - State Change (Type Update)',
		async () => {
			await measureRerenderTime(
				<Logos type="default" />,
				(container) => {
					container.rerender(<Logos type="alternate" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Logos - Memory Usage',
		async () => {
			await measureMemoryDelta(<Logos type="default" />, 10);
		},
		{ iterations: 3 },
	);
});
