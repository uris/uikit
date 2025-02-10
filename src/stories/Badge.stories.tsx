import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../uikit/Badge/Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI Kit/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: { type: 'radio' }, // Dropdown selection
      options: ['dark', 'light', undefined], // Enum values as options
    },
  },
  args: {
    count: 5,
    variant: 'dark',
    hideNull: true,
  },
};

export default meta;

export const Default: StoryObj<typeof Badge> = {};
