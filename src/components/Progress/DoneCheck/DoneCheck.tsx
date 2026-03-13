import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../../hooks';
import { useTrackRenders } from '../../../hooks/useTrackRenders/useTrackRenders';
import { Icon } from '../../Icon';
import css from './DoneCheck.module.css';
import type { DoneCheckProps } from './_types';

export const DoneCheck = React.memo((props: DoneCheckProps) => {
	const theme = useTheme();
	const {
		size = 88,
		stroke = 1.5,
		color = theme.current.colors['feedback-positive'],
		play = true,
		delay = 0,
		duration = 1,
		didStart,
		didEnd,
	} = props;
	const [playing, setPlaying] = useState<boolean>(false);

	// update play with props
	useEffect(() => setPlaying(play), [play]);

	const transition = useMemo(() => {
		return `scale ${duration}s var(--motion-spring) ${delay}s`;
	}, [delay, duration]);

	// css var memos
	const cssVars = useMemo(() => {
		return {
			'--icon-size': `${size}px`,
			'--icon-scale': playing ? 1 : 0,
			'--icon-transition': playing ? transition : 'unset',
		} as React.CSSProperties;
	}, [size, playing, transition]);

	/* START.DEBUG */
	useTrackRenders(props, 'DoneCheck');
	/* END.DEBUG */

	return (
		<div className={css.wrapper} role={'status'} aria-live={'polite'}>
			<div
				className={css.icon}
				style={cssVars}
				onTransitionEnd={() => didEnd?.()}
				onTransitionStart={() => didStart?.()}
			>
				<Icon
					name="check circle"
					size={size}
					color={color}
					stroke={stroke}
					strokeColor={color}
				/>
			</div>
		</div>
	);
});
