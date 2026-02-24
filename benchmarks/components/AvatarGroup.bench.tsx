import { describe, bench } from 'vitest';
import React from 'react';
import { AvatarGroup } from '../../src/uikit/AvatarGroup/AvatarGroup';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('AvatarGroup Component Benchmarks', () => {
	const mockAvatars = [
		{ first: 'John', last: 'Doe', email: 'john@example.com' },
		{ first: 'Jane', last: 'Smith', email: 'jane@example.com' },
		{ first: 'Bob', last: 'Johnson', email: 'bob@example.com' },
	];

	bench(
		'AvatarGroup - Basic Mount',
		async () => {
			await measureMountTime(<AvatarGroup avatars={mockAvatars} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'AvatarGroup - With Custom Sizing',
		async () => {
			await measureMountTime(
				<AvatarGroup avatars={mockAvatars} size={48} overlap={12} />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'AvatarGroup - Large Group',
		async () => {
			const largeGroup = Array.from({ length: 10 }, (_, i) => ({
				first: `User${i}`,
				last: `Test${i}`,
				email: `user${i}@example.com`,
			}));
			await measureMountTime(<AvatarGroup avatars={largeGroup} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'AvatarGroup - State Change (Avatar Update)',
		async () => {
			await measureRerenderTime(
				<AvatarGroup avatars={mockAvatars} />,
				(container) => {
					const updatedAvatars = [
						...mockAvatars,
						{ first: 'New', last: 'User', email: 'new@example.com' },
					];
					container.rerender(<AvatarGroup avatars={updatedAvatars} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'AvatarGroup - Memory Usage',
		async () => {
			await measureMemoryDelta(<AvatarGroup avatars={mockAvatars} />, 10);
		},
		{ iterations: 3 },
	);
});

const mockAvatars = [
	{ first: 'John', last: 'Doe', email: 'john@example.com' },
	{ first: 'Jane', last: 'Smith', email: 'jane@example.com' },
	{ first: 'Bob', last: 'Johnson', email: 'bob@example.com' },
];

export const avatarGroupBenchmarkConfig = {
	componentName: 'AvatarGroup',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () => measureMountTime(<AvatarGroup avatars={mockAvatars} />, 50),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<AvatarGroup avatars={mockAvatars} />,
					(container) => {
						const updatedAvatars = [
							...mockAvatars,
							{ first: 'New', last: 'User', email: 'new@example.com' },
						];
						container.rerender(<AvatarGroup avatars={updatedAvatars} />);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () => measureMemoryDelta(<AvatarGroup avatars={mockAvatars} />, 10),
		},
	],
};
