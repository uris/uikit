import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { RadioButton } from '../uikit/RadioButton/RadioButton';
import { runRadioButtonPlay } from './playHelpers';

const meta: Meta<typeof RadioButton> = {
	title: 'UI Kit/RadioButton',
	component: RadioButton,
	args: {
		option: {
			fieldName: 'option',
			title: 'Option',
			state: false,
			icon: 'circle',
		},
		selected: false,
		deselect: true,
		tabIndex: 1,
		wrap: false,
		list: true,
		hideRadio: false,
		toggleIcon: true,
		noFrame: false,
		iconColor: undefined,
		onChange: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof RadioButton> = {
	render: (args) => {
		return (
			<FlexDiv
				direction={'row'}
				justify={'center'}
				alignItems={'center'}
				padding={64}
			>
				<RadioButton {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runRadioButtonPlay({ canvasElement, args });
	},
};
