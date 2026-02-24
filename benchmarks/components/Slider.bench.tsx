import { describe, bench } from 'vitest';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Slider } from '../../src/uikit/Slider/Slider';
import {
	measureMountTime,
	measureRerenderTime,
	measureEventResponseTime,
	measureMemoryDelta,
} from '../utils/benchmark';

describe('Slider Component Benchmarks', () => {
	bench(
		'Slider - Basic Mount',
		async () => {
			await measureMountTime(<Slider initial={50} />, 50);
		},
		{ iterations: 5 },
	);

	bench(
		'Slider - With Custom Range',
		async () => {
			await measureMountTime(
				<Slider initial={25} scaleMin={0} scaleMax={100} />,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Slider - Mouse Down Event Response',
		async () => {
			await measureEventResponseTime(
				<Slider onChange={() => {}} />,
				(container) => {
					const slider = container.container.querySelector('[class*="wrapper"]');
					if (slider) fireEvent.mouseDown(slider, { clientX: 50 });
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Slider - State Change (Value Update)',
		async () => {
			await measureRerenderTime(
				<Slider initial={25} />,
				(container) => {
					container.rerender(<Slider initial={75} />);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'Slider - Memory Usage',
		async () => {
			await measureMemoryDelta(<Slider initial={50} />, 10);
		},
		{ iterations: 3 },
	);
});
