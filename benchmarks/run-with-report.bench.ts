/**
 * Comprehensive Benchmark Suite with Custom Reporting
 * This generates formatted console output and markdown reports
 */

import { describe, it, expect } from 'vitest';
import React from 'react';
import { Avatar } from '../src/uikit/Avatar/Avatar';
import { UIButton } from '../src/uikit/UIButton/UIButton';
import { FlexDiv } from '../src/uikit/FlexDiv/FlexDiv';
import { Icon } from '../src/uikit/Icon/Icon';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
	measureEventResponseTime,
	formatBenchmarkResult,
	formatMemoryResult,
} from './utils/benchmark';
import { BenchmarkReporter } from './utils/reporter';

describe('Full Benchmark Suite with Reporting', () => {
	const reporter = new BenchmarkReporter();

	it('Avatar - Performance Tests', async () => {
		console.log('\n⏱️  Testing Avatar component...');

		const mountTime = await measureMountTime(
			React.createElement(Avatar, { first: 'John', last: 'Doe', size: 34 }),
			50,
		);
		console.log(formatBenchmarkResult(mountTime));

		const rerenderTime = await measureRerenderTime(
			React.createElement(Avatar, { first: 'John', last: 'Doe', size: 34 }),
			(container) => {
				container.rerender(
					React.createElement(Avatar, {
						first: 'Jane',
						last: 'Smith',
						size: 34,
					}),
				);
			},
			50,
		);
		console.log(formatBenchmarkResult(rerenderTime));

		const memory = await measureMemoryDelta(
			React.createElement(Avatar, { first: 'John', last: 'Doe' }),
			10,
		);
		console.log(formatMemoryResult(memory));

		reporter.addResult({
			componentName: 'Avatar',
			mountTime,
			rerenderTime,
			memory,
		});

		expect(mountTime.average).toBeLessThan(50);
	});

	it('UIButton - Performance Tests', async () => {
		console.log('\n⏱️  Testing UIButton component...');

		const mountTime = await measureMountTime(
			React.createElement(UIButton, { label: 'Click Me' }),
			50,
		);
		console.log(formatBenchmarkResult(mountTime));

		const rerenderTime = await measureRerenderTime(
			React.createElement(UIButton, { label: 'Button', state: 'normal' }),
			(container) => {
				container.rerender(
					React.createElement(UIButton, {
						label: 'Button',
						state: 'disabled',
					}),
				);
			},
			50,
		);
		console.log(formatBenchmarkResult(rerenderTime));

		// Test click event response time
		const eventResponseTime = await measureEventResponseTime(
			React.createElement(UIButton, {
				label: 'Click Me',
				onClick: () => {},
			}),
			(container) => {
				const button = container.container.querySelector('button');
				if (button) {
					button.click();
				}
			},
			100,
		);
		console.log(formatBenchmarkResult(eventResponseTime));

		const memory = await measureMemoryDelta(
			React.createElement(UIButton, { label: 'Test', iconLeft: 'check' }),
			10,
		);
		console.log(formatMemoryResult(memory));

		reporter.addResult({
			componentName: 'UIButton',
			mountTime,
			rerenderTime,
			eventResponseTime,
			memory,
		});

		expect(mountTime.average).toBeLessThan(50);
	});

	it('FlexDiv - Performance Tests', async () => {
		console.log('\n⏱️  Testing FlexDiv component...');

		const mountTime = await measureMountTime(
			React.createElement(
				FlexDiv,
				{},
				React.createElement('div', null, 'Child 1'),
				React.createElement('div', null, 'Child 2'),
			),
			50,
		);
		console.log(formatBenchmarkResult(mountTime));

		const rerenderTime = await measureRerenderTime(
			React.createElement(
				FlexDiv,
				{ direction: 'column' },
				React.createElement('div', null, 'Child 1'),
				React.createElement('div', null, 'Child 2'),
			),
			(container) => {
				container.rerender(
					React.createElement(
						FlexDiv,
						{ direction: 'row' },
						React.createElement('div', null, 'Child 1'),
						React.createElement('div', null, 'Child 2'),
					),
				);
			},
			50,
		);
		console.log(formatBenchmarkResult(rerenderTime));

		const memory = await measureMemoryDelta(
			React.createElement(FlexDiv, {}, React.createElement('div', null, 'Child')),
			10,
		);
		console.log(formatMemoryResult(memory));

		reporter.addResult({
			componentName: 'FlexDiv',
			mountTime,
			rerenderTime,
			memory,
		});

		expect(mountTime.average).toBeLessThan(50);
	});

	it('Icon - Performance Tests', async () => {
		console.log('\n⏱️  Testing Icon component...');

		const mountTime = await measureMountTime(
			React.createElement(Icon, { name: 'home', size: 22 }),
			50,
		);
		console.log(formatBenchmarkResult(mountTime));

		const rerenderTime = await measureRerenderTime(
			React.createElement(Icon, { name: 'home', size: 22 }),
			(container) => {
				container.rerender(
					React.createElement(Icon, { name: 'search', size: 22 }),
				);
			},
			50,
		);
		console.log(formatBenchmarkResult(rerenderTime));

		const memory = await measureMemoryDelta(
			React.createElement(Icon, { name: 'home' }),
			10,
		);
		console.log(formatMemoryResult(memory));

		reporter.addResult({
			componentName: 'Icon',
			mountTime,
			rerenderTime,
			memory,
		});

		expect(mountTime.average).toBeLessThan(50);
	});

	it('Generate Final Report', () => {
		console.log(reporter.generateConsoleReport());
		reporter.saveToFile('benchmark-results.md');
	});
});
