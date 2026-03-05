import type { ToastType } from '../../uikit/Toast';

export type Toast = {
	message: string | null;
	duration?: number;
	type?: ToastType;
	close?: boolean;
};
export interface ToastStore {
	toast: Toast | null;
	actions: {
		push: (toast: Toast | null) => void;
		clear: () => void;
	};
}
