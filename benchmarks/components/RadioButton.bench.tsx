import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { RadioButton } from '../../src/uikit/RadioButton/RadioButton';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('RadioButton Component Benchmarks', () => {
	bench(
		'RadioButton - Basic Mount',
		async () => {
			await measureMountTime(<RadioButton label="Option 1" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'RadioButton - With Selection',
		async () => {
			await measureMountTime(
				<RadioButton label="Option 1" selected={true} />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'RadioButton - Click Event Response',
		async () => {
			await measureEventResponseTime(
				<RadioButton label="Option" onChange={() => {}} />,
				(container) => {
					const radio = container.container.querySelector('[class*="wrapper"]');
					if (radio) fireEvent.click(radio);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'RadioButton - State Change (Selection Toggle)',
		async () => {
			await measureRerenderTime(
				<RadioButton label="Option" selected={false} />,
				(container) => {
					container.rerender(<RadioButton label="Option" selected={true} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'RadioButton - Memory Usage',
		async () => {
			await measureMemoryDelta(<RadioButton label="Option 1" />, 10);
		},
		{ iterations: 3 },
	);
});

export const radioButtonBenchmarkConfig = {
	componentName: 'RadioButton',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () => measureMountTime(<RadioButton label="Option 1" />, 50),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<RadioButton label="Option" selected={false} />,
					(container) => {
						container.rerender(<RadioButton label="Option" selected={true} />);
					},
					50,
				),
		},
		{
			name: 'Event Response',
			type: 'event' as const,
			fn: () =>
				measureEventResponseTime(
					<RadioButton label="Option" onChange={() => {}} />,
					(container) => {
						const radio = container.container.querySelector('[class*="wrapper"]');
						if (radio) fireEvent.click(radio);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () => measureMemoryDelta(<RadioButton label="Option 1" />, 10),
		},
	],
};
