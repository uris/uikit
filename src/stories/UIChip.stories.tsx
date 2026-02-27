import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FlexDiv } from '../uikit/FlexDiv';
import { IconNames } from '../uikit/Icon/_types';
import { UIChip } from '../uikit/UIChip';
import { runUIChipPlay } from './playHelpers';

const icons = Object.values(IconNames).sort();
const meta: Meta<typeof UIChip> = {
	title: 'UI Kit/UI Chip',
	component: UIChip,
	argTypes: {
		icon: {
			control: { type: 'select' }, // Dropdown selection
			options: icons, // Enum values as options
		},
	},
	args: {
		label: 'Chip Label',
		icon: 'sparkle',
		disabled: false,
		focused: false,
		variant: 'regular',
		unframed: false,
		tooltip: "UI Chip's tooltip",
		onClick: fn(),
		onToolTip: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof UIChip> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<UIChip {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runUIChipPlay({ canvasElement, args });
	},
};
