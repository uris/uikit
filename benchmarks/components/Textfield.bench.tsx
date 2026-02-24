import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Textfield } from '../../src/uikit/Textfield/Textfield';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('Textfield Component Benchmarks', () => {
	bench(
		'Textfield - Basic Mount',
		async () => {
			await measureMountTime(<Textfield />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Textfield - With Placeholder and Value',
		async () => {
			await measureMountTime(
				<Textfield placeholder="Enter text" value="Initial value" />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Textfield - Focus Event Response',
		async () => {
			await measureEventResponseTime(
				<Textfield onFocus={() => {}} />,
				(container) => {
					const input = container.container.querySelector('input');
					if (input) fireEvent.focus(input);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Textfield - State Change (Value Update)',
		async () => {
			await measureRerenderTime(
				<Textfield value="Initial" />,
				(container) => {
					container.rerender(<Textfield value="Updated text" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Textfield - Memory Usage',
		async () => {
			await measureMemoryDelta(<Textfield value="Test" />, 10);
		},
		{ iterations: 3 },
	);
});
