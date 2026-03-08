import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fileIconName, nameAndExtension } from '../../util/files';
import { accessibleKeyDown, setStyle } from '../../util/utils';
import { FileIcon } from '../FileIcon';
import { Icon } from '../Icon';
import { ProgressIndicator } from '../Progress';
import type { ToolTip } from '../sharedTypes';
import css from './FileList.module.css';
import type { FileInput, FileItem, FileItems, FileListProps } from './_types';

/**
 * utility list items to array
 */
function toArray(items?: FileInput): FileItems {
	if (!items) return [];
	if (Array.isArray(items)) return items;
	return Array.from(items).map((file) => ({ file }));
}

/**
 * utility get file name from file item
 */
function fileNameFromItem(item: FileItem): string {
	return typeof item.file === 'string' ? item.file : item.file.name;
}

/**
 * cal progress as a percentage string
 */
function normalizeProgress(progress?: number): string {
	if (progress === undefined || Number.isNaN(progress)) return '0%';
	const percent = progress <= 1 ? progress * 100 : progress;
	const clamped = Math.max(0, Math.min(100, percent));
	return `${Math.round(clamped)}%`;
}

/**
 * display the progress indicator if uploading
 */
function displayProgress(uploading: boolean | undefined): React.CSSProperties {
	if (!uploading) return { display: 'none' };
	return { display: 'flex' };
}

/**
 * display the remove button if not uploading
 */
function displayClose(uploading: boolean | undefined): React.CSSProperties {
	if (!uploading) return { display: 'flex' };
	return { display: 'none' };
}

export const FileList = React.memo((props: FileListProps) => {
	const {
		files,
		onChange,
		onToolTip,
		maxWidth,
		minWidth,
		direction = 'row',
		padding,
		gap = 10,
		size = 's',
		iconSize = 24,
		...divAttributes
	} = props;
	const [listItems, setListItems] = useState<FileItems>(() => toArray(files));

	// div attributes to add
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';

	// convert file name to file item name, type
	const fileNameToFileItem = useCallback((fileName: string) => {
		const { ext, name } = nameAndExtension(fileName);
		const icon = fileIconName(ext);
		return { name, ext, icon };
	}, []);

	// memoize ready-to-render list
	const displayList = useMemo(() => {
		return listItems.map((item, index) => {
			const fileName = fileNameFromItem(item);
			const fileMeta = fileNameToFileItem(fileName);
			const progress = normalizeProgress(item.progress);
			return {
				...fileMeta,
				key: `${fileMeta.name}-${index}`,
				index,
				uploading: item.uploading ?? false,
				progress,
				error: item.error,
			};
		});
	}, [listItems, fileNameToFileItem]);

	// update list items if props change
	useEffect(() => setListItems(toArray(files)), [files]);

	// remove items from the list
	const handleRemove = useCallback(
		(index: number) => {
			const updated = listItems.filter((_, itemIndex) => itemIndex !== index);
			setListItems(updated);
			onChange?.(updated);
		},
		[listItems, onChange],
	);

	// show remove tooltip
	const handleMouseOver = useCallback(
		(
			e: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>,
		) => {
			const toolTip: ToolTip = {
				payload: { label: 'Remove file' },
				ref: { current: e.currentTarget },
			};
			onToolTip?.(toolTip);
		},
		[onToolTip],
	);

	// hide remove tooltip
	const handleMouseOut = useCallback(() => {
		onToolTip?.(null);
	}, [onToolTip]);

	// memo style vars
	const cssVars = useMemo(() => {
		return {
			'--file-max-width': direction === 'column' ? '100%' : setStyle(maxWidth),
			'--file-min-width':
				direction === 'column' && !minWidth ? '100%' : setStyle(minWidth),
			'--file-gap': setStyle(gap),
			'--file-direction': direction,
			'--file-wrap': direction === 'column' ? 'nowrap' : 'wrap',
			'--file-padding': padding ? setStyle(padding) : '4px 4px 4px 2px',
			'--file-icon-size': setStyle(iconSize),
		} as React.CSSProperties;
	}, [maxWidth, gap, direction, minWidth, padding, iconSize]);

	// CSS var for then progress of each file
	const fileCSSVars = useCallback((progress: string, error?: string) => {
		return {
			'--file-progress': `${progress}`,
			'--file-border-color': error
				? 'var(--feedback-warning)'
				: 'var(--core-outline-primary)',
		} as React.CSSProperties;
	}, []);

	return (
		<div
			className={`${css.wrapper}${divClass}`}
			style={{ ...divStyle, ...cssVars }}
			id={divId}
			{...rest}
		>
			{displayList.map((i) => (
				<div
					key={i.key}
					className={`${css.file} ${css[size]}`}
					style={fileCSSVars(i.progress, i.error)}
				>
					<div className={css.fileIcon}>
						<FileIcon name={i.icon} size={iconSize} />
					</div>
					<div className={css.meta}>
						<div className={css.fileName}>{i.name}</div>
						{i.error && (
							<div className={`${css.status} ${i.error ? css.error : ''}`}>
								{i.error}
							</div>
						)}
					</div>
					<div className={css.icon} style={displayProgress(i.uploading)}>
						<ProgressIndicator inline size={20} show={i.uploading} />
					</div>
					<div
						className={css.icon}
						style={displayClose(i.uploading)}
						role={'button'}
						aria-label={'remove file'}
						onMouseOver={handleMouseOver}
						onMouseOut={handleMouseOut}
						onFocus={handleMouseOver}
						onBlur={handleMouseOut}
						onClick={() => handleRemove(i.index)}
						onKeyDown={(e) => accessibleKeyDown(e, () => handleRemove(i.index))}
						tabIndex={0}
					>
						<Icon name={'x'} style={{ pointerEvents: 'none' }} />
					</div>
				</div>
			))}
		</div>
	);
});
