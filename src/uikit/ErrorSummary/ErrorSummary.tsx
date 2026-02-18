import { AnimatePresence, type Transition } from "motion/react";
import React, { useMemo } from "react";
import * as Styled from "./_Styles";

export type ErrorMessage = {
	id?: string;
	title?: string;
	bullets?: string[];
};

export interface ErorSummaryProps {
	entries?: ErrorMessage[];
	errors?: any[];
}

export const ErrorSummary = React.memo((props: ErorSummaryProps) => {
	const { entries, errors = [] } = props;
	const variants = useMemo(
		() => ({
			enter: { opacity: 0, maxHeight: 0 },
			animate: { opacity: 1, maxHeight: 500 },
			exit: { opacity: 0, maxHeight: 0 },
		}),
		[],
	);
	const transition: Transition = useMemo(
		() => ({ ease: "easeInOut", duration: 0.25 }),
		[],
	);

	return (
		<AnimatePresence initial={false}>
			{entries && errors && errors.length > 0 && (
				<Styled.ErrorBox
					initial={"enter"}
					animate={"animate"}
					exit={"exit"}
					variants={variants}
					transition={transition}
				>
					{entries.map((error: ErrorMessage, index: number) => {
						if (errors.includes(index) || errors.includes(error.id)) {
							return (
								<div className="error" key={`${error.id}_${index}`}>
									<p>
										<strong>{error.title}</strong>
									</p>
									<ul>
										{error.bullets?.map((bullet: string, index: number) => {
											return (
												<li key={`${error.title}_bullet_${index}`}>{bullet}</li>
											);
										})}
									</ul>
								</div>
							);
						}
						return null;
					})}
				</Styled.ErrorBox>
			)}
		</AnimatePresence>
	);
});
