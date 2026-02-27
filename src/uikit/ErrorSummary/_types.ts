export type ErrorMessage = {
	id?: string;
	title?: string;
	bullets?: string[];
};

export interface ErrorSummaryProps {
	entries?: ErrorMessage[];
	errors?: any[];
}
