import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { DivInput, InputType } from '../uikit/DivInput/DivInput';

const meta: Meta<typeof DivInput> = {
  title: 'UI Kit/DivInput',
  component: DivInput,
  argTypes: {
    textAlign: {
      control: { type: 'radio' }, // Dropdown selection
      options: ['left', 'center', 'right', undefined], // Enum values as options
    },
  },
  args: {
    value: '',
    placeholder: 'Placeholder',
    isEditable: true,
    type: InputType.DocumentName,
    focus: false,
    width: 'auto',
    textAlign: 'left',
    clamp: 3,
    fontStyle: undefined,
    padding: '16px',
    onChange: fn(),
    onSubmit: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onDblClick: fn(),
    onClick: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof DivInput> = {};
