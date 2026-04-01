import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from 'src/components/Button';
import { FlexDiv } from 'src/components/FlexDiv';
import { Label } from 'src/components/Label';
import { useMicrophone } from 'src/hooks/useMicrophone/useMicrophone';
import {
	useMicActive,
	useMicError,
	useMicMuted,
	useMicOptions,
	useMicRequesting,
	useMicSupported,
	useMicTrack,
	useMicrophoneStoreActions,
	useSyncMicrophoneStore,
} from 'src/stores/microphone';

function MicrophoneStoreDemo() {
	const microphone = useMicrophone(true, undefined, false);
	useSyncMicrophoneStore(microphone);

	const micTrack = useMicTrack();
	const isActive = useMicActive();
	const muted = useMicMuted();
	const isSupported = useMicSupported();
	const isRequesting = useMicRequesting();
	const error = useMicError();
	const micOptions = useMicOptions();
	const actions = useMicrophoneStoreActions();

	return (
		<FlexDiv width={'fill'} height={'fill'} padding={32} gap={16}>
			<div>
				Store-bound microphone state from a single `useMicrophone()` instance.
			</div>
			<div>
				Supported: <Label>{String(isSupported)}</Label>
			</div>
			<div>
				Requesting: <Label>{String(isRequesting)}</Label>
			</div>
			<div>
				Active: <Label>{String(isActive)}</Label>
			</div>
			<div>
				Muted: <Label>{String(muted)}</Label>
			</div>
			<div>
				Track ready: <Label>{micTrack.current?.readyState ?? 'none'}</Label>
			</div>
			<div>
				Microphones: <Label>{String(micOptions.length)}</Label>
			</div>
			<div>
				Error: <Label>{error?.message ?? 'none'}</Label>
			</div>
			<FlexDiv direction={'row'} wrap gap={8}>
				<Button
					label={'Request Microphone'}
					onClick={() => void actions.requestMicrophone()}
				/>
				<Button label={'Toggle Mute'} onClick={() => actions.toggleMute()} />
				<Button
					label={'Refresh Devices'}
					onClick={() => void actions.refreshMicrophones()}
				/>
				<Button label={'Stop'} onClick={() => actions.stopMicrophone()} />
			</FlexDiv>
		</FlexDiv>
	);
}

const meta: Meta<typeof MicrophoneStoreDemo> = {
	title: 'Stores/Microphone Store',
	component: MicrophoneStoreDemo,
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;

export const Demo: StoryObj<typeof MicrophoneStoreDemo> = {};
