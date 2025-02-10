import type { Meta, StoryObj } from '@storybook/react';
import { light } from '../theme/useGiaThemes';
import { Logos } from "../uikit/Logos/Logos";

const theme = light
const meta: Meta<typeof Logos> = {
  title: "UI Kit/Logos",  
  component: Logos,
  args: {
    image: 'gp',
    color: theme.colors.textPrimary,
    height: 36
  },
};

export default meta;

export const Default: StoryObj<typeof Logos> = {};
