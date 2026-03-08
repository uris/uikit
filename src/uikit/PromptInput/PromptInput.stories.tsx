import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { fn } from 'storybook/test';
import { PromptInput } from './PromptInput';

const meta: Meta<typeof PromptInput> = {
	title: 'Components/PromptInput',
	component: PromptInput,
	args: {
		value: '',
		working: false,
		borderStyle: 'gradient',
		borderColor: undefined,
		borderColorOn: undefined,
		borderAnimate: true,
		borderWidth: 1,
		borderRadius: 8,
		focused: false,
		placeholder: 'Ask me anything ...',
		placeholderWorking: 'Working ...',
		submitClears: true,
		enterSubmits: true,
		sendButton: true,
		attachButton: true,
		stopEnabled: false,
		textSize: 'm',
		onChange: fn(),
		onBlur: fn(),
		onFocus: fn(),
		onSubmit: fn(),
		onStop: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof PromptInput> = {
	render: (args) => {
		return (
			<FlexDiv
				direction={'row'}
				justify={'center'}
				alignItems={'center'}
				absolute
				padding={64}
			>
				<PromptInput {...args} />
			</FlexDiv>
		);
	},
};
