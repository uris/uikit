import type { Meta, StoryObj } from '@storybook/react';
import { runCardPlay } from 'src/stories/playHelpers';
import { Card } from 'src/uikit/Card/Card';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { fn } from 'storybook/test';

const meta: Meta<typeof Card> = {
	title: 'Components/Card',
	component: Card,
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

export const Default: StoryObj<typeof Card> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<Card {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runCardPlay({ canvasElement, args });
	},
};
