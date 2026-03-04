import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';
import { FlexDiv } from '../../uikit/FlexDiv';
import { IconButton } from '../../uikit/IconButton';
import { Tip } from '../../uikit/Tip/Tip';
import type { ToolTip } from '../../uikit/sharedTypes';
import { useToolTip } from './useToolTip';

function UseToolTipDemo() {
	const [tip, setTip] = useState<ToolTip | null>(null);
	const tipRef = useRef<HTMLDivElement>(null);
	const coords = useToolTip(tip, tipRef);

	return (
		<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
			<IconButton
				icon={'home'}
				tooltip={'Click Me'}
				onToolTip={(nextTip) => setTip(nextTip)}
			/>
			<Tip coords={coords} tip={tip} ref={tipRef} size={'m'} />
		</FlexDiv>
	);
}

const meta: Meta<typeof UseToolTipDemo> = {
	title: 'Hooks/useToolTip',
	component: UseToolTipDemo,
	parameters: {
		layout: 'padded',
	},
};

export default meta;

export const Demo: StoryObj<typeof UseToolTipDemo> = {};
