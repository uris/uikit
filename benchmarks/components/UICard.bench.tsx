import { describe, bench } from 'vitest';
import React from 'react';
import { UICard } from '../../src/uikit/UICard/UICard';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('UICard Component Benchmarks', () => {
	bench(
		'UICard - Basic Mount',
		async () => {
			await measureMountTime(
				<UICard>
					<div>Card Content</div>
				</UICard>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UICard - With Title and Footer',
		async () => {
			await measureMountTime(
				<UICard title="Card Title" footer={<div>Footer</div>}>
					<div>Card Content</div>
				</UICard>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UICard - State Change (Content Update)',
		async () => {
			await measureRerenderTime(
				<UICard>
					<div>Initial Content</div>
				</UICard>,
				(container) => {
					container.rerender(
						<UICard>
							<div>Updated Content</div>
						</UICard>,
					);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UICard - Memory Usage',
		async () => {
			await measureMemoryDelta(
				<UICard title="Test">
					<div>Content</div>
				</UICard>,
				10,
			);
		},
		{ iterations: 3 },
	);
});
