import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from 'src/components/FlexDiv/FlexDiv';
import { Logos } from 'src/components/Logos/Logos';
import { runLogosPlay } from 'src/components/playHelpers';

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
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<Logos {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runLogosPlay({ canvasElement, args });
	},
};
