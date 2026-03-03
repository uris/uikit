import React, { useMemo } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import { Avatar } from '../Avatar';
import css from './AvatarGroup.module.css';
import type { AvatarGroupProps, AvatarInfo } from './_types';

export const AvatarGroup = React.memo((props: AvatarGroupProps) => {
	const {
		avatars = [],
		size = 32,
		border = 3,
		overlap = 8,
		gap = 0,
		borderColor = undefined,
		margin = 0,
		firstOnly = false,
		onToolTip = () => null,
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = (style ?? {}) as React.CSSProperties;
	const divClass = className ? ` ${className}` : '';

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--ag-gap': `${gap ?? 0}px`,
			'--ag-margin': `${margin ?? 0}px`,
			'--ag-overlap': `${overlap > 0 ? -overlap : 0}px`,
		} as React.CSSProperties;
	}, [overlap, gap, margin]);

	// memo rendered avatars list
	const renderedAvatars = useMemo(() => {
		if (!avatars) return null;
		return avatars.map((avatar: AvatarInfo, index: number) => (
			<div className={css.avatar} key={`avatar_${avatar.email}_${index}`}>
				<Avatar
					first={avatar.first}
					last={avatar.last}
					image={avatar.image || avatar.avatar}
					size={size}
					frame={size}
					border={border}
					borderColor={borderColor}
					color={avatar.color}
					bgColor={avatar.bgColor}
					firstOnly={firstOnly}
					onToolTip={onToolTip}
				/>
			</div>
		));
	}, [avatars, size, border, borderColor, firstOnly, onToolTip]);

	// memo class names
	const classNames = useMemo(() => {
		return `${css.wrapper}${divClass}`;
	}, [divClass]);

	/* START.DEBUG */
	useTrackRenders(props, 'Avatar Group');
	/* END.DEBUG */

	return (
		<div
			id={divId}
			className={classNames}
			style={{ ...divStyle, ...cssVars }}
			{...rest}
		>
			{renderedAvatars}
		</div>
	);
});
