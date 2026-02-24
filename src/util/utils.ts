import { AvatarProps } from '../uikit/Avatar';

export function setSizeStyle(size: string | number | undefined): string {
	if (!size) return 'auto';
	if (typeof size === 'string') return size;
	return `${size}px`;
}

// clean up a string and reomve possible issues with script tags etc.
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

export function isDarkMode(): boolean {
	const theme = document.documentElement.dataset.theme;
	return theme?.includes('dark') ?? false;
}

/**
 * Debug renders
 * Code removed in builds with rollup
 */
export function debug(previous: any, updated: any, name = 'component') {
	if (process.env.NODE_ENV !== 'prod') {
		if (process.env.NODE_ENV === 'test') return;
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
					const propName = `${key}:`;
					const valueChanged = `${props[key]} > ${updated[key]}`;
					reasons.push(`${propName} ${valueChanged}`);
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
	return undefined;
}
export function setProps(props: any, mount = false, unmount = false) {
	if (process.env.NODE_ENV !== 'production') {
		if (process.env.NODE_ENV === 'test') return;
		return { props, mount, unmount };
	}
	return undefined;
}
