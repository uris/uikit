import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { UIButton } from '../../src/uikit/UIButton/UIButton';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('UIButton Component Benchmarks', () => {
	bench(
		'UIButton - Basic Mount',
		async () => {
			await measureMountTime(<UIButton label="Click Me" />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'UIButton - With Icons',
		async () => {
			await measureMountTime(
				<UIButton label="Save" iconLeft="check" iconRight="arrow up" />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UIButton - Solid Variant',
		async () => {
			await measureMountTime(
				<UIButton label="Primary" variant="solid" size="large" />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UIButton - Click Event Response',
		async () => {
			await measureEventResponseTime(
				<UIButton label="Click" onClick={() => {}} />,
				(container) => {
					const button = container.container.querySelector('[class*="button"]');
					if (button) fireEvent.click(button);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UIButton - State Change (Disabled Toggle)',
		async () => {
			await measureRerenderTime(
				<UIButton label="Button" state="normal" />,
				(container) => {
					container.rerender(<UIButton label="Button" state="disabled" />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UIButton - With Badge Count',
		async () => {
			await measureMountTime(
				<UIButton label="Messages" count={99} iconLeft="message" />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'UIButton - Memory Usage',
		async () => {
			await measureMemoryDelta(
				<UIButton label="Test" iconLeft="check" count={5} />,
				10,
			);
		},
		{ iterations: 3 },
	);
});
