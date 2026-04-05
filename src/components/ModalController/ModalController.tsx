import {
	AnimatePresence,
	type Transition,
	motion,
	useDragControls,
} from 'motion/react';
import type React from 'react';
import { useModal, useModalActions } from '../../stores';
import { Overlay } from '../Overlay';
import css from './ModalController.module.css';
import type { ModalControllerProps } from './_types';

const defaultTransition: Transition = {
	ease: 'easeOut',
	duration: 0.25,
	delay: 0.1,
};
const defaultVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 20 },
};

export function ModalController(props: Readonly<ModalControllerProps>) {
	const {
		dragConstraintsRef,
		transition = defaultTransition,
		variants = defaultVariants,
		initial = 'initial',
		animate = 'animate',
		exit = 'exit',
		draggable = true,
		overlayOpacity = 0.7,
		overlayColor = 'rgb(0,0,0)',
	} = props;
	const controls = useDragControls();
	const modal = useModal();
	const resolve = useModalActions().resolve;
	const reject = useModalActions().reject;
	const hide = useModalActions().hide;
	const ModalComponent = modal?.component;
	const modalProps = modal?.props;

	return (
		<>
			<Overlay
				show={!!modal}
				type={'dark'}
				opacity={overlayOpacity}
				color={overlayColor}
				onClick={() => hide()}
			/>
			<AnimatePresence>
				{modal && ModalComponent && (
					<motion.div
						className={css.wrapper}
						variants={variants}
						initial={initial}
						animate={animate}
						exit={exit}
						transition={transition}
						drag={draggable}
						dragListener={draggable ? false : undefined}
						dragControls={draggable ? controls : undefined}
						dragConstraints={draggable ? dragConstraintsRef : undefined}
						dragElastic={draggable ? 0 : undefined}
						dragMomentum={draggable ? false : undefined}
					>
						<ModalComponent
							{...modalProps}
							onResolve={(value) => {
								if (typeof modalProps?.onResolve === 'function') {
									modalProps.onResolve(value);
								}
								resolve(value);
							}}
							onReject={(error) => {
								if (typeof modalProps?.onReject === 'function') {
									modalProps.onReject(error);
								}
								reject(error);
							}}
							onClose={() => {
								if (typeof modalProps?.onClose === 'function') {
									modalProps.onClose();
								}
								hide();
							}}
							onDragPointerDown={(e) => {
								if (typeof modalProps?.onDragPointerDown === 'function') {
									modalProps?.onDragPointerDown(e);
								}
								controls.start(e);
							}}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
