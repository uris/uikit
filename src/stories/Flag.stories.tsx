import type { Meta, StoryObj } from '@storybook/react';
import { Flag, FlagNames } from '../uikit/Flags/Flag';

const meta: Meta<typeof Flag> = {
  title: 'UI Kit / Flag',
  component: Flag,
  argTypes: {
    flag: {
      control: { type: 'select' }, // Dropdown selection
      options: Object.values(FlagNames), // Enum values as options
    },
  },
  args: {
    flag: FlagNames.USA,
    size: 32,
  },
};

export default meta;

export const Default: StoryObj<typeof Flag> = {};
