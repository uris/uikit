import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { DropDown } from '../../src/uikit/DropDown/DropDown';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('DropDown Component Benchmarks', () => {
	const mockOptions = [
		{ label: 'Option 1', value: '1' },
		{ label: 'Option 2', value: '2' },
		{ label: 'Option 3', value: '3' },
	];

	bench(
		'DropDown - Basic Mount',
		async () => {
			await measureMountTime(<DropDown options={mockOptions} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'DropDown - Large Options List',
		async () => {
			const largeOptions = Array.from({ length: 50 }, (_, i) => ({
				label: `Option ${i}`,
				value: `${i}`,
			}));
			await measureMountTime(<DropDown options={largeOptions} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'DropDown - Click Event Response',
		async () => {
			await measureEventResponseTime(
				<DropDown options={mockOptions} onChange={() => {}} />,
				(container) => {
					const dropdown = container.container.querySelector('[class*="wrapper"]');
					if (dropdown) fireEvent.click(dropdown);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'DropDown - State Change (Selection Update)',
		async () => {
			await measureRerenderTime(
				<DropDown options={mockOptions} selected="1" />,
				(container) => {
					container.rerender(<DropDown options={mockOptions} selected="2" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'DropDown - Memory Usage',
		async () => {
			await measureMemoryDelta(<DropDown options={mockOptions} />, 10);
		},
		{ iterations: 3 },
	);
});
