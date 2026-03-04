import { useEffect, useRef, useState } from 'react';

export enum FormFactor {
	Mobile = 'mobile',
	Tablet = 'tablet',
	Desktop = 'desktop',
}

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

export function useWindow(top = true) {
	const [viewportWidth, setViewportWidth] = useState<number | null>(null);
	const [viewportHeight, setViewportHeight] = useState<number | null>(null);
	const [height, setHeight] = useState<string>('100vh');
	const [formFactor, setFormFactor] = useState<FormFactor>(FormFactor.Desktop);

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize, false);
		return () => window.removeEventListener('resize', handleResize, false);
	}, []);

	function handleResize() {
		const windowWidth = top
			? (window.top?.innerWidth ?? window.innerWidth)
			: window.innerWidth;
		const windowHeight = top
			? (window.top?.innerHeight ?? window.innerHeight)
			: window.innerHeight;
		if (windowWidth <= 480) setFormFactor(FormFactor.Mobile);
		else if (windowWidth < 860) setFormFactor(FormFactor.Tablet);
		else setFormFactor(FormFactor.Desktop);
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
