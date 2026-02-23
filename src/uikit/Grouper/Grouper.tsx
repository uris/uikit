import { useAnimate } from 'motion/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../hooks';
import { Badge } from '../Badge';
import { Icon } from '../Icon';
import css from './Grouper.module.css';

export interface GrouperProps {
	title?: string;
	toggle?: boolean;
	open?: boolean;
	hasIcon?: boolean;
	iconName?: string;
	iconSize?: number;
	frameSize?: number;
	border?: number;
	count?: number | string;
	hideNull?: boolean;
	showFilterBadge?: boolean;
	unframed?: boolean;
	onChange?: (state: boolean) => void;
	onClick?: () => void;
}

export const Grouper = React.memo((props: GrouperProps) => {
	const {
		title = 'Group Title',
		toggle = true,
		open = true,
		hasIcon = true,
		iconName = 'chevron down',
		iconSize = 18,
		frameSize = 64,
		border = 0,
		count = 0,
		unframed = false,
		hideNull = true,
		showFilterBadge = false,
		onChange = () => null,
		onClick = () => null,
	} = props;
	const theme = useTheme();
	const [state, setState] = useState<boolean>(open);
	const [icon, animateIcon] = useAnimate();

	useEffect(() => setState(open), [open]);

	const animate = useCallback(
		(state: boolean) => {
			const animation = { rotate: state ? 0 : 180 };
			animateIcon(
				icon.current,
				{ ...animation },
				{ ease: 'easeInOut', duration: 0.25 },
			);
		},
		[animateIcon, icon],
	);

	const handleToggle = useCallback(() => {
		if (!toggle) return;
		onClick();
		onChange(!state);
		animate(!state);
		setState(!state);
	}, [toggle, onClick, onChange, state, animate]);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--grouper-height': unframed ? 'auto' : `${frameSize}px`,
			'--grouper-border': border ? `${border}px` : '0',
			'--grouper-icon-size': `${iconSize}px`,
		} as React.CSSProperties;
	}, [frameSize, iconSize, border, unframed]);

	return (
		<div
			className={css.header}
			style={cssVars}
			onClick={handleToggle}
			onKeyDown={handleToggle}
		>
			<div className={css.content}>
				<div className={css.title}>
					{title}
					<Badge hideNull={hideNull} count={count} variant={'light'} />
					{showFilterBadge && (
						<Icon
							name="filter"
							size={16}
							strokeColor={theme.colors['core-text-disabled']}
						/>
					)}
				</div>
				{hasIcon && (
					<div ref={icon} className={css.icon}>
						<Icon name={iconName} size={iconSize} />
					</div>
				)}
			</div>
		</div>
	);
});
