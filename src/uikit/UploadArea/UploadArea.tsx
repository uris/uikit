import React, { useCallback, useMemo, useRef, useState } from 'react';
import { accessibleKeyDown, setStyle } from '../../util/utils';
import { FileList } from '../FileList';
import { Icon } from '../Icon';
import { ProgressIndicator } from '../Progress';
import css from './UploadArea.module.css';
import { type UploadAreaProps, allTypes } from './_types';

const UploadAreaBase = React.forwardRef<HTMLDivElement, UploadAreaProps>(
	(props, ref) => {
		const {
			icon = 'upload',
			iconColor = 'var(--core-text-primary)',
			iconColorHover = 'var(--core-text-special)',
			title = 'Upload Files',
			width = '100%',
			height = 'auto',
			message = 'Drag and drop files here or click to upload',
			busyMessage = 'Uploading in progress',
			iconSize = 24,
			textSize = 'm',
			border = 1,
			borderStyle = 'dashed',
			borderColor = 'var(--core-outline-primary)',
			borderColorHover = 'var(--core-outline-special)',
			radius = 8,
			padding = 32,
			bgColor = 'var(--core-surface-secondary)',
			bgColorHover = 'var(--core-surface-special)',
			acceptedTypes = allTypes,
			multiple = true,
			busy = false,
			canRemove = true,
			showProgress = true,
			files = [],
			onUpload,
		} = props;
		const [hovered, setHovered] = useState<boolean>(false);
		const inputRef = useRef<HTMLInputElement>(null);
		const dragDepth = useRef(0);

		// set uploading files

		// *** select files

		// callback to trigger click
		const handleClickUpload = useCallback(() => {
			if (busy) return;
			if (!inputRef?.current) return;
			inputRef.current.value = '';
			inputRef.current?.click();
		}, [busy]);

		// call back on file change
		const handleFileInputChange = useCallback(
			(e: React.ChangeEvent<HTMLInputElement>) => {
				if (busy) return;
				if (!e.target.files) return;
				onUpload?.(Array.from(e.target.files));
			},
			[busy, onUpload],
		);

		// *** drag/drop

		// check for files to light up hover
		const hasFilesInDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
			return Array.from(e.dataTransfer?.types ?? []).includes('Files');
		}, []);

		// use counters for responsive feedback
		const handleDragEnter = useCallback(
			(e: React.DragEvent<HTMLDivElement>) => {
				e.preventDefault();
				if (busy || !hasFilesInDrag(e)) return;
				dragDepth.current += 1;
				if (dragDepth.current === 1) setHovered(true);
			},
			[busy, hasFilesInDrag],
		);

		// prevent default since "drop" happens when "over"
		const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
			e.preventDefault();
		};

		// at 0 hover is over
		const handleDragLeave = useCallback(
			(e: React.DragEvent<HTMLDivElement>) => {
				e.preventDefault();
				if (busy) return;
				dragDepth.current = Math.max(0, dragDepth.current - 1);
				if (dragDepth.current === 0) setHovered(false);
			},
			[busy],
		);

		// handle drop
		const handleDrop = useCallback(
			(e: React.DragEvent<HTMLDivElement>) => {
				e.preventDefault();
				if (busy) return;
				dragDepth.current = 0;
				setHovered(false);
				const files = Array.from(e.dataTransfer.files ?? []);
				onUpload?.(files);
			},
			[busy, onUpload],
		);

		// icon color
		const iconStrokeColor = useMemo(() => {
			if (hovered) return iconColorHover;
			return iconColor;
		}, [hovered, iconColor, iconColorHover]);

		const cssVars = useMemo(() => {
			return {
				'--ua-border': `${border}px`,
				'--ua-border-style': borderStyle,
				'--ua-border-color': hovered || busy ? borderColorHover : borderColor,
				'--ua-radius': `${radius}px`,
				'--ua-padding': setStyle(padding),
				'--ua-bg-color': hovered ? bgColorHover : bgColor,
				'--ua-icon-size': `${iconSize}px`,
				'--ua-cursor': busy ? 'default' : 'pointer',
				'--ua-width': setStyle(width),
				'--ua-height': setStyle(height),
			} as React.CSSProperties;
		}, [
			border,
			borderStyle,
			borderColor,
			borderColorHover,
			radius,
			padding,
			bgColor,
			bgColorHover,
			iconSize,
			busy,
			hovered,
			height,
			width,
		]);

		return (
			<div
				className={css.wrapper}
				style={cssVars}
				ref={ref}
				role={'button'}
				aria-label={'Click to upload files'}
				tabIndex={0}
				onClick={handleClickUpload}
				onKeyDown={(e) => accessibleKeyDown(e, () => handleClickUpload())}
				onDragEnter={handleDragEnter}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<div className={css.icon}>
					<Icon
						size={iconSize}
						name={icon}
						strokeColor={iconStrokeColor}
						pointer={false}
					/>
				</div>
				<div className={css.title}>{title}</div>
				<div className={`${css.message} ${css[textSize]}`}>
					{busy && showProgress && (
						<ProgressIndicator show size={20} inline color={iconStrokeColor} />
					)}
					{busy ? busyMessage : message}
				</div>
				{files.length > 0 && (
					<div className={css.files}>
						<FileList
							files={files}
							bgColor={'var(--core-surface-primary)'}
							size={'m'}
							direction={'column'}
							gap={8}
							iconSize={24}
							padding={'10px'}
							canRemove={canRemove}
						/>
					</div>
				)}
				<input
					ref={inputRef}
					type="file"
					hidden={true}
					disabled={busy}
					multiple={multiple}
					accept={acceptedTypes ? acceptedTypes.join(', ') : undefined}
					onChange={handleFileInputChange}
				/>
			</div>
		);
	},
);

UploadAreaBase.displayName = 'UploadArea';

export const UploadArea = React.memo(UploadAreaBase);
