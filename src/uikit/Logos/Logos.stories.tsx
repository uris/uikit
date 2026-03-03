import type { Meta, StoryObj } from '@storybook/react-vite';
import { runLogosPlay } from 'src/stories/playHelpers';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { Logos } from 'src/uikit/Logos/Logos';

const meta: Meta<typeof Logos> = {
	title: 'Components/Logos',
	component: Logos,
	args: {
		image: 'slice',
		color: undefined,
		height: 36,
		width: undefined,
	},
};

export default meta;

export const Default: StoryObj<typeof Logos> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<Logos {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runLogosPlay({ canvasElement, args });
	},
};
