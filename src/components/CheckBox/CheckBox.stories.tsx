import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckBox } from 'src/components/CheckBox/CheckBox';
import { FlexDiv } from 'src/components/FlexDiv/FlexDiv';
import { runCheckBoxPlay } from 'src/components/playHelpers';
import { expect, fn } from 'storybook/test';

const meta: Meta<typeof CheckBox> = {
	title: 'Components/CheckBox',
	component: CheckBox,
	argTypes: {
		checked: {
			control: { type: 'radio' }, // Dropdown selection
			options: [true, false, 'mixed'], // Enum values as options
		},
	},
	args: {
		size: 20,
		checked: false,
		disabled: false,
		color: undefined,
		children: 'Checkbox label' as string,
		onChange: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof CheckBox> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
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
		checked: 'mixed',
	},
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<CheckBox {...args} />
			</FlexDiv>
		);
	},
};

export const Disabled: StoryObj<typeof CheckBox> = {
	args: {
		...meta.args,
		disabled: true,
	},
	render: Default.render,
	play: async ({ canvasElement }) => {
		const checkbox = canvasElement.querySelector('[role="checkbox"]');
		await expect(checkbox).toBeInTheDocument();
		await expect(checkbox).toHaveAttribute('aria-disabled', 'true');
	},
};
