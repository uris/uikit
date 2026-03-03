import type { Meta, StoryObj } from '@storybook/react-vite';
import { runTabBarPlay } from 'src/stories/playHelpers';
import { FlexDiv } from 'src/uikit/FlexDiv';
import { TabBar } from 'src/uikit/TabBar';
import { placeholderOptions } from 'src/uikit/TabBar/_types';
import { expect, fn } from 'storybook/test';

const meta: Meta<typeof TabBar> = {
	title: 'Components/TabBar',
	component: TabBar,
	args: {
		options: placeholderOptions,
		selected: 0,
		border: true,
		underline: true,
		height: 44,
		width: '100%',
		padding: 8,
		iconSize: 20,
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
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<TabBar {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runTabBarPlay({ canvasElement, args });
	},
};

export const WithClose: StoryObj<typeof TabBar> = {
	args: {
		...meta.args,
		hasClose: true,
	},
	render: Default.render,
	play: async ({ canvasElement, args }) => {
		await runTabBarPlay({ canvasElement, args });
	},
};

export const SelectedByValue: StoryObj<typeof TabBar> = {
	args: {
		...meta.args,
		selectedValue: 'Option 2',
	},
	render: Default.render,
	play: async ({ canvasElement }) => {
		await expect(canvasElement).toHaveTextContent('Option 2');
	},
};
