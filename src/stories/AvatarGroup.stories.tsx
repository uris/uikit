import type { Meta, StoryObj } from '@storybook/react';
import { AvatarInfo } from 'src/uikit/AvatarGroup';
import { AvatarGroup } from '../uikit/AvatarGroup/AvatarGroup';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const avatars: AvatarInfo[] = [
  {
    first: 'John',
    last: 'Appleseed',
    image: 'public/images/profile-male-02.jpg',
    email: 'johna@email.com',
  },
  {
    first: 'Jane',
    last: 'Appleseed',
    image: '',
    email: 'jane@email.com',
  },
];

const meta: Meta<typeof AvatarGroup> = {
  title: 'UI Kit/AvatarGroup',
  component: AvatarGroup,
  args: {
    avatars: avatars,
    size: 38,
    border: 3,
    overlap: 8,
    selected: false,
    bgColor: undefined,
  },
};

export default meta;

export const Default: StoryObj<typeof AvatarGroup> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <AvatarGroup {...args} />
      </FlexDiv>
    );
  },
};
