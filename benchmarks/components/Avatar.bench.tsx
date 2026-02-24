import React from 'react';
import { bench, describe } from 'vitest';
import { Avatar } from '../../src/uikit/Avatar/Avatar';
import {
	measureMemoryDelta,
	measureMountTime,
	measureRerenderTime,
} from '../utils/benchmark';

describe('Avatar Component Benchmarks', () => {
	bench(
		'Avatar - Mount Time',
		async () => {
			await measureMountTime(<Avatar first="John" last="Doe" size={34} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Avatar - With Image',
		async () => {
			await measureMountTime(
				<Avatar
					first="Jane"
					last="Smith"
					image="https://via.placeholder.com/150"
					size={48}
				/>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Avatar - Re-render on Prop Change',
		async () => {
			await measureRerenderTime(
				<Avatar first="John" last="Doe" size={34} />,
				(container) => {
					container.rerender(<Avatar first="Jane" last="Smith" size={34} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Avatar - Large Size (96px)',
		async () => {
			await measureMountTime(
				<Avatar first="John" last="Doe" size={96} frame={96} />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Avatar - Memory Usage',
		async () => {
			await measureMemoryDelta(<Avatar first="John" last="Doe" />, 10);
		},
		{ iterations: 3 },
	);
});

export const avatarBenchmarkConfig = {
	componentName: 'Avatar',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () => measureMountTime(<Avatar first="John" last="Doe" size={34} />, 50),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<Avatar first="John" last="Doe" size={34} />,
					(container) => {
						container.rerender(<Avatar first="Jane" last="Smith" size={34} />);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () => measureMemoryDelta(<Avatar first="John" last="Doe" />, 10),
		},
	],
};
