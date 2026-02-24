import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { RadioButtonList } from '../../src/uikit/RadioButtonList/RadioButtonList';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('RadioButtonList Component Benchmarks', () => {
	const mockOptions = [
		{ label: 'Option 1', value: '1' },
		{ label: 'Option 2', value: '2' },
		{ label: 'Option 3', value: '3' },
	];

	bench(
		'RadioButtonList - Basic Mount',
		async () => {
			await measureMountTime(<RadioButtonList options={mockOptions} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'RadioButtonList - Large Options List',
		async () => {
			const largeOptions = Array.from({ length: 20 }, (_, i) => ({
				label: `Option ${i}`,
				value: `${i}`,
			}));
			await measureMountTime(<RadioButtonList options={largeOptions} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'RadioButtonList - Click Event Response',
		async () => {
			await measureEventResponseTime(
				<RadioButtonList options={mockOptions} onChange={() => {}} />,
				(container) => {
					const firstRadio = container.container.querySelector('[class*="wrapper"]');
					if (firstRadio) fireEvent.click(firstRadio);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'RadioButtonList - State Change (Selection Update)',
		async () => {
			await measureRerenderTime(
				<RadioButtonList options={mockOptions} selected="1" />,
				(container) => {
					container.rerender(
						<RadioButtonList options={mockOptions} selected="2" />,
					);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'RadioButtonList - Memory Usage',
		async () => {
			await measureMemoryDelta(<RadioButtonList options={mockOptions} />, 10);
		},
		{ iterations: 3 },
	);
});

const mockOptionsConfig = [
	{ label: 'Option 1', value: '1' },
	{ label: 'Option 2', value: '2' },
	{ label: 'Option 3', value: '3' },
];

export const radioButtonListBenchmarkConfig = {
	componentName: 'RadioButtonList',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () => measureMountTime(<RadioButtonList options={mockOptionsConfig} />, 50),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<RadioButtonList options={mockOptionsConfig} selected="1" />,
					(container) => {
						container.rerender(<RadioButtonList options={mockOptionsConfig} selected="2" />);
					},
					50,
				),
		},
		{
			name: 'Event Response',
			type: 'event' as const,
			fn: () =>
				measureEventResponseTime(
					<RadioButtonList options={mockOptionsConfig} onChange={() => {}} />,
					(container) => {
						const firstRadio = container.container.querySelector('[class*="wrapper"]');
						if (firstRadio) fireEvent.click(firstRadio);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () => measureMemoryDelta(<RadioButtonList options={mockOptionsConfig} />, 10),
		},
	],
};
