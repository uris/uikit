import { motion } from 'motion/react';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import { Badge } from '../Badge';
import { Dot } from '../Dot';
import { Icon } from '../Icon';
import { ToolTipType } from '../sharedTypes';
import type { ToolTip } from '../sharedTypes';
import css from './IconButton.module.css';
import type { IconButtonProps } from './_types';

export const IconButton = React.memo((props: IconButtonProps) => {
	const {
		frameSize = 36,
		iconSize = 20,
		icon = 'more',
		borderRadius = 4,
		tooltip = undefined,
		color = undefined,
		colorOn = undefined,
		bgColor = 'var(--core-surface-secondary)',
		bgColorHover = 'var(--core-outline-primary)',
		bgColorOn = 'var(--core-outline-primary)',
		transition = undefined,
		variants = undefined,
		initial = undefined,
		animate = undefined,
		exit = undefined,
		fillColor = undefined,
		label = undefined,
		hover = undefined,
		count = 0,
		toggle = true,
		toggleIcon = false,
		isToggled = false,
		disabled = false,
		showDot = false,
		border = false,
		onClick = () => null,
		onToolTip = () => null,
	} = props;
	const [on, setOn] = useState<boolean>(isToggled);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => setOn(isToggled), [isToggled]);

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (disabled) return;
			if (tooltip) onToolTip(null);
			setOn(!on);
			onClick(e);
		},
		[disabled, tooltip, onToolTip, on, onClick],
	);

	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			if (!ref?.current || !tooltip) return;
			const tip: ToolTip = {
				type: ToolTipType.button,
				payload: { label: tooltip },
				event: e,
				ref: ref,
			};
			onToolTip(tip);
		},
		[tooltip, onToolTip],
	);

	const handleMouseLeave = useCallback(() => {
		if (tooltip) onToolTip(null);
	}, [tooltip, onToolTip]);

	// memo icon stroke color
	const strokeColor = useMemo(
		() => color || 'var(--core-icon-primary)',
		[color],
	);

	// memo accent color
	const accentColor = useMemo(
		() => colorOn || 'var(--core-icon-primary)',
		[colorOn],
	);

	// memo bg color
	const bgColorNormal = useMemo(() => {
		if (on && toggle) return bgColorOn;
		return bgColor ?? 'var(--core-surface-secondary)';
	}, [toggle, bgColorOn, bgColor, on]);

	// memo bg color on hover
	const bgHoverColor = useMemo(() => {
		if (hover && on) return bgColorOn;
		if (hover) return bgColorHover;
		return bgColor ?? 'transparent';
	}, [hover, bgColor, bgColorOn, bgColorHover, on]);

	// memo text color selected / unselected
	const textColor = useMemo(() => {
		if (toggle && on) return colorOn;
		return color ?? 'var(--core-text-primary)';
	}, [toggle, on, colorOn, color]);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--ib-bg': bgColorNormal,
			'--ib-bg-hover': bgHoverColor,
			'--ib-icon-size': `${frameSize ?? 0}px`,
			'--ib-border-radius': `${borderRadius ?? 0}px`,
			'--ib-border': border ? '1px' : 0,
			'--ib-color': textColor,
		} as React.CSSProperties;
	}, [bgColorNormal, bgHoverColor, textColor, border, frameSize, borderRadius]);

	/* START.DEBUG */
	useTrackRenders(props, 'IconButton');
	/* END.DEBUG */

	return (
		<motion.div
			className={css.button}
			style={cssVars}
			onClick={handleClick}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			transition={transition}
			variants={variants}
			initial={initial}
			animate={animate}
			exit={exit}
			ref={ref}
		>
			<div className={css.icon} style={{ opacity: disabled ? 0.3 : 1 }}>
				<Icon
					name={icon}
					strokeColor={strokeColor}
					accentColor={accentColor}
					fillColor={fillColor}
					disabled={disabled}
					size={iconSize}
					toggle={toggleIcon ? isToggled : false}
					pointer
				/>
			</div>
			{label && <div className={css.label}>{label}</div>}
			<Dot show={showDot} />
			{count !== 0 && (
				<div className={css.count}>
					<Badge variant={'light'} count={count} hideNull />
				</div>
			)}
		</motion.div>
	);
});
