import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { FlexDiv } from '../uikit/FlexDiv';
import { Icon } from '../uikit/Icon';
import { IconNames } from '../uikit/Icon/_types';
import { runIconPlay } from './playHelpers';

const icons = Object.values(IconNames);
const meta: Meta<typeof Icon> = {
	title: 'UI Kit/Icon',
	component: Icon,
	argTypes: {
		name: {
			control: { type: 'select' }, // Dropdown selection
			options: icons, // Enum values as options
		},
	},
	args: {
		name: 'home',
		size: 22,
		stroke: 1.5,
		fillColor: 'transparent',
		strokeColor: undefined,
		toggle: false,
		pointer: true,
		disabled: false,
		onClick: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof Icon> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<Icon {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runIconPlay({ canvasElement, args });
	},
};

export const Gallery: StoryObj<typeof Icon> = {
	render: (args) => {
		return (
			<FlexDiv
				justify={'start'}
				alignItems={'start'}
				padding={24}
				wrap
				gap={16}
				width={860}
			>
				{icons.map((name) => (
					<Icon key={name} {...args} name={name} />
				))}
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const rendered = canvas.getAllByRole('img');
		await expect(rendered.length).toBeGreaterThan(20);
		for (const icon of rendered.slice(0, 12)) {
			await userEvent.click(icon);
		}
		await expect(args.onClick).toHaveBeenCalled();
	},
};

export const ViewToggled: StoryObj<typeof Icon> = {
	args: {
		...meta.args,
		name: 'view',
		toggle: true,
	},
	render: Default.render,
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const rendered = canvas.getByRole('img');
		await expect(rendered).toBeInTheDocument();
		await userEvent.click(rendered);
		await expect(args.onClick).toHaveBeenCalled();
	},
};
