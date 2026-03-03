import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { Grouper } from 'src/uikit/Grouper/Grouper';
import { runGrouperPlay } from 'src/stories/playHelpers';

const meta: Meta<typeof Grouper> = {
	title: 'Components/Grouper',
	component: Grouper,
	args: {
		title: 'Group Title',
		toggle: true,
		open: true,
		hasIcon: true,
		iconName: 'chevron down',
		iconSize: 18,
		frameSize: 64,
		border: 1,
		count: 0,
		unframed: false,
		variant: 'group',
		hideNull: true,
		showFilterBadge: false,
		onChange: fn(),
		onClick: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof Grouper> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<Grouper {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runGrouperPlay({ canvasElement, args });
	},
};
