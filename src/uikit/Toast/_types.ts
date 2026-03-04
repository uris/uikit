import type { HTMLMotionProps } from 'motion/react';

type ToastBaseProps = {
	message?: string | null;
	size?: 's' | 'm' | 'l';
	border?: boolean;
	padding?: number | string;
	radius?: number | string;
	position?: 'top' | 'bottom';
	offset?: number;
	showDelay?: number;
	duration?: number;
	close?: boolean;
	type?: 'success' | 'error' | 'warning' | 'info';
	didHide?: () => void;
};

// reserved for internal working - not overridable
type ReservedToastEvents =
	| 'onMouseEnter'
	| 'onMouseLeave'
	| 'onFocus'
	| 'onBlur';

export type ToastProps = Omit<
	HTMLMotionProps<'div'>,
	keyof ToastBaseProps | ReservedToastEvents
> &
	ToastBaseProps;
