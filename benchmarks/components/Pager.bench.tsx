import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Pager } from '../../src/uikit/Pager/Pager';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('Pager Component Benchmarks', () => {
	bench(
		'Pager - Basic Mount',
		async () => {
			await measureMountTime(<Pager total={100} current={1} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Pager - Large Page Count',
		async () => {
			await measureMountTime(<Pager total={1000} current={50} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Pager - Click Event Response',
		async () => {
			await measureEventResponseTime(
				<Pager total={100} current={1} onChange={() => {}} />,
				(container) => {
					const nextButton = container.container.querySelector('[aria-label*="next"], [class*="next"]');
					if (nextButton) fireEvent.click(nextButton);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Pager - State Change (Page Update)',
		async () => {
			await measureRerenderTime(
				<Pager total={100} current={1} />,
				(container) => {
					container.rerender(<Pager total={100} current={5} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Pager - Memory Usage',
		async () => {
			await measureMemoryDelta(<Pager total={100} current={1} />, 10);
		},
		{ iterations: 3 },
	);
});
