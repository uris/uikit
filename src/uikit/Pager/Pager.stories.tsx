import type { Meta, StoryObj } from '@storybook/react-vite';
import { runPagerPlay } from 'src/stories/playHelpers';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { Pager } from 'src/uikit/Pager/Pager';
import { fn } from 'storybook/test';

const meta: Meta<typeof Pager> = {
	title: 'Components/Pager',
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
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<Pager {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runPagerPlay({ canvasElement, args });
	},
};
