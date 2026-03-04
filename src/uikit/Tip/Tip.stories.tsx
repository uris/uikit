import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import type { ToolTip } from 'src/uikit/sharedTypes';
import { useToolTip } from '../../hooks/useToolTip/useToolTip';
import { IconButton } from '../IconButton';
import { Tip } from './Tip';

const meta: Meta<typeof Tip> = {
	title: 'Components/Tip',
	component: Tip,
	args: {
		tip: undefined,
		bgColor: undefined,
		border: undefined,
		borderColor: undefined,
		radius: undefined,
		color: undefined,
		coords: { x: 0, y: 0 },
		padding: undefined,
		size: 'm',
	},
};

export default meta;

export const Default: StoryObj<typeof Tip> = {
	render: (args) => {
		const [tip, setTip] = useState<ToolTip | null>(null);
		const tipRef = useRef<HTMLDivElement>(null);
		const coords = useToolTip(tip, tipRef);

		const handleToolTip = (tip: ToolTip | null) => {
			setTip(tip);
		};

		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<IconButton
					icon={'home'}
					tooltip={'Go Home'}
					onToolTip={handleToolTip}
				/>
				<Tip {...args} coords={coords} tip={tip} ref={tipRef} />
			</FlexDiv>
		);
	},
};
