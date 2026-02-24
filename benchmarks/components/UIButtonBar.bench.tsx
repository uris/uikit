import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { UIButtonBar } from '../../src/uikit/UIButtonBar/UIButtonBar';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('UIButtonBar Component Benchmarks', () => {
	const mockButtons = [
		{ label: 'Save', icon: 'check' },
		{ label: 'Cancel', icon: 'close' },
		{ label: 'Delete', icon: 'trash' },
	];

	bench(
		'UIButtonBar - Basic Mount',
		async () => {
			await measureMountTime(<UIButtonBar buttons={mockButtons} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'UIButtonBar - Large Button Count',
		async () => {
			const largeButtons = Array.from({ length: 10 }, (_, i) => ({
				label: `Button ${i}`,
			}));
			await measureMountTime(<UIButtonBar buttons={largeButtons} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'UIButtonBar - Click Event Response',
		async () => {
			await measureEventResponseTime(
				<UIButtonBar buttons={mockButtons} onClick={() => {}} />,
				(container) => {
					const button = container.container.querySelector('button');
					if (button) fireEvent.click(button);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UIButtonBar - State Change (Buttons Update)',
		async () => {
			await measureRerenderTime(
				<UIButtonBar buttons={mockButtons} />,
				(container) => {
					const updatedButtons = [...mockButtons, { label: 'New', icon: 'plus' }];
					container.rerender(<UIButtonBar buttons={updatedButtons} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UIButtonBar - Memory Usage',
		async () => {
			await measureMemoryDelta(<UIButtonBar buttons={mockButtons} />, 10);
		},
		{ iterations: 3 },
	);
});

const mockButtons = [
	{ label: 'Save', icon: 'check' },
	{ label: 'Cancel', icon: 'close' },
	{ label: 'Delete', icon: 'trash' },
];

export const uiButtonBarBenchmarkConfig = {
	componentName: 'UIButtonBar',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () => measureMountTime(<UIButtonBar buttons={mockButtons} />, 50),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<UIButtonBar buttons={mockButtons} />,
					(container) => {
						const updatedButtons = [...mockButtons, { label: 'New', icon: 'plus' }];
						container.rerender(<UIButtonBar buttons={updatedButtons} />);
					},
					50,
				),
		},
		{
			name: 'Event Response',
			type: 'event' as const,
			fn: () =>
				measureEventResponseTime(
					<UIButtonBar buttons={mockButtons} onClick={() => {}} />,
					(container) => {
						const button = container.container.querySelector('button');
						if (button) fireEvent.click(button);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () => measureMemoryDelta(<UIButtonBar buttons={mockButtons} />, 10),
		},
	],
};
