import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { Pager } from '../uikit/Pager/Pager';
import { runPagerPlay } from './playHelpers';

const meta: Meta<typeof Pager> = {
	title: 'UI Kit/Pager',
	component: Pager,
	args: {
		size: 8,
		index: 0,
		color: undefined,
		colorHover: undefined,
		colorOn: undefined,
		pages: 2,
		gap: 4,
		onChange: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof Pager> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<Pager {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runPagerPlay({ canvasElement, args });
	},
};
