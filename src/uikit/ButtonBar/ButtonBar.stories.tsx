import type { Meta, StoryObj } from '@storybook/react';
import { runButtonBarPlay } from 'src/stories/playHelpers';
import type { BarButton } from 'src/uikit/ButtonBar';
import { ButtonBar } from 'src/uikit/ButtonBar/ButtonBar';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { fn } from 'storybook/test';

const listView: BarButton[] = [
	{ icon: 'arrow right', command: 'list', tip: 'List View' },
	{ icon: 'home', command: 'gallery', tip: 'Gallery View' },
];

const meta: Meta<typeof ButtonBar> = {
	title: 'Components/ButtonBar',
	component: ButtonBar,
	args: {
		options: listView,
		current: 0,
		onChange: fn(),
		onToolTip: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof ButtonBar> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<ButtonBar {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runButtonBarPlay({ canvasElement, args });
	},
};
