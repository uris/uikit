import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DivInput } from '../uikit/DivInput/DivInput';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const meta: Meta<typeof DivInput> = {
	title: 'UI Kit/DivInput',
	component: DivInput,
	argTypes: {
		textAlign: {
			control: { type: 'radio' }, // Dropdown selection
			options: ['left', 'center', 'right', undefined], // Enum values as options
		},
	},
	args: {
		value: '',
		placeholder: 'Placeholder',
		isEditable: true,
		wrap: false,
		focus: false,
		width: 'auto',
		textAlign: 'left',
		clamp: 3,
		fontStyle: undefined,
		padding: '16px',
		bgColor: undefined,
		radius: 4,
		onChange: fn(),
		onSubmit: fn(),
		onFocus: fn(),
		onBlur: fn(),
		onDblClick: fn(),
		onClick: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof DivInput> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<DivInput {...args} />
			</FlexDiv>
		);
	},
};
