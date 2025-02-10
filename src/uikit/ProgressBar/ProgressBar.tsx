import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { UIIcon } from '../UIIcon/UIIcon';
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

export function ProgressBar(props: ProgressBarProps) {
  const {
    steps = defaultSteps,
    currentIndex = 0,
    clickable = false,
    onChange = () => null,
  } = props;
  const [current, setCurrent] = useState<number>(currentIndex);
  useEffect(() => setCurrent(currentIndex), [currentIndex]);

  function getState(index: number): 'done' | 'current' | 'disabled' {
    if (current === index) return 'current';
    if (current > index) return 'done';
    return 'disabled';
  }

  function handleClick(index: number, step: ProgressBarStep) {
    if (clickable) {
      onChange(index, step);
      setCurrent(index);
    }
  }

  return (
    <Styled.Bar>
      {steps.map((step: ProgressBarStep, index: number) => {
        return (
          <ProgressStep
            key={'progress_state_' + step.title + '_' + index}
            step={step}
            state={getState(index)}
            last={index === steps.length - 1}
            onClick={() => handleClick(index, step)}
            clickable={clickable}
          />
        );
      })}
    </Styled.Bar>
  );
}

interface StepProps {
  step?: ProgressBarStep;
  state?: 'done' | 'current' | 'disabled';
  last?: boolean;
  onClick?: () => void;
  clickable?: boolean;
}

function ProgressStep(props: StepProps) {
  const {
    step,
    state = 'disabled',
    last = true,
    onClick = () => null,
    clickable = false,
  } = props;
  const theme = useTheme();
  return (
    <Styled.Step
      $state={state}
      $clickable={clickable}
      onClick={() => onClick()}
    >
      <div className="step">
        <div className="number">
          {state !== 'done' && step?.number}
          {state === 'done' && (
            <UIIcon name={'check'} strokeColor={theme.colors.white} size={20} />
          )}
        </div>
        <div className="title">{step?.title}</div>
      </div>
      {!last && <div className="line" />}
    </Styled.Step>
  );
}
