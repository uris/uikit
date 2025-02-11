import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ProgressBar, defaultSteps } from '../uikit/ProgressBar/ProgressBar';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

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

export const Default: StoryObj<typeof ProgressBar> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <ProgressBar {...args} />
      </FlexDiv>
    );
  },
};
