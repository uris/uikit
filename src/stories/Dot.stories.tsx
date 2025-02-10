import type { Meta, StoryObj } from '@storybook/react';
import { Dot } from '../uikit/Dot/Dot';

const meta: Meta<typeof Dot> = {
  title: 'UI Kit/Dot',
  component: Dot,
  argTypes: {
    state: {
      control: { type: 'radio' },
      options: ['red', 'yellow', 'geren', 'blue', 'grey', undefined],
    },
  },
  args: {
    size: 8,
    topOffset: 2,
    rightOffset: 2,
    border: 3,
    position: 'inline',
    color: undefined,
    motion: undefined,
    motionValues: undefined,
    show: true,
    state: 'blue',
  },
};

export default meta;

export const Default: StoryObj<typeof Dot> = {};
