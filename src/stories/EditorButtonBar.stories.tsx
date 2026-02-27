import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { EditorButtonBar } from '../uikit/EditorButtonBar/EditorButtonBar';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { runEditorButtonBarPlay } from './playHelpers';

const meta: Meta<typeof EditorButtonBar> = {
	title: 'UI Kit / EditorButtonBar',
	component: EditorButtonBar,
	args: {
		shortSize: 560,
		state: 'auto',
		activeFormats: [],
		activeStyle: 'p',
		onCommand: fn(),
		onToolTip: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof EditorButtonBar> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<EditorButtonBar {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runEditorButtonBarPlay({ canvasElement, args });
	},
};
