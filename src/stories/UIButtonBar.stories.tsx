import type { Meta, StoryObj } from '@storybook/react';
import type { BarButton } from 'src/uikit/UIButtonBar';
import { fn } from 'storybook/test';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { UIButtonBar } from '../uikit/UIButtonBar/UIButtonBar';

const listView: BarButton[] = [
	{ icon: 'arrow right', command: 'list', tip: 'List View' },
	{ icon: 'home', command: 'gallery', tip: 'Gallery View' },
];

const meta: Meta<typeof UIButtonBar> = {
	title: 'UI Kit/UI Button Bar',
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
};
