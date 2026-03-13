/**
 * Benchmark Runner
 * Runs all component benchmarks and generates formatted reports
 */

import React from 'react';
import { Avatar } from '../src/components/Avatar/Avatar';
import { Button } from '../src/components/Button/Button';
import { FlexDiv } from '../src/components/FlexDiv/FlexDiv';
import {
	measureMountTime,
	measureRerenderTime,
	measureMemoryDelta,
	measureEventResponseTime,
} from './utils/benchmark';
import { BenchmarkReporter } from './utils/reporter';

async function runBenchmarks() {
	const reporter = new BenchmarkReporter();

	console.log('\n🚀 Starting Component Performance Benchmarks...\n');

	// Avatar Benchmarks
	console.log('Testing Avatar component...');
	const avatarMount = await measureMountTime(
		React.createElement(Avatar, { first: 'John', last: 'Doe', size: 34 }),
		50,
	);
	const avatarRerender = await measureRerenderTime(
		React.createElement(Avatar, { first: 'John', last: 'Doe', size: 34 }),
		(container) => {
			container.rerender(
				React.createElement(Avatar, { first: 'Jane', last: 'Smith', size: 34 }),
			);
		},
		50,
	);
	const avatarMemory = await measureMemoryDelta(
		React.createElement(Avatar, { first: 'John', last: 'Doe' }),
		10,
	);

	reporter.addResult({
		componentName: 'Avatar',
		mountTime: avatarMount,
		rerenderTime: avatarRerender,
		memory: avatarMemory,
	});

	// Button Benchmarks
	console.log('Testing Button component...');
	const buttonMount = await measureMountTime(
		React.createElement(Button, { label: 'Click Me' }),
		50,
	);
	const buttonRerender = await measureRerenderTime(
		React.createElement(Button, { label: 'Button', state: 'normal' }),
		(container) => {
			container.rerender(
				React.createElement(Button, { label: 'Button', state: 'disabled' }),
			);
		},
		50,
	);
	const buttonMemory = await measureMemoryDelta(
		React.createElement(Button, { label: 'Test', iconLeft: 'check' }),
		10,
	);

	reporter.addResult({
		componentName: 'Button',
		mountTime: buttonMount,
		rerenderTime: buttonRerender,
		memory: buttonMemory,
	});

	// FlexDiv Benchmarks
	console.log('Testing FlexDiv component...');
	const flexMount = await measureMountTime(
		React.createElement(
			FlexDiv,
			{},
			React.createElement('div', null, 'Child 1'),
			React.createElement('div', null, 'Child 2'),
		),
		50,
	);
	const flexRerender = await measureRerenderTime(
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
	const flexMemory = await measureMemoryDelta(
		React.createElement(
			FlexDiv,
			{},
			React.createElement('div', null, 'Child'),
		),
		10,
	);

	reporter.addResult({
		componentName: 'FlexDiv',
		mountTime: flexMount,
		rerenderTime: flexRerender,
		memory: flexMemory,
	});

	// Generate and display reports
	console.log(reporter.generateConsoleReport());

	// Save markdown report
	reporter.saveToFile('benchmark-results.md');

	console.log('\n✅ Benchmarks complete!\n');
}

// Run if executed directly
if (require.main === module) {
	runBenchmarks().catch(console.error);
}

export { runBenchmarks };
