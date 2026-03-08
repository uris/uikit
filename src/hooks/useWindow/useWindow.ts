import { useCallback, useEffect, useState } from 'react';

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

/**
 * Breakpoint type matching form factor to width value
 */
export type BreakPoints = Record<FormFactor, number>;

/**
 * Use bootstrap proxy breakpoints as defaults
 */
const bootstrapBreakPoints: BreakPoints = {
	[FormFactor.Mobile]: 576,
	[FormFactor.Tablet]: 768,
	[FormFactor.Desktop]: 992,
	[FormFactor.DesktopL]: 1200,
	[FormFactor.DesktopXL]: 1400,
};

function checkElectron() {
	const userAgent = navigator.userAgent.toLowerCase();
	return userAgent.includes('electron/');
}

const isElectron = checkElectron();
const isAppleDevice =
	navigator.platform.startsWith('Mac') || navigator.platform === 'iPhone';
const dpr = (Math.min(Math.ceil(window.devicePixelRatio), 3) as 1 | 2 | 3) ?? 1;
const isTouchDevice =
	'ontouchstart' in globalThis || navigator.maxTouchPoints > 0;

// pre-ordered break points from larget to smallest
const orderedBps = Object.entries(bootstrapBreakPoints).sort(
	(a, b) => -b[1] - a[1],
) as [FormFactor, number][];

export function useWindow(breakpoints = bootstrapBreakPoints, top = true) {
	const [viewportWidth, setViewportWidth] = useState<number | null>(null);
	const [viewportHeight, setViewportHeight] = useState<number | null>(null);
	const [height, setHeight] = useState<string>('100vh');
	const [formFactor, setFormFactor] = useState<FormFactor>(FormFactor.Desktop);

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize, false);
		return () => window.removeEventListener('resize', handleResize, false);
	}, []);

	// callback to set form factor based on break points
	const getFormFactor = useCallback((width: number) => {
		if (!width || width <= 0) return FormFactor.Mobile;
		for (const [formFactor, breakpoint] of orderedBps) {
			if (width >= breakpoint) return formFactor;
		}
		return FormFactor.Mobile;
	}, []);

	function handleResize() {
		const windowWidth = top
			? (window.top?.innerWidth ?? window.innerWidth)
			: window.innerWidth;
		const windowHeight = top
			? (window.top?.innerHeight ?? window.innerHeight)
			: window.innerHeight;
		setFormFactor(getFormFactor(windowWidth));
		setViewportHeight(windowHeight);
		setViewportWidth(windowWidth);
		// note: mobile devices can have task bars that are included inside the viewport.
		// for mobile devices, set root containers to the inner height pixel which removes
		// the height of any toolbars and provides the "true" view port height
		if (!isElectron) setHeight(isTouchDevice ? `${windowHeight}px` : '100vh');
	}

	return {
		viewportWidth,
		viewportHeight,
		height,
		isTouchDevice,
		isElectron,
		isAppleDevice,
		formFactor,
		dpr,
	};
}
