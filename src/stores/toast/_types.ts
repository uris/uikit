import type { ToastType } from '../../components/Toast';

export type Toast = {
	message: string | null;
	duration?: number | 'Infinite';
	type?: ToastType;
	close?: boolean;
	position?: 'top' | 'bottom';
	progress?: boolean;
};
export interface ToastStore {
	toast: Toast | null;
	actions: {
		push: (toast: Toast | null) => void;
		clear: () => void;
	};
}
