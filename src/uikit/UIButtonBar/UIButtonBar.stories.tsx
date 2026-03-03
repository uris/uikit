import type { Meta, StoryObj } from '@storybook/react';
import { runUIButtonBarPlay } from 'src/stories/playHelpers';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import type { BarButton } from 'src/uikit/UIButtonBar';
import { UIButtonBar } from 'src/uikit/UIButtonBar/UIButtonBar';
import { fn } from 'storybook/test';

const listView: BarButton[] = [
	{ icon: 'arrow right', command: 'list', tip: 'List View' },
	{ icon: 'home', command: 'gallery', tip: 'Gallery View' },
];

const meta: Meta<typeof UIButtonBar> = {
	title: 'Components/UI Button Bar',
	component: UIButtonBar,
	args: {
		options: listView,
		current: 0,
		onChange: fn(),
		onToolTip: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof UIButtonBar> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<UIButtonBar {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runUIButtonBarPlay({ canvasElement, args });
	},
};
