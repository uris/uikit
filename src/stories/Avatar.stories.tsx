import type { Meta, StoryObj } from '@storybook/react';
import { light } from '../theme/useGiaThemes';
import { Avatar } from '../uikit/Avatar/Avatar';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const theme = light;
const meta: Meta<typeof Avatar> = {
  title: 'UI Kit/Avatar',
  component: Avatar,
  args: {
    first: 'John',
    last: 'Doe',
    image: 'public/images/profile-male-02.jpg',
    border: 0,
    borderColor: theme.lyraColors['core-surface-primary'],
    bgColor: undefined,
    transition: undefined,
    animate: undefined,
    initial: undefined,
    exit: undefined,
  },
};

export default meta;

export const Default: StoryObj<typeof Avatar> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <Avatar {...args} />
      </FlexDiv>
    );
  },
};
