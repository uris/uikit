import type { Meta, StoryObj } from '@storybook/react';
import { light } from '../theme/useGiaThemes';
import { Avatar } from '../uikit/Avatar/Avatar';

const theme = light;
const meta: Meta<typeof Avatar> = {
  title: 'UI Kit/Avatar',
  component: Avatar,
  args: {
    first: 'John',
    last: 'Doe',
    image: 'public/images/profile-male-02.jpg',
    border: 0,
    borderColor: theme.colors.bgNormal,
    bgColor: undefined,
    transition: undefined,
    animate: undefined,
    initial: undefined,
    exit: undefined,
  },
};

export default meta;

export const Default: StoryObj<typeof Avatar> = {};
