import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../../../hooks';
import css from './ProgressIndicator.module.css';
import type { ProgressIndicatorProps } from './_types';

export function ProgressIndicator(props: Readonly<ProgressIndicatorProps>) {
	const theme = useTheme();
	const {
		size = 20,
		secondsPerSpin = 1,
		show = false,
		color = theme.colors['core-icon-primary'],
		stroke = 1.5,
		inline = false,
		duration = undefined,
		didStart = () => null,
		didStop = () => null,
	} = props;
	const [playing, setPlaying] = useState<boolean>(show);
	const timer = useRef<any>(null);

	useEffect(() => {
		if (show) {
			setPlaying(true);
			didStart();
			if (duration) {
				timer.current = setTimeout(() => {
					setPlaying(false);
					didStop();
				}, duration * 1000);
			}
		} else {
			setPlaying(false);
			didStop();
		}
		return () => {
			if (timer?.current) clearTimeout(timer.current);
		};
	}, [show, didStart, didStop, duration]);

	const cssVars = useMemo(() => {
		return {
			'--pi-position': inline ? 'relative' : 'absolute',
			'--pi-inset': inline ? 'unset' : '0',
			'--pi-icon-size': `${size ?? 0}px`,
		} as React.CSSProperties;
	}, [inline, size]);

	const openCircle = useMemo(() => {
		return OpenCircle(size, secondsPerSpin, color, stroke, playing);
	}, [size, secondsPerSpin, color, stroke, playing]);

	return (
		<AnimatePresence initial={true}>
			{show && (
				<motion.div
					className={css.container}
					style={cssVars}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					{openCircle}
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export const OpenCircle = (
	size: number,
	secondsPerSpin: number,
	color: string,
	stroke = 1.5,
	playing = false,
) => {
	return (
		<motion.svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 20 20"
			role="img"
			aria-label="Loading spinner"
			transition={{
				ease: 'linear',
				repeatType: 'loop',
				repeat: playing ? Number.POSITIVE_INFINITY : 0,
				duration: secondsPerSpin,
			}}
			animate={playing ? { rotate: 360 } : { rotate: 0 }}
		>
			<title>Loading</title>
			<defs>
				<linearGradient id="strokeFill" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor={color} stopOpacity={1} />
					<stop offset="50%" stopColor={color} stopOpacity={1} />
					<stop offset="100%" stopColor={color} stopOpacity={0} />
				</linearGradient>
			</defs>
			<motion.path
				d="M 17.371 6.886 C 17.776 7.843 18 8.895 18 10 C 18 14.418 14.418 18 10 18 C 5.582 18 2 14.418 2 10 C 2 5.582 5.582 2 10 2"
				fill="transparent"
				strokeWidth={stroke}
				stroke={'url(#strokeFill)'}
			/>
		</motion.svg>
	);
};
