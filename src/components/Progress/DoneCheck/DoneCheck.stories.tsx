import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from 'src/components/FlexDiv';
import { DoneCheck } from 'src/components/Progress';
import { fn } from 'storybook/test';

const meta: Meta<typeof DoneCheck> = {
	title: 'Components/DoneCheck',
	component: DoneCheck,
	args: {
		size: 128,
		stroke: 0.5,
		duration: 1,
		delay: 0,
		play: true,
		didStart: fn(),
		didEnd: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof DoneCheck> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<DoneCheck {...args} />
			</FlexDiv>
		);
	},
};

export const Static: StoryObj<typeof DoneCheck> = {
	args: {
		...meta.args,
		play: false,
	},
	render: Default.render,
};
