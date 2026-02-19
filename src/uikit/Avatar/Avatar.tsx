import { type Transition, type Variants, motion } from 'motion/react';
import React, { useCallback, useMemo, useRef } from 'react';
import { type ToolTip, ToolTipType } from '../sharedTypes';
import css from './Avatar.module.css';

export interface AvatarProps {
	size?: number;
	frame?: number;
	first?: string;
	last?: string;
	image?: string;
	border?: number;
	color?: string;
	borderColor?: string;
	bgColor?: string;
	variants?: Variants;
	transition?: Transition;
	initial?: string;
	animate?: string;
	exit?: string;
	firstOnly?: boolean;
	onToolTip?: (tip: ToolTip | null) => void;
}

export const Avatar = React.memo((props: AvatarProps) => {
	const {
		first = '',
		last = '',
		image = '',
		border = 0,
		color = undefined,
		borderColor = undefined,
		bgColor = undefined,
		variants = undefined,
		transition = undefined,
		animate = undefined,
		initial = undefined,
		exit = undefined,
		firstOnly = false,
		onToolTip = () => null,
		size = 34,
		frame = 34,
	} = props;
	const ref = useRef<HTMLDivElement>(null);

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
	const fontSize = useMemo(() => {
		let fSize = Math.round(frame / 3);
		fSize = Math.min(fSize, 24);
		fSize = Math.max(fSize, 14);
		return fSize;
	}, [frame]);

	// memo display content
	const displayContent = useMemo(
		() => (firstOnly || !image ? initials : null),
		[firstOnly, image, initials],
	);

	// memo css vars
	const avatarVars = useMemo(() => {
		return {
			'--avatar-size': `${size}px`,
			'--avatar-frame': `${frame}px`,
			'--avatar-border': `${border}px`,
			'--avatar-color': color ?? `var(--core-text-primary)`,
			'--avatar-bg-color': bgColor ?? `var(--core-surface-secondary)`,
			'--avatar-border-color': borderColor ?? `var(--core-surface-primary)`,
			'--avatar-bg-image': `${bgImage}`,
			'--avatar-font-size': `${fontSize}px`,
		} as React.CSSProperties;
	}, [size, frame, border, color, bgColor, borderColor, bgImage]);

	const onMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const tip: ToolTip = {
				type: ToolTipType.button,
				payload: { label: first },
				event: e,
				ref,
			};
			onToolTip(tip);
		},
		[first, onToolTip],
	);

	const onMouseLeave = useCallback(() => {
		onToolTip(null);
	}, [onToolTip]);

	return (
		<motion.div
			className={css.wrapper}
			style={avatarVars}
			variants={variants}
			transition={transition}
			initial={initial}
			animate={animate}
			exit={exit}
			ref={ref}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<div className={css.user}>{displayContent}</div>
		</motion.div>
	);
});
