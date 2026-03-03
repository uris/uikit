import type { Meta, StoryObj } from '@storybook/react-vite';
import { runUIChipPlay } from 'src/stories/playHelpers';
import { FlexDiv } from 'src/uikit/FlexDiv';
import { IconNames } from 'src/uikit/Icon/_types';
import { UIChip } from 'src/uikit/UIChip';
import { fn } from 'storybook/test';

const icons = Object.values(IconNames).sort();
const meta: Meta<typeof UIChip> = {
	title: 'Components/UI Chip',
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
