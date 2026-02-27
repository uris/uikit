import type React from 'react';

export type FileIconDefinition = {
	name: string;
	icon?: any;
};

export enum UIFileIcons {
	Pdf = 'pdf',
	Document = 'document',
	Spreadhseet = 'spreadsheet',
}

export interface UIFileIconProps {
	name?: UIFileIcons | string;
	size?: number;
	pointer?: boolean;
	disabled?: boolean;
	onClick?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}
