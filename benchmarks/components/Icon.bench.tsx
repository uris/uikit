import { bench, describe } from 'vitest';
import React from 'react';
import { Icon } from '../../src/uikit/Icon/Icon';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('Icon Performance Benchmarks', () => {
	bench(
		'Icon - Mount Time',
		async () => {
			await measureMountTime(
				<Icon name="home" size={22} />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Icon - Re-render (icon change)',
		async () => {
			await measureRerenderTime(
				<Icon name="home" size={22} />,
				(container) => {
					container.rerender(<Icon name="search" size={22} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Icon - Re-render (size change)',
		async () => {
			await measureRerenderTime(
				<Icon name="home" size={22} />,
				(container) => {
					container.rerender(<Icon name="home" size={32} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Icon - Memory Usage',
		async () => {
			await measureMemoryDelta(<Icon name="home" />, 10);
		},
		{ iterations: 3 },
	);
});
