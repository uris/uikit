import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from 'src/components/Chip';
import { FlexDiv } from 'src/components/FlexDiv';
import { runChipPlay } from 'src/components/playHelpers';
import { fn } from 'storybook/test';

const meta: Meta<typeof Chip> = {
	title: 'Components/Chip',
	component: Chip,
	argTypes: {
		children: {
			table: {
				disable: true,
			},
		},
	},
	args: {
		label: 'Chip Label',
		icon: 'wand',
		disabled: false,
		focused: false,
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
