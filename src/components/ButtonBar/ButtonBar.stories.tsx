import type { Meta, StoryObj } from '@storybook/react';
import type { BarButton } from 'src/components/ButtonBar';
import { ButtonBar } from 'src/components/ButtonBar/ButtonBar';
import { FlexDiv } from 'src/components/FlexDiv/FlexDiv';
import { runButtonBarPlay } from 'src/components/playHelpers';
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
