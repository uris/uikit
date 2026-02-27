import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { TextField } from '../uikit/Textfield/TextField';
import { runTextFieldPlay } from './playHelpers';

const meta: Meta<typeof TextField> = {
	title: 'UI Kit/Textfield',
	component: TextField,
	args: {
		name: 'text_field',
		value: '',
		borderType: 'box',
		textSize: 'm',
		labelSize: 'm',
		inputType: 'text',
		placeholder: 'Type here',
		onChange: fn(),
		onSubmit: fn(),
		onFocus: fn(),
		onBlur: fn(),
		onAction: fn(),
		onClear: fn(),
		onValidate: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof TextField> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<TextField {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runTextFieldPlay({ canvasElement, args });
	},
};

export const PasswordWithAction: StoryObj<typeof TextField> = {
	args: {
		...meta.args,
		inputType: 'password',
		actionButton: true,
		value: 'secret',
		focused: true,
	},
	render: Default.render,
	play: async ({ canvasElement, args }) => {
		await runTextFieldPlay({ canvasElement, args });
		const translate = canvasElement.textContent ?? '';
		await expect(translate).toContain('Translate');
	},
};
