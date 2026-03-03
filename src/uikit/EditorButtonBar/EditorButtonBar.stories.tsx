import type { Meta, StoryObj } from '@storybook/react-vite';
import { runEditorButtonBarPlay } from 'src/stories/playHelpers';
import { EditorButtonBar } from 'src/uikit/EditorButtonBar/EditorButtonBar';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { fn } from 'storybook/test';

const meta: Meta<typeof EditorButtonBar> = {
	title: 'Components/EditorButtonBar',
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
