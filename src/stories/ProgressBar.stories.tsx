import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ProgressBar, defaultSteps } from '../uikit/ProgressBar/ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'UI Kit/ProgressBar',
  component: ProgressBar,
  args: {
    steps: defaultSteps,
    currentIndex: 0,
    clickable: true,
    onChange: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof ProgressBar> = {};
