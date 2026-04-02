import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from 'src/components/FlexDiv';
import { TabBar } from 'src/components/TabBar';
import { placeholderOptions } from 'src/components/TabBar/_types';
import { runTabBarPlay } from 'src/components/playHelpers';
import { expect, fn } from 'storybook/test';

const meta: Meta<typeof TabBar> = {
	title: 'Components/TabBar',
	component: TabBar,
	argTypes: {
		tabWidth: {
			control: { type: 'radio' },
			options: ['fill', 'compact'],
		},
	},
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
		iconFill: true,
		disabled: false,
		hasClose: false,
		closeWidth: 'auto',
		tabWidth: 'fill',
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
			<FlexDiv absolute justify={'center'} align={'center'} padding={64}>
				<TabBar {...args} />
			</FlexDiv>
		);
	},
};

export const DefaultTabBar: StoryObj<typeof TabBar> = {
	tags: ['tests'],
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} align={'center'} padding={64}>
				<TabBar {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runTabBarPlay({ canvasElement, args });
	},
};

export const WithClose: StoryObj<typeof TabBar> = {
	tags: ['tests'],
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
	tags: ['tests'],
	args: {
		...meta.args,
		selectedValue: 'Option 2',
	},
	render: Default.render,
	play: async ({ canvasElement }) => {
		await expect(canvasElement).toHaveTextContent('Dark');
	},
};
