import type { Meta, StoryObj } from '@storybook/react-vite';
import { useToast, useToastActions } from 'src/stores/toast';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';
import { IconButton } from '../../uikit/IconButton';
import { Toast, ToastType } from '../../uikit/Toast';

const meta: Meta<typeof Toast> = {
	title: 'Stores/ToastStore',
	component: Toast,
	args: {
		message: undefined,
		border: undefined,
		radius: undefined,
		padding: undefined,
		offset: undefined,
		position: 'bottom',
		size: 'm',
		close: true,
		type: ToastType.Info,
	},
};

export default meta;

export const Demo: StoryObj<typeof Toast> = {
	render: (args) => {
		const toast = useToast();
		const toastActions = useToastActions();

		const handleToast = (message?: string | null) => {
			const notification = {
				message: message ?? null,
				type: ToastType.Info,
				duration: 5000,
			};
			toastActions.push(notification);
		};

		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<IconButton
					icon={'home'}
					tooltip={'Go Home'}
					onClick={() => handleToast('You clicked home')}
				/>
				<Toast
					{...args}
					message={toast?.message ?? null}
					type={toast?.type ?? args.type}
					close={toast?.close ?? args.close}
					duration={toast?.duration ?? args.duration}
					didHide={toastActions.clear}
				/>
			</FlexDiv>
		);
	},
};
