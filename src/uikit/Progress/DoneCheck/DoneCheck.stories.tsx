import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from 'src/uikit/FlexDiv';
import { DoneCheck } from 'src/uikit/Progress';
import { expect, fn, waitFor, within } from 'storybook/test';

const meta: Meta<typeof DoneCheck> = {
	title: 'Components/DoneCheck',
	component: DoneCheck,
	args: {
		size: 128,
		stroke: 0.5,
		duration: 1,
		delay: 0,
		play: true,
		didStart: fn(),
		didEnd: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof DoneCheck> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<DoneCheck {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const check = canvas.getByRole('status');
		await expect(check).toBeInTheDocument();
		await waitFor(() => expect(args.didStart).toHaveBeenCalled());
		await waitFor(() => expect(args.didEnd).toHaveBeenCalled());
	},
};

export const Static: StoryObj<typeof DoneCheck> = {
	args: {
		...meta.args,
		play: false,
	},
	render: Default.render,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const check = canvas.getByRole('status');
		await expect(check).toBeInTheDocument();
	},
};
