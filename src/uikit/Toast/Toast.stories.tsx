import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { IconButton } from '../IconButton';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
	title: 'Components/Toast',
	component: Toast,
	args: {
		message: undefined,
		border: undefined,
		radius: undefined,
		padding: undefined,
		offset: undefined,
		position: 'bottom',
		size: 'm',
		close: false,
		type: 'info',
	},
};

export default meta;

export const Default: StoryObj<typeof Toast> = {
	render: (args) => {
		const [message, setMessage] = useState<string | null>(null);

		const handleToast = (msg?: string | null) => {
			setMessage(msg ?? null);
		};

		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<IconButton
					icon={'home'}
					tooltip={'Go Home'}
					onClick={() => handleToast('hi there')}
				/>
				<Toast {...args} message={message} didHide={handleToast} />
			</FlexDiv>
		);
	},
};
