import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Slider } from '../uikit/Slider/Slider';

const meta: Meta<typeof Slider> = {
  title: 'UI Kit/Slider',
  component: Slider,
  args: {
    initial: 25,
    scaleMin: 0,
    scaleMax: 100,
    width: 100,
    height: 2,
    touchHeight: 24,
    trackHeadSize: 7,
    headType: 'round',
    trackHeadWidth: 4,
    rounding: 2,
    cursor: 'default',
    headColor: undefined,
    progressColor: undefined,
    trackColor: undefined,
    state: [],
    onChange: fn(),
    onDragChange: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof Slider> = {};
