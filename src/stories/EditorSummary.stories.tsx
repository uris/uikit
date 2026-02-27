import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn } from 'storybook/test';
import { EditorSummary } from '../uikit/EditorSummary/EditorSummary';
import type { SuggestMark } from '../uikit/EditorSummary/_Types';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { runEditorSummaryPlay } from './playHelpers';

const defaults: SuggestMark[] = [
	{ id: 'id1', action: 'add', from: 20, to: 40 },
	{ id: 'id2', action: 'remove', from: 40, to: 60 },
	{ id: 'id3', action: 'add', from: 40, to: 60 },
	{ id: 'id4', action: 'remove', from: 40, to: 60 },
];

const meta: Meta<typeof EditorSummary> = {
	title: 'UI Kit/EditorSummary',
	component: EditorSummary,
	args: {
		edits: defaults,
		current: 0,
		onAcceptAll: fn(),
		onRejectAll: fn(),
		onAccept: fn(),
		onReject: fn(),
		onChange: fn(),
		onToolTip: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof EditorSummary> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<EditorSummary {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runEditorSummaryPlay({ canvasElement, args });
	},
};

export const Resolved: StoryObj<typeof EditorSummary> = {
	args: {
		...meta.args,
		current: -1,
	},
	render: Default.render,
	play: async ({ canvasElement }) => {
		const summary = canvasElement.textContent ?? '';
		await expect(summary).toContain('0');
	},
};
