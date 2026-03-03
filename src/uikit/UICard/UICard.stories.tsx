import type { Meta, StoryObj } from '@storybook/react';
import { runUICardPlay } from 'src/stories/playHelpers';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { UICard } from 'src/uikit/UICard/UICard';
import { fn } from 'storybook/test';

const meta: Meta<typeof UICard> = {
	title: 'Components/UI Card',
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
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<UICard {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runUICardPlay({ canvasElement, args });
	},
};
