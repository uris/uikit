import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FlexDiv } from 'src/uikit/FlexDiv';
import { UIFileIcon } from 'src/uikit/UIFileIcon';
import { UIFileIcons } from 'src/uikit/UIFileIcon/_types';
import { runUIFileIconPlay } from 'src/stories/playHelpers';

const icons = Object.values(UIFileIcons).sort();
const meta: Meta<typeof UIFileIcon> = {
	title: 'Components/UI File Icon',
	component: UIFileIcon,
	argTypes: {
		name: {
			control: { type: 'select' }, // Dropdown selection
			options: icons, // Enum values as options
		},
	},
	args: {
		name: 'document',
		size: 20,
		pointer: false,
		disabled: false,
		onClick: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof UIFileIcon> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<UIFileIcon {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runUIFileIconPlay({ canvasElement, args });
	},
};

export const PDF: StoryObj<typeof UIFileIcon> = {
	args: {
		...meta.args,
		name: 'pdf',
		pointer: true,
	},
	render: Default.render,
	play: async ({ canvasElement, args }) => {
		await runUIFileIconPlay({ canvasElement, args });
	},
};

export const Spreadsheet: StoryObj<typeof UIFileIcon> = {
	args: {
		...meta.args,
		name: 'spreadsheet',
		pointer: true,
	},
	render: Default.render,
	play: async ({ canvasElement, args }) => {
		await runUIFileIconPlay({ canvasElement, args });
	},
};
