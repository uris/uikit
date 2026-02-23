import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { TabBar, placeholderOptions } from '../uikit/TabBar/TabBar';

const meta: Meta<typeof TabBar> = {
	title: 'UI Kit/TabBar',
	component: TabBar,
	args: {
		options: placeholderOptions,
		selected: 0,
		border: true,
		underline: true,
		height: 44,
		width: '100%',
		padding: 8,
		textStyle: 'textRegular',
		iconSize: 24,
		iconGap: 4,
		tabGap: 0,
		disabled: false,
		hasClose: false,
		closeWidth: 'auto',
		tabWidth: 'distribute',
		onChange: fn(),
		onTabChange: fn(),
		onClose: fn(),
		onToolTip: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof TabBar> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<TabBar {...args} />
			</FlexDiv>
		);
	},
};
