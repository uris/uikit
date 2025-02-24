import type { Meta, StoryObj } from '@storybook/react';
import { GPGiaLogo } from '../uikit/Logos/GPGiaLogo';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const meta: Meta<typeof GPGiaLogo> = {
  title: 'UI Kit / GiaLogo',
  component: GPGiaLogo,
  args: {
    color: 'full',
    height: 36,
  },
};

export default meta;

export const Default: StoryObj<typeof GPGiaLogo> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <GPGiaLogo {...args} />
      </FlexDiv>
    );
  },
};
