import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CheckBox } from '../uikit/CheckBox/CheckBox';

const meta: Meta<typeof CheckBox> = {
  title: 'UI Kit/CheckBox',
  component: CheckBox,
  argTypes: {
    checked: {
      control: { type: 'radio' }, // Dropdown selection
      options: [true, false], // Enum values as options
    },
  },
  args: {
    size: 20,
    checked: false,
    disabled: false,
    color: undefined,
    label: 'Checkbox label',
    onChange: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof CheckBox> = {};
