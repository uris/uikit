import type { Meta, StoryObj } from '@storybook/react-vite';
import { runSwitchPlay } from 'src/stories/playHelpers';
import { FlexDiv } from 'src/uikit/FlexDiv';
import { Switch } from 'src/uikit/Switch';
import { fn } from 'storybook/test';

const meta: Meta<typeof Switch> = {
	title: 'Components/Switch',
	component: Switch,
	args: {
		state: false,
		height: 22,
		width: 44,
		padding: 3,
		bgColorOn: undefined,
		bgColorOff: undefined,
		knobColor: undefined,
		onChange: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof Switch> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<Switch {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runSwitchPlay({ canvasElement, args });
	},
};
