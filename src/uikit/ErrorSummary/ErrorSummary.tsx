import { AnimatePresence, type Transition, motion } from 'motion/react';
import React, { useMemo } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import css from './ErrorSummary.module.css';
import type { ErrorMessage, ErrorSummaryProps } from './_types';

export const ErrorSummary = React.memo((props: ErrorSummaryProps) => {
	const { entries, errors = [] } = props;

	// memo animation variants
	const variants = useMemo(
		() => ({
			enter: { opacity: 0, maxHeight: 0 },
			animate: { opacity: 1, maxHeight: 500 },
			exit: { opacity: 0, maxHeight: 0 },
		}),
		[],
	);

	// memo trans
	const transition: Transition = useMemo(
		() => ({ ease: 'easeInOut', duration: 0.25 }),
		[],
	);

	const renderedErrors = useMemo(() => {
		if (!entries) return null;
		return entries.map((error: ErrorMessage, index: number) => {
			if (errors.includes(index) || errors.includes(error.id)) {
				return (
					<div className={css.error} key={`${error.id}_${index}`}>
						<p className={css.p}>
							<strong className={css.strong}>{error.title}</strong>
						</p>
						<ul className={css.ul}>
							{error.bullets?.map((bullet: string, index: number) => {
								return (
									<li className={css.li} key={`${error.title}_bullet_${index}`}>
										{bullet}
									</li>
								);
							})}
						</ul>
					</div>
				);
			}
			return null;
		});
	}, [entries, errors]);

	/* START.DEBUG */
	useTrackRenders(props, 'ErrorSummary');
	/* END.DEBUG */

	return (
		<AnimatePresence initial={false}>
			{entries && errors && errors.length > 0 && (
				<motion.div
					className={css.errorBox}
					initial={'enter'}
					animate={'animate'}
					exit={'exit'}
					variants={variants}
					transition={transition}
				>
					{renderedErrors}
				</motion.div>
			)}
		</AnimatePresence>
	);
});
