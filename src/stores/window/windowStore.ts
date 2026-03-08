import { create } from 'zustand';
import { FormFactor, type WindowStore, bootstrapBreakPoints } from './_types';

// pre-ordered break points from larget to smallest
const orderedBps = Object.entries(bootstrapBreakPoints).sort(
	(a, b) => -b[1] - a[1],
) as [FormFactor, number][];

// get form factor from break point and current viewport width
const getFormFactor = (width: number | undefined): FormFactor => {
	if (!width || width <= 0) return FormFactor.Mobile;
	for (const [formFactor, breakpoint] of orderedBps) {
		if (width >= breakpoint) return formFactor;
	}
	return FormFactor.Mobile;
};

const initialSize = processWindowSize();

export const useWindowStore = create<WindowStore>((set, get) => ({
	formFactor: initialSize.formFactor,
	viewportWidth: initialSize.viewportWidth,
	viewportHeight: initialSize.viewportHeight,
	height: initialSize.height,
	isElectron: checkElectron(),
	isAppleDevice:
		navigator.platform.startsWith('Mac') || navigator.platform === 'iPhone',
	isTouchDevice: 'ontouchstart' in globalThis || navigator.maxTouchPoints > 0,
	dpr: (Math.min(Math.ceil(window.devicePixelRatio), 3) as 1 | 2 | 3) ?? 1,
	actions: {
		initialize: () => {
			const win = globalThis.top ?? globalThis;
			win?.addEventListener('resize', handleResize);
			return () => win?.removeEventListener('resize', handleResize);
		},
	},
}));

//check electron
function checkElectron() {
	const userAgent = navigator.userAgent.toLowerCase();
	return userAgent.includes('electron/');
}

// resize handler
function handleResize() {
	// process size
	const { formFactor, viewportWidth, viewportHeight, height } =
		processWindowSize();
	// update store directly
	useWindowStore.setState({
		formFactor,
		viewportWidth,
		viewportHeight,
		height,
	});
}

// return size related store values
function processWindowSize(top = true) {
	const viewport = globalThis.top ?? globalThis;
	const touch = 'ontouchstart' in globalThis || navigator.maxTouchPoints > 0;
	const windowWidth = viewport?.innerWidth ?? -1;
	const windowHeight = viewport?.innerHeight ?? -1;
	return {
		formFactor: getFormFactor(windowWidth),
		viewportWidth: windowWidth,
		viewportHeight: windowHeight,
		height: viewport && touch ? `${windowHeight}px` : '100vh',
	};
}

// atomic hook exports for use in React components
export const useFormFactor = () => useWindowStore((state) => state.formFactor);
export const useViewportWidth = () =>
	useWindowStore((state) => state.viewportWidth);
export const useViewportHeight = () =>
	useWindowStore((state) => state.viewportHeight);
export const useIsAppleDevice = () =>
	useWindowStore((state) => state.isAppleDevice);
export const useIsTouchDevice = () =>
	useWindowStore((state) => state.isTouchDevice);
export const useIsElectron = () => useWindowStore((state) => state.isElectron);
export const useDpr = () => useWindowStore((state) => state.dpr);
export const useInitializeWindow = () =>
	useWindowStore((state) => state.actions.initialize);

// non-reactive imperative exports for use outside the React context
export const formFactor = () => useWindowStore.getState().formFactor;
export const viewportWidth = () => useWindowStore.getState().viewportWidth;
export const viewportHeight = () => useWindowStore.getState().viewportHeight;
export const isAppleDevice = () => useWindowStore.getState().isAppleDevice;
export const isTouchDevice = () => useWindowStore.getState().isTouchDevice;
export const isElectron = () => useWindowStore.getState().isElectron;
export const dpr = () => useWindowStore.getState().dpr;
