import type { Meta, StoryObj } from '@storybook/react-vite';
import { Camera } from 'src/components/Camera';
import { FlexDiv } from 'src/components/FlexDiv';

const meta: Meta<typeof Camera> = {
	title: 'Components/Camera',
	component: Camera,
	args: {
		width: 400,
		height: 400,
	},
};

export default meta;

export const Demo: StoryObj<typeof Camera> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<Camera {...args} />
			</FlexDiv>
		);
	},
};
