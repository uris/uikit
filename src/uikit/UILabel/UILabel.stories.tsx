import type { Meta, StoryObj } from '@storybook/react-vite';
import { runUILabelPlay } from 'src/stories/playHelpers';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { UILabel } from 'src/uikit/UILabel/UILabel';
import { fn } from 'storybook/test';

const meta: Meta<typeof UILabel> = {
	title: 'Components/UILabel',
	component: UILabel,
	args: {
		label: 'UI Label',
		state: 'red',
		noFill: false,
		button: false,
		round: false,
		onClick: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof UILabel> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<UILabel {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runUILabelPlay({ canvasElement, args });
	},
};

export const ButtonLabel: StoryObj<typeof UILabel> = {
	args: {
		...meta.args,
		button: true,
		round: true,
	},
	render: Default.render,
	play: async ({ canvasElement, args }) => {
		await runUILabelPlay({ canvasElement, args });
	},
};
