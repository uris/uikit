import { describe, bench } from 'vitest';
import React from 'react';
import { Grouper } from '../../src/uikit/Grouper/Grouper';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('Grouper Component Benchmarks', () => {
	bench(
		'Grouper - Basic Mount',
		async () => {
			await measureMountTime(
				<Grouper>
					<div>Child 1</div>
					<div>Child 2</div>
				</Grouper>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Grouper - With Multiple Children',
		async () => {
			await measureMountTime(
				<Grouper>
					{Array.from({ length: 10 }, (_, i) => (
						<div key={i}>Child {i}</div>
					))}
				</Grouper>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Grouper - State Change (Children Update)',
		async () => {
			await measureRerenderTime(
				<Grouper>
					<div>Child 1</div>
				</Grouper>,
				(container) => {
					container.rerender(
						<Grouper>
							<div>Child 1</div>
							<div>Child 2</div>
						</Grouper>,
					);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Grouper - Memory Usage',
		async () => {
			await measureMemoryDelta(
				<Grouper>
					<div>Child 1</div>
					<div>Child 2</div>
				</Grouper>,
				10,
			);
		},
		{ iterations: 3 },
	);
});

export const grouperBenchmarkConfig = {
	componentName: 'Grouper',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () =>
				measureMountTime(
					<Grouper>
						<div>Child 1</div>
						<div>Child 2</div>
					</Grouper>,
					50,
				),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<Grouper>
						<div>Child 1</div>
					</Grouper>,
					(container) => {
						container.rerender(
							<Grouper>
								<div>Child 1</div>
								<div>Child 2</div>
							</Grouper>,
						);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () =>
				measureMemoryDelta(
					<Grouper>
						<div>Child 1</div>
						<div>Child 2</div>
					</Grouper>,
					10,
				),
		},
	],
};
