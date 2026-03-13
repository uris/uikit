import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from 'src/components/FlexDiv';
import { IconNames } from 'src/components/Icon/_types';
import { IconButton } from 'src/components/IconButton';
import { runIconButtonPlay } from 'src/components/playHelpers';
import { fn } from 'storybook/test';

const icons = Object.values(IconNames);
const meta: Meta<typeof IconButton> = {
	title: 'Components/IconButton',
	component: IconButton,
	argTypes: {
		icon: {
			control: { type: 'select' }, // Dropdown selection
			options: icons, // Enum values as options
		},
	},
	args: {
		frameSize: 36,
		iconSize: 20,
		icon: 'plus',
		borderRadius: 4,
		tooltip: undefined,
		color: undefined,
		colorOn: undefined,
		bgColor: undefined,
		bgColorHover: undefined,
		bgColorOn: undefined,
		transition: undefined,
		variants: undefined,
		initial: undefined,
		animate: undefined,
		exit: undefined,
		fillColor: undefined,
		label: undefined,
		hover: true,
		count: 0,
		toggle: true,
		toggleIcon: false,
		isToggled: false,
		disabled: false,
		showDot: false,
		border: false,
		onClick: fn(),
		onToolTip: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof IconButton> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<IconButton {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runIconButtonPlay({ canvasElement, args });
	},
};
