import type { Meta, StoryObj } from '@storybook/react-vite';
import { runSpacerPlay } from 'src/stories/playHelpers';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { Spacer } from 'src/uikit/Spacer/Spacer';

const meta: Meta<typeof Spacer> = {
	title: 'Components/Spacer',
	component: Spacer,
	args: {
		size: 8,
	},
};

export default meta;

export const Default: StoryObj<typeof Spacer> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<Spacer {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runSpacerPlay({ canvasElement, args });
	},
};
