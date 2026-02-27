import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '../../hooks';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import { IconButton } from '../IconButton';
import css from './UIButtonBar.module.css';
import type { BarButton, UIButtonBarProps } from './_types';

export function UIButtonBar(props: Readonly<UIButtonBarProps>) {
	const {
		options = [],
		current = 0,
		label,
		onChange = () => null,
		onToolTip = () => null,
	} = props;
	const theme = useTheme();
	const [hovered, setHovered] = useState<number>(-1);
	const [currentPage, setCurrentPage] = useState<number>(current);

	useEffect(() => setCurrentPage(current), [current]);

	const handleMouseEnter = useCallback((index: number) => {
		setHovered(index);
	}, []);

	const handleMouseLeave = useCallback(() => {
		setHovered(-1);
	}, []);

	const handleClick = useCallback(
		(button: BarButton, index: number) => {
			setCurrentPage(index);
			onChange(button);
		},
		[onChange],
	);

	// memo display
	const display = useCallback(
		(index: number) => {
			return index === options.length - 1 ? css.last : '';
		},
		[options.length],
	);

	// memo selected
	const selected = useCallback(
		(index: number) => {
			return currentPage === index ? css.selected : '';
		},
		[currentPage],
	);

	// memo icon stroke color
	const iconColor = useCallback(
		(index: number) => {
			const isSelected = currentPage === index;
			const isHovered = hovered === index;
			if (isSelected) return theme.colors['core-icon-primary'];
			if (isHovered) return theme.colors['core-button-primary'];
			return theme.colors['core-text-disabled'];
		},
		[currentPage, hovered, theme],
	);

	/* START.DEBUG */
	useTrackRenders(props, 'UIButtonBar');
	/* END.DEBUG */

	return (
		<div className={css.wrapper}>
			{label && <div className={css.label}>{label}</div>}
			{options?.map((button: BarButton, index: number) => {
				return (
					<div
						className={css.button}
						key={`button-bar-${button.icon}-${index}`}
						onMouseEnter={() => handleMouseEnter(index)}
						onMouseLeave={() => handleMouseLeave()}
					>
						<div
							className={selected(index)}
							onClick={() => handleClick(button, index)}
							onKeyDown={() => handleClick(button, index)}
						>
							<IconButton
								icon={button.icon}
								color={iconColor(index)}
								label={button.label}
								tooltip={button.tip}
								onToolTip={onToolTip}
								hover
								toggle={false}
							/>
						</div>
						<div className={`${css.divider} ${display(index)}`} />
					</div>
				);
			})}
		</div>
	);
}
