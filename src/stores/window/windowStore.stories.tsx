import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { FlexDiv } from '../../uikit/FlexDiv';
import {
	useDpr,
	useFormFactor,
	useInitializeWindow,
	useIsAppleDevice,
	useIsElectron,
	useIsTouchDevice,
	useViewportHeight,
	useViewportWidth,
	useWindowStore,
} from './windowStore';

function WindowStoreDemo() {
	const initialize = useInitializeWindow();
	const formFactor = useFormFactor();
	const viewportWidth = useViewportWidth();
	const viewportHeight = useViewportHeight();
	const isTouchDevice = useIsTouchDevice();
	const isElectron = useIsElectron();
	const isAppleDevice = useIsAppleDevice();
	const dpr = useDpr();
	const height = useWindowStore((state) => state.height);

	useEffect(() => initialize(), [initialize]);

	return (
		<FlexDiv
			absolute
			width={'fill'}
			height={'fill'}
			alignItems={'center'}
			justify={'center'}
			padding={24}
		>
			<FlexDiv
				width={420}
				height={'auto'}
				direction={'column'}
				gap={10}
				padding={16}
				border={'1px solid var(--core-outline-primary)'}
				background={'var(--core-surface-secondary)'}
			>
				<span>
					Viewport: {viewportWidth ?? '-'} x {viewportHeight ?? '-'}
				</span>
				<span>Form Factor: {formFactor}</span>
				<span>Touch Device: {isTouchDevice ? 'true' : 'false'}</span>
				<span>Electron: {isElectron ? 'true' : 'false'}</span>
				<span>IsAppleDevice: {isAppleDevice ? 'true' : 'false'}</span>
				<span>Display Pixel Density: {dpr}</span>
				<span>"True" height token: {height}</span>
			</FlexDiv>
		</FlexDiv>
	);
}

const meta: Meta<typeof WindowStoreDemo> = {
	title: 'Stores/Window Store',
	component: WindowStoreDemo,
	parameters: {
		layout: 'padded',
	},
};

export default meta;

export const Demo: StoryObj<typeof WindowStoreDemo> = {};
