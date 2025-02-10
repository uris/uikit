import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { RadioButton } from '../uikit/RadioButton/RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'UI Kit/RadioButton',
  component: RadioButton,
  args: {
    option: {
      fieldName: 'option',
      title: 'Option',
      state: false,
      icon: 'circle',
    },
    selected: false,
    deslect: true,
    tabIndex: 1,
    wrap: false,
    sizeToFit: false,
    hideRadio: false,
    toggleIcon: true,
    noFrame: false,
    flex: undefined,
    onChange: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof RadioButton> = {};
