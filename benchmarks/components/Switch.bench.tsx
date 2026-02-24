import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Switch } from '../../src/uikit/Switch/Switch';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('Switch Component Benchmarks', () => {
	bench(
		'Switch - Basic Mount',
		async () => {
			await measureMountTime(<Switch />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Switch - With Custom Colors',
		async () => {
			await measureMountTime(
				<Switch
					bgColorOn="#00ff00"
					bgColorOff="#cccccc"
					knobColor="#ffffff"
				/>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Switch - Click Event Response',
		async () => {
			await measureEventResponseTime(
				<Switch onChange={() => {}} />,
				(container) => {
					const switchEl = container.container.querySelector('[class*="wrapper"]');
					if (switchEl) fireEvent.click(switchEl);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Switch - State Change (Toggle)',
		async () => {
			await measureRerenderTime(
				<Switch state={false} />,
				(container) => {
					container.rerender(<Switch state={true} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Switch - Memory Usage',
		async () => {
			await measureMemoryDelta(<Switch state />, 10);
		},
		{ iterations: 3 },
	);
});

export const switchBenchmarkConfig = {
	componentName: 'Switch',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () => measureMountTime(<Switch />, 50),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<Switch state={false} />,
					(container) => {
						container.rerender(<Switch state={true} />);
					},
					50,
				),
		},
		{
			name: 'Event Response',
			type: 'event' as const,
			fn: () =>
				measureEventResponseTime(
					<Switch onChange={() => {}} />,
					(container) => {
						const switchEl = container.container.querySelector('[class*="wrapper"]');
						if (switchEl) fireEvent.click(switchEl);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () => measureMemoryDelta(<Switch state />, 10),
		},
	],
};
