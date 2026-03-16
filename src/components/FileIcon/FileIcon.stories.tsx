import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileIcon, FileIconNames } from 'src/components/FileIcon';
import { FlexDiv } from 'src/components/FlexDiv';
import { fn } from 'storybook/test';

const icons = Object.values(FileIconNames);
const meta: Meta<typeof FileIcon> = {
	title: 'Components/FileIcon',
	component: FileIcon,
	argTypes: {
		name: {
			control: { type: 'select' }, // Dropdown selection
			options: icons, // Enum values as options
		},
	},
	args: {
		name: 'pdf',
		size: 24,
		pointer: true,
		disabled: false,
		onClick: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof FileIcon> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<FileIcon {...args} />
			</FlexDiv>
		);
	},
};
