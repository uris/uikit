import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../uikit/Badge/Badge';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { runBadgePlay } from './playHelpers';

const meta: Meta<typeof Badge> = {
	title: 'UI Kit/Badge',
	component: Badge,
	argTypes: {
		variant: {
			control: { type: 'radio' }, // Dropdown selection
			options: ['dark', 'light', undefined], // Enum values as options
		},
	},
	args: {
		count: 5,
		variant: 'dark',
		hideNull: true,
	},
};

export default meta;

export const Default: StoryObj<typeof Badge> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<Badge {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runBadgePlay({ canvasElement, args });
	},
};
