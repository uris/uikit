export function nameAndExtension(fileName: string) {
	const ext = fileName.split('.').pop() ?? 'unknown';
	return { name: fileName, ext };
}

export function fileIconName(extension: string) {
	switch (extension) {
		case 'png':
		case 'jpeg':
		case 'jpg':
		case 'gif':
		case 'heic':
			return 'image';
		case 'docx':
		case 'doc':
		case 'txt':
			return 'text';
		case 'xls':
		case 'xlsx':
		case 'csv':
			return 'sheet';
		case 'ppt':
		case 'pptx':
			return 'preso';
		case 'pdf':
			return 'pdf';
		case 'mp3':
		case 'aif':
		case 'wav':
			return 'audio';
		case 'mp4':
		case 'mov':
			return 'video';
		default:
			return 'other';
	}
}
