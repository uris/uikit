import { describe, bench } from 'vitest';
import React from 'react';
import { EditorSummary } from '../../src/uikit/EditorSummary/EditorSummary';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('EditorSummary Component Benchmarks', () => {
	bench(
		'EditorSummary - Basic Mount',
		async () => {
			await measureMountTime(<EditorSummary content="Summary text" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'EditorSummary - With Long Content',
		async () => {
			const longContent = 'Lorem ipsum dolor sit amet '.repeat(20);
			await measureMountTime(<EditorSummary content={longContent} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'EditorSummary - State Change (Content Update)',
		async () => {
			await measureRerenderTime(
				<EditorSummary content="Initial content" />,
				(container) => {
					container.rerender(<EditorSummary content="Updated content" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'EditorSummary - Memory Usage',
		async () => {
			await measureMemoryDelta(<EditorSummary content="Summary text" />, 10);
		},
		{ iterations: 3 },
	);
});
