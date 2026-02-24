import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { TextArea } from '../../src/uikit/TextArea/TextArea';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('TextArea Component Benchmarks', () => {
	bench(
		'TextArea - Basic Mount',
		async () => {
			await measureMountTime(<TextArea />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'TextArea - With Placeholder and Value',
		async () => {
			await measureMountTime(
				<TextArea placeholder="Enter text" value="Initial value" />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'TextArea - Focus Event Response',
		async () => {
			await measureEventResponseTime(
				<TextArea onFocus={() => {}} />,
				(container) => {
					const textarea = container.container.querySelector('textarea');
					if (textarea) fireEvent.focus(textarea);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'TextArea - State Change (Value Update)',
		async () => {
			await measureRerenderTime(
				<TextArea value="Initial text" />,
				(container) => {
					container.rerender(<TextArea value="Updated text content" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'TextArea - Memory Usage',
		async () => {
			await measureMemoryDelta(<TextArea value="Test content" />, 10);
		},
		{ iterations: 3 },
	);
});
