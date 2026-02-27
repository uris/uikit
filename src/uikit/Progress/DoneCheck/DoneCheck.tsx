import { type Transition, useAnimate, usePresence } from 'motion/react';
import React, { useEffect } from 'react';
import { useTheme } from '../../../hooks';
import { useTrackRenders } from '../../../hooks/useTrackRenders';
import type { DoneCheckProps } from './_types';

export const DoneCheck = React.memo((props: DoneCheckProps) => {
	const theme = useTheme();
	const {
		size = 88,
		stroke = 0.75,
		duration = 0.35,
		bounce = 0.7,
		delay = 0.5,
		color = theme.colors['feedback-positive'],
		didEnd = () => null,
		didStart = () => null,
		play = false,
	} = props;
	const [check, animateCheck] = useAnimate();
	const [isPresent, safeToRemove] = usePresence();

	useEffect(() => {
		const variants = { initial: { scale: 0.9 }, animate: { scale: 1 } };
		const spring: Transition = {
			type: 'spring',
			time: duration,
			bounce,
			delay,
		};
		const instant: Transition = { ease: 'linear', duration: 0, delay: 0 };
		if (isPresent && play) {
			const enterAnimation = async () => {
				didStart();
				await animateCheck(check.current, variants.initial, instant);
				await animateCheck(check.current, variants.animate, spring);
				didEnd();
			};
			enterAnimation();
		} else if (isPresent && !play) {
			const enterAnimation = async () => {
				await animateCheck(check.current, variants.animate, instant);
			};
			enterAnimation();
		} else if (!isPresent) {
			const exitAnimation = async () => {
				await animateCheck(check.current, variants.initial, instant);
				safeToRemove();
			};
			exitAnimation();
		}
	}, [
		isPresent,
		play,
		animateCheck,
		check,
		didEnd,
		didStart,
		safeToRemove,
		bounce,
		delay,
		duration,
	]);

	const checkMark = () => {
		return (
			<svg
				ref={check}
				xmlns="http://www.w3.org/2000/svg"
				width={size}
				height={size}
				scale={0.9}
				viewBox="0 0 20 20"
				fill="none"
				aria-label="Checkmark icon"
			>
				<title>Checkmark</title>
				<path d="M 1 1 L 19 1 L 19 19 L 1 19 Z" fill="transparent" />
				<path
					d="M 10 2 C 14.418 2 18 5.582 18 10 C 18 14.418 14.418 18 10 18 C 5.582 18 2 14.418 2 10 C 2 5.582 5.582 2 10 2 Z"
					fill="transparent"
					strokeWidth={stroke}
					stroke={color}
				/>
				<path
					d="M 6.5 9.5 L 9 12 L 13.5 7.5"
					fill="transparent"
					strokeWidth={stroke}
					stroke={color}
				/>
			</svg>
		);
	};

	/* START.DEBUG */
	useTrackRenders(props, 'DoneCheck');
	/* END.DEBUG */

	return checkMark();
});
