import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { UICard } from '../uikit/UICard/UICard';
import { runUICardPlay } from './playHelpers';

const meta: Meta<typeof UICard> = {
	title: 'UI Kit/UI Card',
	component: UICard,
	args: {
		id: 'upload',
		icon: 'upload',
		label: 'Upload or drop',
		command: 'upload',
		width: 'auto',
		onCommand: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof UICard> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<UICard {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runUICardPlay({ canvasElement, args });
	},
};
