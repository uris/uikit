import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from 'src/components/FlexDiv/FlexDiv';
import { Slider } from 'src/components/Slider/Slider';
import { runSliderPlay } from 'src/components/playHelpers';
import { fn } from 'storybook/test';

const meta: Meta<typeof Slider> = {
	title: 'Components/Slider',
	component: Slider,
	args: {
		value: 25,
		scaleMin: 0,
		scaleMax: 100,
		width: 100,
		height: 2,
		touchHeight: 24,
		trackHeadSize: 12,
		cursor: 'default',
		headColor: undefined,
		progressColor: undefined,
		trackColor: undefined,
		onChange: fn(),
		onDragChange: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof Slider> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<Slider {...args} />
			</FlexDiv>
		);
	},
};

export const WithTestingActions: StoryObj<typeof Slider> = {
	tags: ['tests'],
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<Slider {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runSliderPlay({ canvasElement, args });
	},
};
