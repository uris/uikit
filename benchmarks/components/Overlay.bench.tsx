import { describe, bench } from 'vitest';
import React from 'react';
import { Overlay } from '../../src/uikit/Overlay/Overlay';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('Overlay Component Benchmarks', () => {
	bench(
		'Overlay - Basic Mount',
		async () => {
			await measureMountTime(
				<Overlay show>
					<div>Overlay Content</div>
				</Overlay>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Overlay - With Custom Opacity',
		async () => {
			await measureMountTime(
				<Overlay show opacity={0.8}>
					<div>Overlay Content</div>
				</Overlay>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Overlay - State Change (Show/Hide)',
		async () => {
			await measureRerenderTime(
				<Overlay show={false}>
					<div>Content</div>
				</Overlay>,
				(container) => {
					container.rerender(
						<Overlay show={true}>
							<div>Content</div>
						</Overlay>,
					);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Overlay - Memory Usage',
		async () => {
			await measureMemoryDelta(
				<Overlay show>
					<div>Overlay Content</div>
				</Overlay>,
				10,
			);
		},
		{ iterations: 3 },
	);
});
