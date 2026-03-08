import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { fileIconName, nameAndExtension } from '../../util/files';
import { accessibleKeyDown, setStyle } from '../../util/utils';
import { FileIcon } from '../FileIcon';
import { Icon } from '../Icon';
import type { ToolTip } from '../sharedTypes';
import css from './FileList.module.css';
import type { FileInput, FileItems, FileListProps } from './_types';

function toArray(items?: FileInput): FileItems {
	if (!items) return [];
	return Array.isArray(items) ? items : Array.from(items);
}

export const FileList = React.memo((props: FileListProps) => {
	const {
		files,
		onChange,
		onToolTip,
		maxWidth,
		direction = 'row',
		gap = 10,
		size = 's',
	} = props;
	const removeRef = useRef<HTMLDivElement>(null);
	const [listItems, setListItems] = React.useState<FileItems>(() =>
		toArray(files),
	);

	// convert file name to file item name, type
	const fileNameToFileItem = useCallback((fileName: string) => {
		const { ext, name } = nameAndExtension(fileName) ?? 'unknown';
		const icon = fileIconName(ext);
		return { name, ext, icon };
	}, []);

	// memoize ready to consume ile list
	const displayList = useMemo(() => {
		return listItems.map((item) => {
			const fileName = typeof item === 'string' ? item : item.name;
			return fileNameToFileItem(fileName);
		});
	}, [listItems, fileNameToFileItem]);

	// update list items if props change
	useEffect(() => setListItems(toArray(files)), [files]);

	// remove items from list
	const handleRemove = useCallback(
		(name: string) => {
			const updated = listItems.filter((item) => {
				return (typeof item === 'string' ? item : item.name) !== name;
			});
			setListItems(updated);
			onChange?.(updated);
		},
		[listItems, onChange],
	);

	// show remove tooltip
	const handleMouseOver = useCallback(() => {
		const toolTip: ToolTip = {
			payload: { label: 'Remove file' },
			ref: removeRef,
		};
		onToolTip?.(toolTip);
	}, [onToolTip]);

	// hide remove tooltip
	const handleMouseOut = useCallback(() => {
		onToolTip?.(null);
	}, [onToolTip]);

	// memo style vars
	const cssVars = useMemo(() => {
		return {
			'--file-max-width': direction === 'column' ? '100%' : setStyle(maxWidth),
			'--file-gap': setStyle(gap),
			'--file-direction': direction,
			'--file-wrap': direction === 'column' ? 'nowrap' : 'wrap',
		} as React.CSSProperties;
	}, [maxWidth, gap, direction]);

	return (
		<div className={css.wrapper} style={cssVars}>
			{displayList.map((i) => (
				<div key={`${i.name}`} className={`${css.file} ${css[size]}`}>
					<div className={css.fileIcon}>
						<FileIcon name={i.icon} />
					</div>
					<div className={css.fileName}>{i.name}</div>
					<div
						ref={removeRef}
						className={css.icon}
						role={'button'}
						aria-label={'remove file'}
						onMouseOver={handleMouseOver}
						onMouseOut={handleMouseOut}
						onFocus={handleMouseOver}
						onBlur={handleMouseOut}
						onClick={() => handleRemove(i.name)}
						onKeyDown={(e) => accessibleKeyDown(e, () => handleRemove(i.name))}
						tabIndex={0}
					>
						<Icon name={'x'} style={{ pointerEvents: 'none' }} />
					</div>
				</div>
			))}
		</div>
	);
});
