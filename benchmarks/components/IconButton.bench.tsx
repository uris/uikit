import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { IconButton } from '../../src/uikit/IconButton/IconButton';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('IconButton Component Benchmarks', () => {
	bench(
		'IconButton - Basic Mount',
		async () => {
			await measureMountTime(<IconButton icon="check" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'IconButton - With Custom Size',
		async () => {
			await measureMountTime(<IconButton icon="close" size={32} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'IconButton - Click Event Response',
		async () => {
			await measureEventResponseTime(
				<IconButton icon="save" onClick={() => {}} />,
				(container) => {
					const button = container.container.querySelector('[class*="wrapper"]');
					if (button) fireEvent.click(button);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'IconButton - State Change (Icon Update)',
		async () => {
			await measureRerenderTime(
				<IconButton icon="check" />,
				(container) => {
					container.rerender(<IconButton icon="close" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'IconButton - Memory Usage',
		async () => {
			await measureMemoryDelta(<IconButton icon="check" />, 10);
		},
		{ iterations: 3 },
	);
});
