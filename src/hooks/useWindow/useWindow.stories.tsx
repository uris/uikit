import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from '../../uikit/FlexDiv';
import { useWindow } from './useWindow';

function UseWindowDemo() {
	const win = useWindow();

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
					Viewport: {win.viewportWidth ?? '-'} x {win.viewportHeight ?? '-'}
				</span>
				<span>Form Factor: {win.formFactor}</span>
				<span>Touch Device: {win.isTouchDevice ? 'true' : 'false'}</span>
				<span>Electron: {win.isElectron ? 'true' : 'false'}</span>
				<span>IsAppleDevice: {win.isAppleDevice ? 'true' : 'false'}</span>
				<span>Display Pixel Density: {win.dpr}</span>
				<span>"True" height token: {win.height}</span>
			</FlexDiv>
		</FlexDiv>
	);
}

const meta: Meta<typeof UseWindowDemo> = {
	title: 'Hooks/useWindow',
	component: UseWindowDemo,
	parameters: {
		layout: 'padded',
	},
};

export default meta;

export const Demo: StoryObj<typeof UseWindowDemo> = {};
