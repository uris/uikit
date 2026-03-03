import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { ProgressIndicator } from 'src/uikit/Progress/ProgressIndicator/ProgressIndicator';
import { runProgressIndicatorPlay } from 'src/stories/playHelpers';

const meta: Meta<typeof ProgressIndicator> = {
	title: 'Components/ProgressIndicator',
	component: ProgressIndicator,
	args: {
		size: 20,
		secondsPerSpin: 1,
		show: true,
		color: undefined,
		stroke: 1.5,
		inline: false,
		duration: undefined,
		didStart: fn(),
		didStop: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof ProgressIndicator> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<ProgressIndicator {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runProgressIndicatorPlay({ canvasElement, args });
	},
};
