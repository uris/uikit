import { describe, bench } from 'vitest';
import React from 'react';
import { UIFileIcon } from '../../src/uikit/UIFileIcon/UIFileIcon';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('UIFileIcon Component Benchmarks', () => {
	bench(
		'UIFileIcon - Basic Mount',
		async () => {
			await measureMountTime(<UIFileIcon filename="test.txt" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'UIFileIcon - Various File Types',
		async () => {
			await measureMountTime(<UIFileIcon filename="document.pdf" size={32} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'UIFileIcon - State Change (Filename Update)',
		async () => {
			await measureRerenderTime(
				<UIFileIcon filename="test.txt" />,
				(container) => {
					container.rerender(<UIFileIcon filename="document.pdf" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UIFileIcon - Memory Usage',
		async () => {
			await measureMemoryDelta(<UIFileIcon filename="test.pdf" />, 10);
		},
		{ iterations: 3 },
	);
});
