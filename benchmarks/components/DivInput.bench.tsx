import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { DivInput } from '../../src/uikit/DivInput/DivInput';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('DivInput Component Benchmarks', () => {
	bench(
		'DivInput - Basic Mount',
		async () => {
			await measureMountTime(<DivInput value="Test" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'DivInput - With Placeholder',
		async () => {
			await measureMountTime(
				<DivInput placeholder="Enter text here" isEditable />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'DivInput - Focus Event Response',
		async () => {
			await measureEventResponseTime(
				<DivInput value="Test" onFocus={() => {}} />,
				(container) => {
					const input = container.container.querySelector('[class*="input"]');
					if (input) fireEvent.focus(input);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'DivInput - State Change (Value Update)',
		async () => {
			await measureRerenderTime(
				<DivInput value="Initial" />,
				(container) => {
					container.rerender(<DivInput value="Updated" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'DivInput - Memory Usage',
		async () => {
			await measureMemoryDelta(
				<DivInput value="Test Input" isEditable />,
				10,
			);
		},
		{ iterations: 3 },
	);
});
