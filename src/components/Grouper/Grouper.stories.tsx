import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from 'src/components/FlexDiv/FlexDiv';
import { Grouper } from 'src/components/Grouper/Grouper';
import { runGrouperPlay } from 'src/components/playHelpers';
import { fn } from 'storybook/test';

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
			<FlexDiv absolute justify={'center'} align={'center'} padding={64}>
				<Grouper {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runGrouperPlay({ canvasElement, args });
	},
};
