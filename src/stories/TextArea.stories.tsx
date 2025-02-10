import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TextArea } from '../uikit/TextArea/TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'UI Kit/TextArea',
  component: TextArea,
  args: {
    value: '',
    name: 'text_area',
    width: '100%',
    height: 'auto',
    focused: false,
    spacer: 'none',
    custom: 0,
    placeholder: 'Enter your text here',
    rows: 6,
    dark: true,
    padding: '16px 4px 16px 16px',
    validate: true,
    resizable: true,
    hasSend: false,
    sendOffset: { bottom: 6, right: 6 },
    sendSize: 36,
    bgColor: undefined,
    border: undefined,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onValidate: fn(),
    onSubmit: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof TextArea> = {};
