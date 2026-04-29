import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from 'src/components/FlexDiv';
import { TextField } from 'src/components/Textfield';
import { runTextFieldPlay } from 'src/components/playHelpers';
import { expect, fn } from 'storybook/test';

const meta: Meta<typeof TextField> = {
	title: 'Components/Textfield',
	component: TextField,
	args: {
		name: 'user_email',
		placeholder: 'Enter your email',
		label: 'Email',
		value: '',
		size: { width: '50%', height: 'auto' },
		borderType: 'box',
		textSize: 'm',
		labelSize: 'm',
		inputType: 'text',
		onChange: fn(),
		onSubmit: fn(),
		onFocus: fn(),
		onBlur: fn(),
		onAction: fn(),
		onClear: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof TextField> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} align={'center'} padding={64}>
				<TextField {...args} />
			</FlexDiv>
		);
	},
};

export const DefaultTextField: StoryObj<typeof TextField> = {
	tags: ['tests'],
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} align={'center'} padding={64}>
				<TextField {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runTextFieldPlay({ canvasElement, args });
	},
};

export const PasswordWithAction: StoryObj<typeof TextField> = {
	tags: ['tests'],
	args: {
		...meta.args,
		placeholder: 'Enter password',
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
