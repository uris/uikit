import React, { useCallback, useMemo } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import css from './Avatar.module.css';
import type { AvatarProps } from './_types';

export const Avatar = React.memo((props: AvatarProps) => {
	const {
		first = '',
		last = '',
		image = '',
		border = 0,
		color = undefined,
		borderColor = undefined,
		bgColor = undefined,
		firstOnly = false,
		onClick = undefined,
		onKeyDown = undefined,
		fontSize = undefined,
		onToolTip = () => null,
		size = 34,
		frame = 34,
		tabIndex = 0,
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';

	// memo initials computation
	const initials = useMemo(
		() => `${first?.charAt(0)}${firstOnly ? '' : last.charAt(0)}`,
		[first, last, firstOnly],
	);

	// memo the avatar image if there is one
	const bgImage = useMemo(() => {
		if (firstOnly) return '';
		return image ? `url(${image})` : '';
	}, [firstOnly, image]);

	// calc and memo font size
	const setFontSize = useMemo(() => {
		if (fontSize === undefined) return 'inherit';
		if (fontSize === 'auto') {
			let fSize = Math.round(frame / 3);
			fSize = Math.min(fSize, 24);
			fSize = Math.max(fSize, 14);
			return `${fSize}px`;
		}
		return `${fontSize}px`;
	}, [frame, fontSize]);

	// memo display content
	const displayContent = useMemo(
		() => (firstOnly || !image ? initials : null),
		[firstOnly, image, initials],
	);

	// handle mouse enter
	const onMouseEnter = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			const payload = { label: first };
			onToolTip({ payload, event });
		},
		[first, onToolTip],
	);

	// handle mouse leave
	const onMouseLeave = useCallback(() => {
		onToolTip(null);
	}, [onToolTip]);

	// memo css vars
	const avatarVars = useMemo(() => {
		return {
			'--avatar-size': `${size}px`,
			'--avatar-frame': `${frame}px`,
			'--avatar-border': `${border}px`,
			'--avatar-color': color ?? 'var(--core-text-primary)',
			'--avatar-bg-color': bgColor ?? 'var(--core-surface-secondary)',
			'--avatar-border-color': borderColor ?? 'var(--core-surface-primary)',
			'--avatar-bg-image': `${bgImage}`,
			'--avatar-font-size': setFontSize,
		} as React.CSSProperties;
	}, [size, frame, border, color, bgColor, borderColor, bgImage, setFontSize]);

	// memo class names
	const classNames = useMemo(() => {
		return `${css.wrapper}${divClass}`;
	}, [divClass]);

	/* START.DEBUG */
	useTrackRenders(props, 'Avatar');
	/* END.DEBUG */

	return (
		<div
			id={divId}
			className={classNames}
			style={{ ...divStyle, ...avatarVars }}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={onClick}
			onKeyDown={onKeyDown}
			role={onClick ? 'button' : 'img'}
			tabIndex={onClick ? tabIndex : undefined}
			aria-label={`User Avatar - ${first}`}
			{...rest}
		>
			<div aria-hidden={true} className={css.user}>
				{displayContent}
			</div>
		</div>
	);
});
