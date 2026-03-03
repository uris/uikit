import type { Meta, StoryObj } from '@storybook/react-vite';
import { runRadioButtonListPlay } from 'src/stories/playHelpers';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import type { RadioButtonOption } from 'src/uikit/RadioButton';
import { RadioButtonList } from 'src/uikit/RadioButtonList/RadioButtonList';
import { fn } from 'storybook/test';

const options: RadioButtonOption[] = [
	{
		fieldName: 'option',
		title: 'Option 1',
		state: false,
		icon: 'circle',
	},
	{
		fieldName: 'option',
		title: 'Option 2',
		state: false,
		icon: 'circle',
	},
];

const meta: Meta<typeof RadioButtonList> = {
	title: 'Components/RadioButtonList',
	component: RadioButtonList,
	args: {
		options: options,
		selectedIndexes: null,
		selectedOptions: null,
		label: null,
		deselect: true,
		multiSelect: false,
		wrap: false,
		tabIndexSeed: 0,
		spacer: 'none',
		custom: 0,
		gap: 16,
		hideRadio: false,
		noFrame: false,
		toggleIcon: true,
		iconColor: undefined,
		iconSelectedColor: undefined,
		onChange: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof RadioButtonList> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<RadioButtonList {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runRadioButtonListPlay({ canvasElement, args });
	},
};

export const MultiSelect: StoryObj<typeof RadioButtonList> = {
	args: {
		...meta.args,
		multiSelect: true,
	},
	render: Default.render,
	play: async ({ canvasElement, args }) => {
		await runRadioButtonListPlay({ canvasElement, args });
	},
};
