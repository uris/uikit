import React, { useCallback, useMemo } from 'react';
import { useTheme } from '../../hooks';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import type { FileIconDefinition, UIFileIconProps } from './_types';
import { UIFileIcons } from './_types';

export const UIFileIcon = React.memo((props: UIFileIconProps) => {
	const {
		name = 'document',
		size = 20,
		pointer = false,
		disabled = false,
		onClick = () => null,
	} = props;
	const theme = useTheme();

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent<SVGElement>) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				onClick(e as any);
			}
		},
		[onClick],
	);

	const FileIcon: FileIconDefinition[] = useMemo(() => {
		return [
			{
				name: 'pdf',
				icon: (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={size}
						height={size}
						viewBox="0 0 20 20"
						style={{
							cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
						}}
						onClick={(e) => onClick(e)}
						onKeyDown={handleKeyDown}
						tabIndex={pointer ? 0 : -1}
						fill="none"
						role="img"
						aria-label="PDF document icon"
					>
						<title>PDF document</title>
						<path
							d="M 4.5 19 L 15.5 19 C 16.328 19 17 18.328 17 17.5 L 17 5 L 14.5 5 C 13.672 5 13 4.328 13 3.5 L 13 1 L 4.5 1 C 3.672 1 3 1.672 3 2.5 L 3 17.5 C 3 18.328 3.672 19 4.5 19 Z"
							fill="rgb(250,15,0)"
						/>
						<path
							d="M 5.516 9.416 L 7.237 9.416 C 7.485 9.416 7.7 9.464 7.884 9.56 C 8.068 9.654 8.21 9.788 8.309 9.96 C 8.409 10.133 8.458 10.334 8.458 10.563 C 8.458 10.79 8.408 10.99 8.309 11.164 C 8.209 11.338 8.067 11.474 7.882 11.572 C 7.682 11.673 7.461 11.723 7.237 11.718 L 6.502 11.718 L 6.502 13 L 5.516 13 Z M 7.069 10.932 C 7.175 10.937 7.278 10.902 7.359 10.834 C 7.432 10.764 7.471 10.665 7.467 10.564 C 7.467 10.446 7.431 10.357 7.359 10.294 C 7.277 10.229 7.174 10.196 7.069 10.202 L 6.502 10.202 L 6.502 10.932 Z M 8.836 9.416 L 10.248 9.416 C 10.618 9.416 10.941 9.489 11.214 9.636 C 11.489 9.781 11.701 9.988 11.849 10.258 C 11.997 10.527 12.071 10.843 12.071 11.208 C 12.071 11.573 11.997 11.89 11.849 12.16 C 11.704 12.426 11.483 12.643 11.214 12.783 C 10.915 12.934 10.583 13.008 10.248 13 L 8.836 13 Z M 10.223 12.214 C 10.389 12.214 10.533 12.174 10.653 12.097 C 10.778 12.013 10.875 11.894 10.931 11.755 C 11 11.581 11.034 11.395 11.029 11.208 C 11.034 11.022 11.001 10.837 10.931 10.664 C 10.875 10.524 10.778 10.403 10.653 10.319 C 10.524 10.239 10.375 10.198 10.223 10.202 L 9.823 10.202 L 9.823 12.214 Z M 12.53 9.416 L 15.182 9.416 L 15.182 10.202 L 13.517 10.202 L 13.517 10.759 L 14.715 10.759 L 14.715 11.545 L 13.517 11.545 L 13.517 13 L 12.53 13 Z"
							fill={theme.current.colors['core-icon-light']}
						/>
						<path
							d="M 13 1 L 15 3 L 17 5 L 14 5 C 13.448 5 13 4.552 13 4 Z"
							fill={theme.current.coreColors['brand-purple-300']}
						/>
					</svg>
				),
			},
			{
				name: 'spreadsheet',
				icon: (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={size}
						height={size}
						viewBox="0 0 20 20"
						style={{
							cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
						}}
						onClick={(e) => onClick(e)}
						onKeyDown={handleKeyDown}
						tabIndex={pointer ? 0 : -1}
						fill="none"
						role="img"
						aria-label="Spreadsheet document icon"
					>
						<title>Spreadsheet document</title>
						<path
							d="M 4.5 19 L 15.5 19 C 16.328 19 17 18.328 17 17.5 L 17 5 L 14.5 5 C 13.672 5 13 4.328 13 3.5 L 13 1 L 4.5 1 C 3.672 1 3 1.672 3 2.5 L 3 17.5 C 3 18.328 3.672 19 4.5 19 Z"
							fill={theme.current.coreColors['brand-land-700']}
						/>
						<path
							d="M 5 8 L 11 8 L 11 9.5 L 5 9.5 Z M 12 8 L 15 8 L 15 9.5 L 12 9.5 Z M 5 11 L 11 11 L 11 12.5 L 5 12.5 Z M 12 11 L 15 11 L 15 12.5 L 12 12.5 Z M 5 14 L 11 14 L 11 15.5 L 5 15.5 Z M 12 14 L 15 14 L 15 15.5 L 12 15.5 Z"
							fill={theme.current.colors['core-icon-light']}
						/>
						<path
							d="M 13 1 L 15 3 L 17 5 L 14 5 C 13.448 5 13 4.552 13 4 Z"
							fill={theme.current.coreColors['brand-purple-300']}
						/>
					</svg>
				),
			},
			{
				name: 'document',
				icon: (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width={size}
						height={size}
						viewBox="0 0 20 20"
						style={{
							cursor: disabled ? 'default' : pointer ? 'pointer' : 'inherit',
						}}
						onClick={(e) => onClick(e)}
						onKeyDown={handleKeyDown}
						tabIndex={pointer ? 0 : -1}
						fill="none"
						role="img"
						aria-label="Document icon"
					>
						<title>Document</title>
						<path
							d="M 4.5 19 L 15.5 19 C 16.328 19 17 18.328 17 17.5 L 17 5 L 14.5 5 C 13.672 5 13 4.328 13 3.5 L 13 1 L 4.5 1 C 3.672 1 3 1.672 3 2.5 L 3 17.5 C 3 18.328 3.672 19 4.5 19 Z"
							fill={theme.current.colors['core-badge-primary']}
						/>
						<path
							d="M 6 14 L 14 14 M 6 10 L 12 10"
							fill="transparent"
							strokeWidth="1.5"
							stroke={theme.current.colors['core-icon-light']}
							strokeMiterlimit="10"
							strokeDasharray=""
						/>
						<path
							d="M 13 1 L 15 3 L 17 5 L 14 5 C 13.448 5 13 4.552 13 4 Z"
							fill={theme.current.coreColors['brand-purple-300']}
						/>
					</svg>
				),
			},
		];
	}, [size, disabled, onClick, pointer, theme, handleKeyDown]);

	// get the right icon in the array
	const svgElement = FileIcon.filter((icon) => {
		return icon.name.toLowerCase() === name.toLowerCase();
	});

	/* START.DEBUG */
	useTrackRenders(props, 'UIFileIcon');
	/* END.DEBUG */

	if (svgElement.length > 0) return svgElement[0].icon;
	return null;
});
