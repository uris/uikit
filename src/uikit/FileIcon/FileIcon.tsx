import React, { useMemo } from 'react';
import { useTheme } from '../../hooks';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { accessibleKeyDown } from '../../util/utils';
import type { FileIconProps } from './_types';
import { STATIC_FILE_ICONS } from './fileIconRegistry';

export const FileIcon = React.memo((props: FileIconProps) => {
	const {
		name = 'pdf',
		size = 24,
		pointer = true,
		disabled = false,
		onClick = () => null,
		...svgAttributes
	} = props;
	const { id: svgId, className, style, ...rest } = svgAttributes;
	const { isDark } = useTheme();

	// memo cursor style
	const cursor = useMemo(() => {
		if (disabled) return 'default';
		return pointer ? 'pointer' : 'inherit';
	}, [disabled, pointer]);

	// memo icon style
	const iconStyle = useMemo(() => {
		return {
			cursor,
			userSelect: 'none' as const,
			WebkitUserSelect: 'none' as const,
			WebkitTapHighlightColor: 'transparent',
			outline: 'none',
			border: 0,
		} as React.CSSProperties;
	}, [cursor]);

	const definition = STATIC_FILE_ICONS.get(name);
	const paths = definition?.paths(isDark ? 'dark' : 'light');

	/* START.DEBUG */
	useTrackRenders(props, 'Icon');
	/* END.DEBUG */

	if (!paths) return null;

	return (
		<svg
			id={svgId}
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 20 20"
			style={{ ...(style ?? {}), ...iconStyle }}
			onClick={(e) => onClick(e)}
			role="img"
			aria-label={`${name} icon`}
			tabIndex={pointer && !disabled ? 0 : -1}
			onKeyDown={(e) => accessibleKeyDown(e, () => onClick)}
			opacity={disabled ? 0.5 : 1}
			{...rest}
		>
			<title />
			{paths}
		</svg>
	);
});

FileIcon.displayName = 'FileIcon';
