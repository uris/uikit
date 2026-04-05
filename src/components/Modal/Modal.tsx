import React, { useMemo } from 'react';
import { setStyle } from '../../utils/functions/misc';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import css from './Modal.module.css';
import type { ModalAction, ModalProps } from './_types';

const BaseModal = <T = string>(props: ModalProps<T>) => {
	const {
		children,
		id,
		className,
		style,
		minWidth = 300,
		minHeight = 200,
		maxHeight = 400,
		maxWidth = 400,
		padding,
		close = true,
		title,
		titleSize = 'l',
		contentSize = 'm',
		actions,
		titleIcon,
		titleIconFill = true,
		titleBorderColor = 'var(--core-outline-primary)',
		titleBorderWidth = 0,
		actionsBorderColor = 'var(--core-outline-primary)',
		actionsBorderWidth = 0,
		onAction,
		onReject,
		onResolve,
		onClose,
		onToolTip,
		onDragPointerDown,
		backgroundColor = 'var(--core-surface-secondary)',
		titleColor = 'var(--core-text-special)',
		borderColor = 'var(--core-outline-primary)',
		borderRadius = 8,
		borderWidth = 1,
		...rest
	} = props;
	const modalStyle = style ?? ({} as React.CSSProperties);
	const modalClass = className ? ` ${className}` : '';

	// memo dynamic css vars
	const cssVars = useMemo(() => {
		return {
			'--modal-min-width': setStyle(minWidth),
			'--modal-min-height': setStyle(minHeight),
			'--modal-max-height': setStyle(maxHeight),
			'--modal-max-width': setStyle(maxWidth),
			'--modal-border-color': borderColor,
			'--modal-title-color': titleColor,
			'--modal-border-radius': setStyle(borderRadius),
			'--modal-border-width': setStyle(borderWidth),
			'--modal-padding': setStyle(padding, 16),
			'--modal-background-color': backgroundColor,
			'--modal-title-border-color': titleBorderColor,
			'--modal-title-border-width': setStyle(titleBorderWidth),
			'--modal-actions-border-color': actionsBorderColor,
			'--modal-actions-border-width': setStyle(actionsBorderWidth),
		} as React.CSSProperties;
	}, [
		minWidth,
		minHeight,
		maxHeight,
		maxWidth,
		borderColor,
		titleColor,
		borderRadius,
		borderWidth,
		padding,
		titleBorderWidth,
		titleBorderColor,
		actionsBorderWidth,
		actionsBorderColor,
		backgroundColor,
	]);

	// handle the action click event
	const handleAction = (action: ModalAction<T>) => {
		const resolves = !action.promise || action.promise === 'resolve';
		const rejects = action.promise === 'reject';
		onAction?.(action.value);
		if (resolves) onResolve?.(action.value);
		if (rejects) {
			onReject?.(new Error('Modal rejected', { cause: action.value }));
		}
	};

	// Cancel will always reject as user takes no action at all
	const handleClose = () => {
		onReject?.(new Error('Modal was closed', { cause: 'user action' }));
		onClose?.();
	};

	// render action buttons based on their position, if none defined default to right
	const renderActions = (position: 'right' | 'left') => {
		return actions?.map((action, index) => {
			if (!action.position && position === 'left') return null;
			if (action.position && position !== action.position) return null;
			return (
				<Button
					variant={action.primary ? 'solid' : 'outline'}
					key={`${action.id}_${index}`}
					label={action.label}
					onClick={(e) => handleAction(action)}
					round={action.round === true}
					iconLeft={action.iconLeft}
					iconRight={action.iconRight}
					tooltip={action.tooltip}
					onToolTip={(tip) => onToolTip?.(tip)}
				/>
			);
		});
	};

	return (
		<div
			id={id}
			className={`${css.wrapper}${modalClass}`}
			style={{ ...modalStyle, ...cssVars }}
			{...(rest as any)}
		>
			{(title || close) && (
				<div className={`${css.title} ${css[titleSize]}`}>
					<div className={css.titleBlock} onPointerDown={onDragPointerDown}>
						{titleIcon && (
							<div className={css.titleIcon}>
								<Icon name={titleIcon} fill={titleIconFill} size={20} />
							</div>
						)}
						{title}
					</div>
					{close && (
						<div className={css.close}>
							<div className={css.titleIcon}>
								<IconButton
									tooltip={'close'}
									icon={'x'}
									onClick={handleClose}
									onToolTip={(tip) => onToolTip?.(tip)}
								/>
							</div>
						</div>
					)}
				</div>
			)}
			<div className={`${css.content} ${css[contentSize]}`}>{children}</div>
			{actions && actions.length > 0 && (
				<div className={css.actions}>
					<div className={css.leftActions}>{renderActions('left')}</div>
					<div className={css.rightActions}>{renderActions('right')}</div>
				</div>
			)}
		</div>
	);
};

export const Modal = React.memo(BaseModal) as <T = string>(
	props: ModalProps<T>,
) => React.JSX.Element;
