import type { Meta, StoryObj } from '@storybook/react';
import { Spacer } from '../uikit/Spacer/Spacer';

const meta: Meta<typeof Spacer> = {
  title: 'UI Kit/Spacer',
  component: Spacer,
  args: {
    size: 8,
  },
};

export default meta;

export const Default: StoryObj<typeof Spacer> = {};
