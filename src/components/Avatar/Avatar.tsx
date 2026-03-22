import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import {
	accessibleKeyDown,
	normalizedPercent,
	setStyle,
} from '../../utils/functions/misc';
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
	const ref = useRef<HTMLDivElement>(null);
	const [textSize, setTextSize] = useState<number | string>('inherit');

	// derive the fallback initials shown when no image is rendered
	const initials = useMemo(
		() => `${first?.charAt(0)}${firstOnly ? '' : last.charAt(0)}`,
		[first, last, firstOnly],
	);

	// resolve the optional background image for the avatar frame
	const bgImage = useMemo(() => {
		if (firstOnly) return '';
		return image ? `url(${image})` : '';
	}, [firstOnly, image]);

	// sync the rendered font size from the configured size mode
	useEffect(() => {
		if (fontSize === undefined) {
			setTextSize('inherit');
			return;
		}
		if (
			fontSize === 'auto' ||
			(typeof fontSize === 'number' && fontSize <= 1)
		) {
			const parentHeight = ref.current?.offsetHeight;
			if (!parentHeight) {
				setTextSize('inherit');
				return;
			}
			let size = 0.5;
			if (typeof fontSize === 'number') size = fontSize;
			const fSize = Math.round(parentHeight * size);
			setTextSize(fSize);
			return;
		}
		if (typeof fontSize === 'string' && fontSize.includes('%')) {
			const normalized = normalizedPercent(fontSize);
			setTextSize(normalized);
			return;
		}
		setTextSize(fontSize);
	}, [fontSize]);

	// derive whether the avatar should render initials or image-only content
	const displayContent = useMemo(
		() => (firstOnly || !image ? initials : null),
		[firstOnly, image, initials],
	);

	// forward tooltip payload on hover
	const onMouseEnter = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			const payload = { label: first };
			onToolTip({ payload, event });
		},
		[first, onToolTip],
	);

	// clear tooltip state when the pointer leaves the avatar
	const onMouseLeave = useCallback(() => {
		onToolTip(null);
	}, [onToolTip]);

	// mirror click activation for keyboard users on clickable avatars
	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			onKeyDown?.(event);
			if (!onClick || event.defaultPrevented) return;
			accessibleKeyDown(event, () => onClick(event as any));
		},
		[onClick, onKeyDown],
	);

	// compose CSS custom properties for avatar sizing and colors
	const avatarVars = useMemo(() => {
		return {
			'--avatar-size': setStyle(size),
			'--avatar-frame': setStyle(frame),
			'--avatar-border': `${border}px`,
			'--avatar-color': color ?? 'var(--core-text-primary)',
			'--avatar-bg-color': bgColor ?? 'var(--core-surface-secondary)',
			'--avatar-border-color': borderColor ?? 'var(--core-surface-primary)',
			'--avatar-bg-image': `${bgImage}`,
			'--avatar-font-size': setStyle(textSize),
		} as React.CSSProperties;
	}, [size, frame, border, color, bgColor, borderColor, bgImage, textSize]);

	// compose wrapper class names
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
			onKeyDown={handleKeyDown}
			role={onClick ? 'button' : 'img'}
			tabIndex={onClick ? tabIndex : undefined}
			aria-label={`User Avatar - ${first}`}
			{...rest}
		>
			<div ref={ref} aria-hidden={true} className={css.user}>
				{displayContent}
			</div>
		</div>
	);
});
