import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { Logos } from '../uikit/Logos/Logos';
import { runLogosPlay } from './playHelpers';

const meta: Meta<typeof Logos> = {
	title: 'UI Kit/Logos',
	component: Logos,
	args: {
		image: 'gp',
		color: undefined,
		height: 36,
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
