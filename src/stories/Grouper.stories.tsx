import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Grouper } from '../uikit/Grouper/Grouper';

const meta: Meta<typeof Grouper> = {
  title: 'UI Kit/Grouper',
  component: Grouper,
  args: {
    title: 'Group Title',
    toggle: true,
    open: true,
    hasIcon: true,
    iconName: 'chevron down',
    iconSize: 18,
    frameSize: 64,
    border: 0,
    count: 0,
    unframed: false,
    variant: 'group',
    hideNull: true,
    showFilterBadge: false,
    onChange: fn(),
    onClick: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof Grouper> = {};
