import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef } from 'react';
import { FlexDiv } from 'src/components/FlexDiv/FlexDiv';
import { ModalController } from 'src/components/ModalController/ModalController';
import { useModalActions } from '../../stores';
import { Button } from '../Button';
import { Modal } from '../Modal';
import type { ModalAction, ModalProps } from '../Modal/_types';

type DemoModalType = { modalId: string; data: string };

const demoActions: ModalAction<DemoModalType>[] = [
	{
		id: 'no',
		label: 'No',
		promise: 'resolve',
		value: { modalId: 'modal-confirm', data: 'no' },
	},
	{
		id: 'yes',
		label: 'Yes',
		promise: 'resolve',
		value: { modalId: 'modal-confirm', data: 'yes' },
		primary: true,
	},
];

const demoModalProps: ModalProps<DemoModalType> = {
	title: 'Continue?',
	actions: demoActions,
	children: 'Are you sure you want to continue',
};

const meta: Meta<typeof ModalController> = {
	title: 'Components/ModalController',
	component: ModalController,
	args: {},
};

export default meta;

export const Default: StoryObj<typeof ModalController> = {
	render: () => {
		return <ModalControllerDemo />;
	},
};

function ModalControllerDemo() {
	const modalResponse = useModalActions().modalResponse;
	const ref = useRef<HTMLDivElement>(null);

	// await the modal response value
	const showAsyncModalClick = async () => {
		const result = await modalResponse<DemoModalType>({
			id: 'modal-confirm',
			component: Modal<DemoModalType>,
			props: demoModalProps,
		}).catch((err) => {
			const msg = err instanceof Error ? err.message : String(err);
			alert(msg);
		});
		if (result) alert(`id: ${result.modalId}, data: ${result.data}`);
	};

	return (
		<FlexDiv absolute justify={'center'} align={'center'} ref={ref}>
			<Button iconRight={'arrow right'} onClick={showAsyncModalClick}>
				Continue
			</Button>
			<ModalController dragConstraintsRef={ref} draggable={true} />
		</FlexDiv>
	);
}
