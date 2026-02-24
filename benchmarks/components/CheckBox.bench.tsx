import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { CheckBox } from '../../src/uikit/CheckBox/CheckBox';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('CheckBox Component Benchmarks', () => {
	bench(
		'CheckBox - Basic Mount',
		async () => {
			await measureMountTime(<CheckBox />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'CheckBox - With Label',
		async () => {
			await measureMountTime(<CheckBox label="Accept Terms" checked />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'CheckBox - Partial State',
		async () => {
			await measureMountTime(<CheckBox checked="partial" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'CheckBox - Click Event Response',
		async () => {
			await measureEventResponseTime(
				<CheckBox onChange={() => {}} />,
				(container) => {
					const checkbox = container.container.querySelector('[class*="wrapper"]');
					if (checkbox) fireEvent.click(checkbox);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'CheckBox - State Change (Toggle)',
		async () => {
			await measureRerenderTime(
				<CheckBox checked={false} />,
				(container) => {
					container.rerender(<CheckBox checked={true} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'CheckBox - Memory Usage',
		async () => {
			await measureMemoryDelta(<CheckBox label="Test" checked />, 10);
		},
		{ iterations: 3 },
	);
});

export const checkBoxBenchmarkConfig = {
	componentName: 'CheckBox',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () => measureMountTime(<CheckBox />, 50),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<CheckBox checked={false} />,
					(container) => {
						container.rerender(<CheckBox checked={true} />);
					},
					50,
				),
		},
		{
			name: 'Event Response',
			type: 'event' as const,
			fn: () =>
				measureEventResponseTime(
					<CheckBox onChange={() => {}} />,
					(container) => {
						const checkbox = container.container.querySelector('[class*="wrapper"]');
						if (checkbox) fireEvent.click(checkbox);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () => measureMemoryDelta(<CheckBox label="Test" checked />, 10),
		},
	],
};
