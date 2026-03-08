export type WindowStore = {
	formFactor: FormFactor;
	dpr: 1 | 2 | 3;
	isAppleDevice: boolean;
	isTouchDevice: boolean;
	isElectron: boolean;
	height: string;
	viewportWidth: number;
	viewportHeight: number;
	actions: {
		initialize: () => () => void;
	};
};

/**
 * Form factor names
 */
export enum FormFactor {
	Mobile = 'mobile',
	Tablet = 'tablet',
	Desktop = 'desktop',
	DesktopL = 'desktopL',
	DesktopXL = 'desktopXL',
}

export type BreakPoints = Record<FormFactor, number>;

/**
 * Use bootstrap breakpoints
 */
export const bootstrapBreakPoints: BreakPoints = {
	[FormFactor.Mobile]: 576,
	[FormFactor.Tablet]: 768,
	[FormFactor.Desktop]: 992,
	[FormFactor.DesktopL]: 1200,
	[FormFactor.DesktopXL]: 1400,
};
