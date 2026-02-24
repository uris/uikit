import { describe, bench } from 'vitest';
import React from 'react';
import { EditorButtonBar } from '../../src/uikit/EditorButtonBar/EditorButtonBar';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('EditorButtonBar Component Benchmarks', () => {
	bench(
		'EditorButtonBar - Basic Mount',
		async () => {
			await measureMountTime(<EditorButtonBar />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'EditorButtonBar - With Buttons',
		async () => {
			await measureMountTime(
				<EditorButtonBar
					buttons={['bold', 'italic', 'underline']}
					onAction={() => {}}
				/>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'EditorButtonBar - State Change',
		async () => {
			await measureRerenderTime(
				<EditorButtonBar buttons={['bold']} />,
				(container) => {
					container.rerender(
						<EditorButtonBar buttons={['bold', 'italic', 'underline']} />,
					);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'EditorButtonBar - Memory Usage',
		async () => {
			await measureMemoryDelta(
				<EditorButtonBar buttons={['bold', 'italic']} />,
				10,
			);
		},
		{ iterations: 3 },
	);
});
