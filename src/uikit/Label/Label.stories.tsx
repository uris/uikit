import type { Meta, StoryObj } from '@storybook/react-vite';
import { runLabelPlay } from 'src/stories/playHelpers';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { Label } from 'src/uikit/Label/Label';
import { fn } from 'storybook/test';

const meta: Meta<typeof Label> = {
	title: 'Components/Label',
	component: Label,
	args: {
		children: 'Label',
		state: 'red',
		inline: false,
		noFill: false,
		button: false,
		round: false,
		size: 'm',
		padding: undefined,
		border: 1,
		onClick: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof Label> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<Label {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runLabelPlay({ canvasElement, args });
	},
};

export const ButtonLabel: StoryObj<typeof Label> = {
	args: {
		...meta.args,
		button: true,
		round: true,
	},
	render: Default.render,
	play: async ({ canvasElement, args }) => {
		await runLabelPlay({ canvasElement, args });
	},
};
