import type { Meta, StoryObj } from '@storybook/react-vite';
import { DocIcons } from 'src/components/DocIcon';
import { FlexDiv } from 'src/components/FlexDiv/FlexDiv';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof DocIcons> = {
	title: 'Components/DocIcons',
	component: DocIcons,
	args: {
		type: 'pdf',
		height: 36,
	},
};

export default meta;

export const Default: StoryObj<typeof DocIcons> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<DocIcons {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByLabelText(/PDF document/i)).toBeInTheDocument();
	},
};

export const Text: StoryObj<typeof DocIcons> = {
	args: {
		...meta.args,
		type: 'text',
	},
	render: Default.render,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByLabelText(/Text document/i)).toBeInTheDocument();
	},
};

export const Unsupported: StoryObj<typeof DocIcons> = {
	args: {
		...meta.args,
		type: 'not supported',
	},
	render: Default.render,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByLabelText(/Not supported/i)).toBeInTheDocument();
	},
};
