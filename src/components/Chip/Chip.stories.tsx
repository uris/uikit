import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from 'src/components/Chip';
import { FlexDiv } from 'src/components/FlexDiv';
import { IconNames } from 'src/components/Icon/_types';
import { runChipPlay } from 'src/components/playHelpers';
import { fn } from 'storybook/test';

const icons = Object.values(IconNames).sort();
const meta: Meta<typeof Chip> = {
	title: 'Components/Chip',
	component: Chip,
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
		tooltip: 'Chip tooltip',
		onClick: fn(),
		onToolTip: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof Chip> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<Chip {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runChipPlay({ canvasElement, args });
	},
};
