import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '../../hooks';
import { IconButton } from '../IconButton';
import type { ToolTip } from '../sharedTypes';
import css from './UIButtonBar.module.css';
import type { BarButton } from './_Types';

export interface UIButtonBarProps {
	options?: BarButton[];
	label?: string;
	current?: number;
	onChange?: (option: BarButton) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}

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

	function handleMouseEnter(index: number) {
		setHovered(index);
	}

	function handleMouseLeave() {
		setHovered(-1);
	}

	function handleClick(button: BarButton, index: number) {
		setCurrentPage(index);
		onChange(button);
	}

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
								onToolTip={(tip) => onToolTip(tip)}
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
