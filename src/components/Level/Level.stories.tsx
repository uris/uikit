import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMicrophone } from '../../hooks';
import { FlexDiv } from '../FlexDiv';
import { Label } from '../Label';
import { Level } from './Level';
import type { LevelProps } from './_types';

const meta: Meta<typeof Level> = {
	title: 'Components/Level',
	component: Level,
	args: {
		audioStream: undefined,
		playing: true,
		width: 50,
		height: 4,
		gap: 0,
		backgroundColor: 'var(--core-surface-primary-tint)',
		colorActive: 'var(--feedback-positive)',
		minIntensity: 0,
		maxIntensity: 5,
		intensity: 3.5,
		peakIntensity: 0.5,
		risePerSeconds: 4,
		releasePerSeconds: 1.5,
		borderRadius: 100,
	},
};

export default meta;

export const Demo: StoryObj<typeof Level> = {
	render: (args) => {
		return <LevelDemo {...args} />;
	},
};

function LevelDemo(props: Readonly<LevelProps>) {
	const { micStream, isRequesting, error } = useMicrophone(false);

	return (
		<FlexDiv absolute justify={'center'} align={'center'} padding={64} gap={24}>
			<Level {...props} audioStream={isRequesting ? null : micStream.current} />
			<Label>{error ? error.message : 'Say something!'}</Label>
		</FlexDiv>
	);
}
