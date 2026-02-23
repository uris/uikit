import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from 'styled-components';
import { Icon } from '../Icon/Icon';
import * as Styled from './_Styles';

export interface ProgressBarProps {
	steps?: ProgressBarStep[];
	currentIndex?: number;
	clickable?: boolean;
	onChange?: (index: number, step: ProgressBarStep) => void;
}

export type ProgressBarStep = {
	title?: string;
	number?: number;
	done?: boolean;
};

export const defaultSteps: ProgressBarStep[] = [
	{ title: 'Step 1', number: 1 },
	{ title: 'Step 2', number: 2 },
];

export const ProgressBar = React.memo((props: ProgressBarProps) => {
	const {
		steps = defaultSteps,
		currentIndex = 0,
		clickable = false,
		onChange = () => null,
	} = props;
	const [current, setCurrent] = useState<number>(currentIndex);

	useEffect(() => setCurrent(currentIndex), [currentIndex]);

	const getState = useCallback(
		(index: number): 'done' | 'current' | 'disabled' => {
			if (current === index) return 'current';
			if (current > index) return 'done';
			return 'disabled';
		},
		[current],
	);

	const handleClick = useCallback(
		(index: number, step: ProgressBarStep) => {
			if (clickable) {
				onChange(index, step);
				setCurrent(index);
			}
		},
		[clickable, onChange],
	);

	// Memoize rendered steps
	const renderedSteps = useMemo(
		() =>
			steps.map((step: ProgressBarStep, index: number) => (
				<ProgressStep
					key={`progress_state_${step.title}_${index}`}
					step={step}
					state={getState(index)}
					last={index === steps.length - 1}
					onClick={() => handleClick(index, step)}
					clickable={clickable}
				/>
			)),
		[steps, getState, handleClick, clickable],
	);

	return <Styled.Bar>{renderedSteps}</Styled.Bar>;
});

interface StepProps {
	step?: ProgressBarStep;
	state?: 'done' | 'current' | 'disabled';
	last?: boolean;
	onClick?: () => void;
	clickable?: boolean;
}

const ProgressStep = React.memo((props: StepProps) => {
	const {
		step,
		state = 'disabled',
		last = true,
		onClick = () => null,
		clickable = false,
	} = props;
	const theme = useTheme();

	// Memoize icon color
	const checkIconColor = useMemo(
		() => theme.colors['core-text-light'],
		[theme],
	);

	return (
		<Styled.Step $state={state} $clickable={clickable} onClick={onClick}>
			<div className="step">
				<div className="number">
					{state !== 'done' && step?.number}
					{state === 'done' && (
						<Icon name={'check'} strokeColor={checkIconColor} size={20} />
					)}
				</div>
				<div className="title">{step?.title}</div>
			</div>
			{!last && <div className="line" />}
		</Styled.Step>
	);
});
