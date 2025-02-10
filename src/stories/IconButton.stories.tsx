import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { IconButton } from '../uikit/IconButton/IconButton';
import { IconNames } from '../uikit/Icon/Icon';

const icons = Object.values(IconNames);
const meta: Meta<typeof IconButton> = {
  title: 'UI Kit/IconButton',
  component: IconButton,
  argTypes: {
    icon: {
      control: { type: 'select' }, // Dropdown selection
      options: icons, // Enum values as options
    },
  },
  args: {
    frameSize: 36,
    iconSize: 20,
    icon: 'plus',
    borderRadius: 4,
    tooltip: undefined,
    color: undefined,
    colorOn: undefined,
    bgColor: undefined,
    bgColorHover: undefined,
    bgColorOn: undefined,
    transition: undefined,
    variants: undefined,
    initial: undefined,
    animate: undefined,
    exit: undefined,
    fillColor: undefined,
    label: undefined,
    hover: true,
    count: 0,
    toggle: true,
    toggleIcon: false,
    isToggled: false,
    disabled: false,
    showDot: false,
    fill: false,
    onClick: fn(),
    onToolTip: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof IconButton> = {};
