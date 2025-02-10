import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { light } from '../theme/useGiaThemes';
import { Pager } from '../uikit/Pager/Pager';

const theme = light;
const meta: Meta<typeof Pager> = {
  title: 'UI Kit/Pager',
  component: Pager,
  args: {
    size: 8,
    index: 0,
    color: theme.lyraColors['core-badge-secondary'],
    colorHover: theme.lyraColors['core-badge-secondary'],
    colorOn: theme.lyraColors['core-text-secondary'],
    pages: 2,
    gap: 4,
    onChange: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof Pager> = {};
