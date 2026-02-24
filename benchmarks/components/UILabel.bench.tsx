import { describe, bench } from 'vitest';
import React from 'react';
import { UILabel } from '../../src/uikit/UILabel/UILabel';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('UILabel Component Benchmarks', () => {
	bench(
		'UILabel - Basic Mount',
		async () => {
			await measureMountTime(<UILabel text="Label" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'UILabel - With Custom Styling',
		async () => {
			await measureMountTime(
				<UILabel text="Styled Label" color="#ff0000" size={16} />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UILabel - State Change (Text Update)',
		async () => {
			await measureRerenderTime(
				<UILabel text="Initial" />,
				(container) => {
					container.rerender(<UILabel text="Updated Label Text" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UILabel - Memory Usage',
		async () => {
			await measureMemoryDelta(<UILabel text="Test Label" />, 10);
		},
		{ iterations: 3 },
	);
});
