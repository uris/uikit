import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from 'src/uikit/FlexDiv';
import { DoneCheck } from 'src/uikit/Progress';
import { expect, fn, waitFor } from 'storybook/test';

const meta: Meta<typeof DoneCheck> = {
	title: 'Components/DoneCheck',
	component: DoneCheck,
	args: {
		size: 32,
		stroke: 1,
		duration: 0.05,
		bounce: 0.2,
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
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<DoneCheck {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		const icon = canvasElement.querySelector(
			'svg[aria-label="Checkmark icon"]',
		);
		await expect(icon).toBeInTheDocument();
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
		const icon = canvasElement.querySelector(
			'svg[aria-label="Checkmark icon"]',
		);
		await expect(icon).toBeInTheDocument();
	},
};
