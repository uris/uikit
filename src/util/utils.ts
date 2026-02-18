export function setSizeStyle(size: string | number | undefined): string {
	if (!size) return "auto";
	if (typeof size === "string") return size;
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
	clean = clean.replace(scriptsRegEx, "");
	if (removeInvisible) {
		const invisibleRegEx = /[\r\n\t]/gi;
		clean = clean.replace(invisibleRegEx, "");
	}
	if (removeHtml) {
		const htmlRegEx = /<\/?[a-z][^>]*>/gi;
		clean = clean.replace(htmlRegEx, "");
	}
	return clean;
}
