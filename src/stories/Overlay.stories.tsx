import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn } from 'storybook/test';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { Overlay } from '../uikit/Overlay/Overlay';
import { runOverlayPlay } from './playHelpers';

const meta: Meta<typeof Overlay> = {
	title: 'UI Kit/Overlay',
	component: Overlay,
	args: {
		opacity: 1,
		color: '#00000080',
		type: 'dark',
		global: false,
		overlay: undefined,
		onClick: fn(),
		toggleOverlay: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof Overlay> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<Overlay {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runOverlayPlay({ canvasElement, args });
	},
};

export const GlobalOverlay: StoryObj<typeof Overlay> = {
	args: {
		...meta.args,
		global: true,
		overlay: true,
	},
	render: Default.render,
	play: async ({ canvasElement, args }) => {
		await runOverlayPlay({ canvasElement, args });
	},
};

export const HiddenGlobal: StoryObj<typeof Overlay> = {
	args: {
		...meta.args,
		global: true,
		overlay: false,
	},
	render: Default.render,
	play: async ({ canvasElement }) => {
		const overlay = canvasElement.querySelector('[class*="overlay"]');
		await expect(overlay).not.toBeInTheDocument();
	},
};
