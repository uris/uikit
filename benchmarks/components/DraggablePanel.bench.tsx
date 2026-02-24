import { describe, bench } from 'vitest';
import React from 'react';
import { DraggablePanel } from '../../src/uikit/DraggablePanel/DrggablePanel';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('DraggablePanel Component Benchmarks', () => {
	bench(
		'DraggablePanel - Basic Mount',
		async () => {
			await measureMountTime(
				<DraggablePanel>
					<div>Panel Content</div>
				</DraggablePanel>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'DraggablePanel - With Custom Size',
		async () => {
			await measureMountTime(
				<DraggablePanel width={400} height={300}>
					<div>Panel Content</div>
				</DraggablePanel>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'DraggablePanel - State Change (Position Update)',
		async () => {
			await measureRerenderTime(
				<DraggablePanel x={0} y={0}>
					<div>Content</div>
				</DraggablePanel>,
				(container) => {
					container.rerender(
						<DraggablePanel x={100} y={100}>
							<div>Content</div>
						</DraggablePanel>,
					);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'DraggablePanel - Memory Usage',
		async () => {
			await measureMemoryDelta(
				<DraggablePanel>
					<div>Panel Content</div>
				</DraggablePanel>,
				10,
			);
		},
		{ iterations: 3 },
	);
});

export const draggablePanelBenchmarkConfig = {
	componentName: 'DraggablePanel',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () =>
				measureMountTime(
					<DraggablePanel>
						<div>Panel Content</div>
					</DraggablePanel>,
					50,
				),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<DraggablePanel x={0} y={0}>
						<div>Content</div>
					</DraggablePanel>,
					(container) => {
						container.rerender(
							<DraggablePanel x={100} y={100}>
								<div>Content</div>
							</DraggablePanel>,
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
					<DraggablePanel>
						<div>Panel Content</div>
					</DraggablePanel>,
					10,
				),
		},
	],
};
