import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { UIChip } from '../../src/uikit/UIChip/UIChip';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('UIChip Component Benchmarks', () => {
	bench(
		'UIChip - Basic Mount',
		async () => {
			await measureMountTime(<UIChip label="Chip" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'UIChip - With Icon and Close',
		async () => {
			await measureMountTime(
				<UIChip label="Chip" icon="check" closeable />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UIChip - Click Event Response',
		async () => {
			await measureEventResponseTime(
				<UIChip label="Chip" onClick={() => {}} />,
				(container) => {
					const chip = container.container.querySelector('[class*="chip"]');
					if (chip) fireEvent.click(chip);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UIChip - State Change (Label Update)',
		async () => {
			await measureRerenderTime(
				<UIChip label="Initial" />,
				(container) => {
					container.rerender(<UIChip label="Updated" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UIChip - Memory Usage',
		async () => {
			await measureMemoryDelta(<UIChip label="Chip" icon="check" />, 10);
		},
		{ iterations: 3 },
	);
});

export const uiChipBenchmarkConfig = {
	componentName: 'UIChip',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () => measureMountTime(<UIChip label="Chip" />, 50),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<UIChip label="Initial" />,
					(container) => {
						container.rerender(<UIChip label="Updated" />);
					},
					50,
				),
		},
		{
			name: 'Event Response',
			type: 'event' as const,
			fn: () =>
				measureEventResponseTime(
					<UIChip label="Chip" onClick={() => {}} />,
					(container) => {
						const chip = container.container.querySelector('[class*="chip"]');
						if (chip) fireEvent.click(chip);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () => measureMemoryDelta(<UIChip label="Chip" icon="check" />, 10),
		},
	],
};
