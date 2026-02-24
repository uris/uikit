import { describe, bench } from 'vitest';
import React from 'react';
import { ErrorSummary } from '../../src/uikit/ErrorSummary/ErrorSummary';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('ErrorSummary Component Benchmarks', () => {
	bench(
		'ErrorSummary - Basic Mount',
		async () => {
			await measureMountTime(<ErrorSummary message="Error message" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'ErrorSummary - With Details',
		async () => {
			await measureMountTime(
				<ErrorSummary message="Error" details="Detailed error information" />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'ErrorSummary - State Change (Message Update)',
		async () => {
			await measureRerenderTime(
				<ErrorSummary message="Initial error" />,
				(container) => {
					container.rerender(<ErrorSummary message="Updated error" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'ErrorSummary - Memory Usage',
		async () => {
			await measureMemoryDelta(<ErrorSummary message="Error message" />, 10);
		},
		{ iterations: 3 },
	);
});
