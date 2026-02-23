import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { CheckBox } from '../uikit/CheckBox/CheckBox';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

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
};
