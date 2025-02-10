import type { Meta, StoryObj } from '@storybook/react';
import { light } from '../theme/useGiaThemes';
import { UIIcon } from "../uikit/UIIcon/UIIcon";

const theme = light
const meta: Meta<typeof UIIcon> = {
  title: "UI Kit/UIIcon",  
  component: UIIcon,
  args: {
    name: 'home',
    size: 20,
    stroke: 1.5,
    strokeColor: theme.colors.iconPrimary,
    fillColor: theme.colors.transparent,
    toggle: false,
    pointer: true,
    disabled: false,
    onClick: ()=> null
  },
};

export default meta;

export const Default: StoryObj<typeof UIIcon> = {};
