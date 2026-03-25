import { motion } from 'motion/react';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders/useTrackRenders';
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
		border = false,
		tooltip = undefined,
		color = undefined,
		colorOn = undefined,
		bgColor = 'var(--core-surface-secondary)',
		bgColorHover = 'var(--core-outline-primary)',
		bgColorOn = 'var(--core-outline-primary)',
		iconColor = 'var(--core-text-primary)',
		iconColorOn = 'var(--core-text-primary)',
		iconColorHover = 'var(--core-text-primary)',
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
		onClick = () => null,
		onToolTip = () => null,
		...divAttributes
	} = props;
	const { id: divId, className, style, ...rest } = divAttributes;
	const divStyle = style ?? ({} as React.CSSProperties);
	const divClass = className ? ` ${className}` : '';
	const ref = useRef<HTMLButtonElement>(null);
	const [on, setOn] = useState<boolean>(isToggled);
	const [hovered, setHovered] = useState<boolean>(false);

	// sync the local toggle state from the controlled prop
	useEffect(() => setOn(isToggled), [isToggled]);

	// handle button clicks and keep tooltip state in sync
	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined) => {
			if (disabled) return;
			if (tooltip) onToolTip(null);
			if (toggle) setOn(!on);
			onClick(e as any);
		},
		[disabled, tooltip, onToolTip, on, onClick, toggle],
	);

	// show the button tooltip using the current wrapper ref
	const handleMouseEnter = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			setHovered(true);
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

	// clear the tooltip when leaving the button
	const handleMouseLeave = useCallback(() => {
		setHovered(false);
		if (tooltip) onToolTip(null);
	}, [tooltip, onToolTip]);

	// resolve the resting background color
	const bgColorNormal = useMemo(() => {
		if (on && toggle) return bgColorOn;
		return bgColor ?? 'var(--core-surface-secondary)';
	}, [toggle, bgColorOn, bgColor, on]);

	// resolve the hover background color
	const bgHoverColor = useMemo(() => {
		if (hover && on) return bgColorOn;
		if (hover) return bgColorHover;
		return bgColor ?? 'transparent';
	}, [hover, bgColor, bgColorOn, bgColorHover, on]);

	// resolve the label color for toggled and untoggled states
	const textColor = useMemo(() => {
		if (toggle && on) return colorOn;
		return color ?? 'var(--core-text-primary)';
	}, [toggle, on, colorOn, color]);

	// resolve the icon color based on states
	const setIconColor = useMemo(() => {
		if (toggle && on) return iconColorOn;
		if (hovered) return iconColorHover;
		return iconColor ?? 'var(--core-text-primary)';
	}, [toggle, on, iconColorOn, iconColor, iconColorHover, hovered]);

	// compose CSS custom properties for button sizing and colors
	const cssVars = useMemo(() => {
		return {
			'--ib-bg-color': bgColorNormal,
			'--ib-bg-color-hover': bgHoverColor,
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
		<motion.button
			id={divId}
			type="button"
			className={`${css.button}${divClass}`}
			style={{ ...divStyle, ...cssVars }}
			onClick={(e) => handleClick(e)}
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			transition={transition}
			variants={variants}
			initial={initial}
			animate={animate}
			exit={exit}
			disabled={disabled}
			aria-disabled={disabled}
			ref={ref}
			{...(rest as any)}
		>
			<div className={css.icon} style={{ opacity: disabled ? 0.3 : 1 }}>
				<Icon
					name={icon}
					strokeColor={setIconColor}
					fillColor={fillColor}
					disabled={disabled}
					size={iconSize}
					toggle={toggleIcon ? isToggled : false}
					pointer={true}
				/>
			</div>
			{label && <div className={css.label}>{label}</div>}
			<Dot show={showDot} />
			{count !== 0 && (
				<div className={css.count}>
					<Badge variant={'light'} count={count} hideNull />
				</div>
			)}
		</motion.button>
	);
});
