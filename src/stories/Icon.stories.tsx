import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { light } from '../theme/useGiaThemes';
import { Icon, IconNames } from '../uikit/Icon/Icon';

const icons = Object.values(IconNames);
const theme = light;
const meta: Meta<typeof Icon> = {
  title: 'UI Kit/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: { type: 'select' }, // Dropdown selection
      options: icons, // Enum values as options
    },
  },
  args: {
    name: 'home',
    size: 22,
    stroke: 1.5,
    strokeColor: theme.lyraColors['core-icon-primary'],
    fillColor: 'transparent',
    toggle: false,
    pointer: true,
    disabled: false,
    onClick: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof Icon> = {};
