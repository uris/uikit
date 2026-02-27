import { AvatarProps } from '../uikit/Avatar';

export function setSizeStyle(size: string | number | undefined): string {
	if (!size) return 'auto';
	if (typeof size === 'string') return size;
	return `${size}px`;
}

/**
 * Clean up string with html
 */
export function cleanString(
	input: string,
	removeInvisible = true,
	removeHtml = true,
) {
	let clean: string = input;
	const scriptsRegEx = /\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	clean = clean.replace(scriptsRegEx, '');
	if (removeInvisible) {
		const invisibleRegEx = /[\r\n\t]/gi;
		clean = clean.replace(invisibleRegEx, '');
	}
	if (removeHtml) {
		const htmlRegEx = /<\/?[a-z][^>]*>/gi;
		clean = clean.replace(htmlRegEx, '');
	}
	return clean;
}

/**
 * Check set theme
 */
export function isDarkMode(): boolean {
	const theme = document.documentElement.dataset.theme;
	return theme?.includes('dark') ?? false;
}

/**
 * Debug component rendering
 * Code removed when built / deployed
 */
export function debug(previous: any, updated: any, name = 'component') {
	if (process.env.NODE_ENV === 'test') return; // exit if running tests
	const reasons = [];
	const props = previous.current.props;
	const mount = previous.current.mount;
	const unmount = previous.current.unmount;

	if (mount) {
		console.log({
			component: name,
			'(re)render': true,
			event: 'Component Mount',
		});
	} else if (unmount) {
		console.log({
			component: name,
			'(re)render': false,
			event: 'Component Unmount',
		});
	} else {
		for (const key of Object.keys(updated)) {
			if (updated[key] !== props[key]) {
				try {
					const propName = `${key}:`;
					const prev = JSON.stringify(props[key]);
					const next = JSON.stringify(updated[key]);
					const valueChanged = `${prev} > ${next}`;
					reasons.push(`${propName} ${valueChanged}`);
				} catch (error) {
					let message = 'Unknown error';
					if (error instanceof Error) message = error.message;
					if (typeof error === 'string') message = error;
					reasons.push(`${key} ${message}`);
				}
			}
		}
		console.log({
			component: name,
			'(re)render': true,
			event: 'Props Change',
			props: reasons,
		});
	}
	return { props: updated, mount: false, unmount: false };
}
export function setProps(props: any, mount = false, unmount = false) {
	if (process.env.NODE_ENV === 'test') return; // exit if running tests
	return { props, mount, unmount };
}

/**
 * convert hex to rgb
 */
export const hexToRgb = (hex: string | undefined) => {
	if (!hex) return undefined;
	const r = Number.parseInt(hex.slice(1, 3), 16);
	const g = Number.parseInt(hex.slice(3, 5), 16);
	const b = Number.parseInt(hex.slice(5, 7), 16);
	return `"rgb(${r}, ${g}, ${b})"`;
};
