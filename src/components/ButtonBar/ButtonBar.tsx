import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '../../hooks';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
import { IconButton } from '../IconButton';
import css from './ButtonBar.module.css';
import type { BarButton, ButtonBarProps } from './_types';

export function ButtonBar(props: Readonly<ButtonBarProps>) {
	const theme = useTheme();

	const {
		options = [],
		current = 0,
		label,
		onChange = () => null,
		onToolTip = () => null,
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';
	const [hovered, setHovered] = useState<number>(-1);
	const [currentPage, setCurrentPage] = useState<number>(current);

	// sync the selected button index from the controlled prop
	useEffect(() => setCurrentPage(current), [current]);

	// track which button is currently hovered
	const handleMouseEnter = useCallback((index: number) => {
		setHovered(index);
	}, []);

	// clear the hovered button state
	const handleMouseLeave = useCallback(() => {
		setHovered(-1);
	}, []);

	// update the selected button and notify the consumer
	const handleClick = useCallback(
		(button: BarButton, index: number) => {
			setCurrentPage(index);
			onChange(button);
		},
		[onChange],
	);

	// determine whether the divider should be hidden for the last item
	const display = useCallback(
		(index: number) => {
			return index === options.length - 1 ? css.last : '';
		},
		[options.length],
	);

	// determine whether a button is currently selected
	const selected = useCallback(
		(index: number) => {
			return currentPage === index ? css.selected : '';
		},
		[currentPage],
	);

	// resolve icon colors from selected and hovered states
	const iconColor = useCallback(
		(index: number) => {
			const isSelected = currentPage === index;
			const isHovered = hovered === index;
			if (isSelected) return theme.current.colors['core-icon-primary'];
			if (isHovered) return theme.current.colors['core-button-primary'];
			return theme.current.colors['core-text-disabled'];
		},
		[currentPage, hovered, theme],
	);

	/* START.DEBUG */
	useTrackRenders(props, 'ButtonBar');
	/* END.DEBUG */

	return (
		<div
			id={divId}
			className={`${css.wrapper}${divClass}`}
			style={divStyle}
			{...rest}
		>
			{label && <div className={css.label}>{label}</div>}
			{options?.map((button: BarButton, index: number) => {
				return (
					<div
						className={`${css.button} ${selected(index)}`}
						key={`button-bar-${button.icon}-${index}`}
						onMouseEnter={() => handleMouseEnter(index)}
						onMouseLeave={() => handleMouseLeave()}
					>
						<IconButton
							icon={button.icon}
							color={iconColor(index)}
							label={button.label}
							tooltip={button.tip}
							onToolTip={onToolTip}
							onClick={() => handleClick(button, index)}
							hover
							toggle={false}
						/>
						<div className={`${css.divider} ${display(index)}`} />
					</div>
				);
			})}
		</div>
	);
}
