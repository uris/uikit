import React from 'react';
import { bench, describe } from 'vitest';
import { FlexDiv } from '../../src/uikit/FlexDiv/FlexDiv';
import { measureMountTime, measureRerenderTime } from '../utils/benchmark';

describe('FlexDiv Component Benchmarks', () => {
	bench(
		'FlexDiv - Basic Mount',
		async () => {
			await measureMountTime(
				<FlexDiv>
					<div>Child 1</div>
					<div>Child 2</div>
				</FlexDiv>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'FlexDiv - Complex Layout',
		async () => {
			await measureMountTime(
				<FlexDiv
					direction="row"
					justify="between"
					alignItems="center"
					gap={16}
					padding={24}
				>
					<div>Item 1</div>
					<div>Item 2</div>
					<div>Item 3</div>
				</FlexDiv>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'FlexDiv - With Scrolling',
		async () => {
			await measureMountTime(
				<FlexDiv scrollY scrollX height={400} width={600}>
					{Array.from({ length: 50 }, (_, i) => (
						<div key={i as any}>Item {i}</div>
					))}
				</FlexDiv>,
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'FlexDiv - Re-render on Direction Change',
		async () => {
			await measureRerenderTime(
				<FlexDiv direction="column">
					<div>Child 1</div>
					<div>Child 2</div>
				</FlexDiv>,
				(container) => {
					container.rerender(
						<FlexDiv direction="row">
							<div>Child 1</div>
							<div>Child 2</div>
						</FlexDiv>,
					);
				},
				50,
			);
		},
		{ iterations: 5 },
	);

	bench(
		'FlexDiv - Nested Layout',
		async () => {
			await measureMountTime(
				<FlexDiv direction="column">
					<FlexDiv direction="row" gap={8}>
						<div>A</div>
						<div>B</div>
					</FlexDiv>
					<FlexDiv direction="row" gap={8}>
						<div>C</div>
						<div>D</div>
					</FlexDiv>
				</FlexDiv>,
				50,
			);
		},
		{ iterations: 5 },
	);
});
