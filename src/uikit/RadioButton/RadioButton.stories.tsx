import type { Meta, StoryObj } from '@storybook/react-vite';
import { runRadioButtonPlay } from 'src/stories/playHelpers';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { RadioButton } from 'src/uikit/RadioButton/RadioButton';
import { fn } from 'storybook/test';

const meta: Meta<typeof RadioButton> = {
	title: 'Components/RadioButton',
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
