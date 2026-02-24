import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { TabBar } from '../../src/uikit/TabBar/TabBar';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('TabBar Component Benchmarks', () => {
	const mockTabs = [
		{ label: 'Tab 1', value: '1' },
		{ label: 'Tab 2', value: '2' },
		{ label: 'Tab 3', value: '3' },
	];

	bench(
		'TabBar - Basic Mount',
		async () => {
			await measureMountTime(<TabBar tabs={mockTabs} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'TabBar - Large Tab Count',
		async () => {
			const largeTabs = Array.from({ length: 15 }, (_, i) => ({
				label: `Tab ${i}`,
				value: `${i}`,
			}));
			await measureMountTime(<TabBar tabs={largeTabs} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'TabBar - Click Event Response',
		async () => {
			await measureEventResponseTime(
				<TabBar tabs={mockTabs} onChange={() => {}} />,
				(container) => {
					const tab = container.container.querySelector('[role="tab"]');
					if (tab) fireEvent.click(tab);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'TabBar - State Change (Active Tab Update)',
		async () => {
			await measureRerenderTime(
				<TabBar tabs={mockTabs} active="1" />,
				(container) => {
					container.rerender(<TabBar tabs={mockTabs} active="2" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'TabBar - Memory Usage',
		async () => {
			await measureMemoryDelta(<TabBar tabs={mockTabs} />, 10);
		},
		{ iterations: 3 },
	);
});

const mockTabsConfig = [
	{ label: 'Tab 1', value: '1' },
	{ label: 'Tab 2', value: '2' },
	{ label: 'Tab 3', value: '3' },
];

export const tabBarBenchmarkConfig = {
	componentName: 'TabBar',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () => measureMountTime(<TabBar tabs={mockTabsConfig} />, 50),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<TabBar tabs={mockTabsConfig} active="1" />,
					(container) => {
						container.rerender(<TabBar tabs={mockTabsConfig} active="2" />);
					},
					50,
				),
		},
		{
			name: 'Event Response',
			type: 'event' as const,
			fn: () =>
				measureEventResponseTime(
					<TabBar tabs={mockTabsConfig} onChange={() => {}} />,
					(container) => {
						const tab = container.container.querySelector('[role="tab"]');
						if (tab) fireEvent.click(tab);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () => measureMemoryDelta(<TabBar tabs={mockTabsConfig} />, 10),
		},
	],
};
