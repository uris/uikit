import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { MessageInput } from '../../src/uikit/MessageInput/InputField/MessageInput';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('MessageInput Component Benchmarks', () => {
	bench(
		'MessageInput - Basic Mount',
		async () => {
			await measureMountTime(<MessageInput />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'MessageInput - With Placeholder',
		async () => {
			await measureMountTime(
				<MessageInput placeholder="Type a message..." />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'MessageInput - Focus Event Response',
		async () => {
			await measureEventResponseTime(
				<MessageInput onFocus={() => {}} />,
				(container) => {
					const input = container.container.querySelector('textarea, input');
					if (input) fireEvent.focus(input);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'MessageInput - State Change (Value Update)',
		async () => {
			await measureRerenderTime(
				<MessageInput value="Initial" />,
				(container) => {
					container.rerender(<MessageInput value="Updated message" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'MessageInput - Memory Usage',
		async () => {
			await measureMemoryDelta(<MessageInput />, 10);
		},
		{ iterations: 3 },
	);
});

export const messageInputBenchmarkConfig = {
	componentName: 'MessageInput',
	tests: [
		{
			name: 'Mount Time',
			type: 'mount' as const,
			fn: () => measureMountTime(<MessageInput />, 50),
		},
		{
			name: 'Re-render',
			type: 'rerender' as const,
			fn: () =>
				measureRerenderTime(
					<MessageInput value="Initial" />,
					(container) => {
						container.rerender(<MessageInput value="Updated message" />);
					},
					50,
				),
		},
		{
			name: 'Event Response',
			type: 'event' as const,
			fn: () =>
				measureEventResponseTime(
					<MessageInput onFocus={() => {}} />,
					(container) => {
						const input = container.container.querySelector('textarea, input');
						if (input) fireEvent.focus(input);
					},
					50,
				),
		},
		{
			name: 'Memory',
			type: 'memory' as const,
			fn: () => measureMemoryDelta(<MessageInput />, 10),
		},
	],
};
