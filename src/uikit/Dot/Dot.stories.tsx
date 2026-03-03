import type { Meta, StoryObj } from '@storybook/react-vite';
import { runDotPlay } from 'src/stories/playHelpers';
import { Dot } from 'src/uikit/Dot/Dot';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';

const meta: Meta<typeof Dot> = {
	title: 'Components/Dot',
	component: Dot,
	argTypes: {
		state: {
			control: { type: 'radio' },
			options: ['red', 'yellow', 'geren', 'blue', 'grey', undefined],
		},
	},
	args: {
		size: 8,
		topOffset: 2,
		rightOffset: 2,
		border: 3,
		position: 'inline',
		color: undefined,
		motion: undefined,
		motionValues: undefined,
		show: true,
		state: 'blue',
	},
};

export default meta;

export const Default: StoryObj<typeof Dot> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<Dot {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runDotPlay({ canvasElement, args });
	},
};
