import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { placeholderOptions, TabBar } from '../uikit/TabBar/TabBar';

const meta: Meta<typeof TabBar> = {
  title: 'UI Kit/TabBar',
  component: TabBar,
  args: {
    options: placeholderOptions,
    selected: 0,
    border: true,
    height: '100%',
    width: '100%',
    padding: 8,
    textStyle: 'textRegular',
    iconSize: 24,
    iconGap: 4,
    tabGap: 0,
    dragsApp: false,
    disabled: false,
    hasClose: false,
    closeWidth: 'auto',
    selectedValue: null,
    state: null,
    size: 1,
    onChange: fn(),
    onTabChange: fn(),
    onClose: fn(),
    onToolTip: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof TabBar> = {};
