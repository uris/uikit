import { UIIcon } from "../UIIcon/UIIcon";
import * as Styled from "./_Styles";
import { useTheme } from "styled-components";

export interface ProgressBarProps {
  steps?: ProgressBarStep[];
  currentIndex?: number;
}

export type ProgressBarStep = {
  title?: string;
  number?: number;
};

const defaultSteps: ProgressBarStep[] = [
  { title: "Step 1", number: 1 },
  { title: "Step 2", number: 2 },
];

export function ProgressBar(props: ProgressBarProps) {
  const { steps = defaultSteps, currentIndex = 0 } = props;

  function getState(index: number): "done" | "current" | "disabled" {
    if (currentIndex === index) return "current";
    if (currentIndex > index) return "done";
    return "disabled";
  }
  return (
    <Styled.Bar>
      {steps.map((step: ProgressBarStep, index: number) => {
        return (
          <ProgressStep
            key={"progress_state_" + step.title + "_" + index}
            step={step}
            state={getState(index)}
            last={index === steps.length - 1}
          />
        );
      })}
    </Styled.Bar>
  );
}

interface StepProps {
  step?: ProgressBarStep;
  state?: "done" | "current" | "disabled";
  last?: boolean;
}

function ProgressStep(props: StepProps) {
  const { step, state = "disabled", last = true } = props;
  const theme = useTheme();
  return (
    <Styled.Step $state={state}>
      <div className="step">
        <div className="number">
          {state !== "done" && step?.number}
          {state === "done" && (
            <UIIcon name={"check"} strokeColor={theme.colors.white} size={20} />
          )}
        </div>
        <div className="title">{step?.title}</div>
      </div>
      {!last && <div className="line" />}
    </Styled.Step>
  );
}
