import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { CheckBox } from '../uikit/CheckBox/CheckBox';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { runCheckBoxPlay } from './playHelpers';

const meta: Meta<typeof CheckBox> = {
	title: 'UI Kit/CheckBox',
	component: CheckBox,
	argTypes: {
		checked: {
			control: { type: 'radio' }, // Dropdown selection
			options: [true, false], // Enum values as options
		},
	},
	args: {
		size: 20,
		checked: false,
		disabled: false,
		color: undefined,
		label: 'Checkbox label',
		onChange: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof CheckBox> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<CheckBox {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runCheckBoxPlay({ canvasElement, args });
	},
};

export const Partial: StoryObj<typeof CheckBox> = {
	args: {
		...meta.args,
		checked: 'partial',
	},
	render: Default.render,
	play: async ({ canvasElement, args }) => {
		await runCheckBoxPlay({ canvasElement, args });
	},
};

export const Disabled: StoryObj<typeof CheckBox> = {
	args: {
		...meta.args,
		disabled: true,
	},
	render: Default.render,
	play: async ({ canvasElement, args }) => {
		const canvas = canvasElement;
		const checkbox = canvas.querySelector('[role="checkbox"]');
		await expect(checkbox).toBeInTheDocument();
		await expect(checkbox).toHaveAttribute('aria-disabled', 'true');
	},
};
