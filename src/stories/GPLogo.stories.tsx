import type { Meta, StoryObj } from '@storybook/react';
import { GPLogo as GPLogoLyra } from 'gia-lyra-uikit';
import { GPLogo } from '../uikit/Logos/GPLogo';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const meta: Meta<typeof GPLogo> = {
  title: 'UI Kit / GPLogo',
  component: GPLogo,
  args: {
    height: 36,
    markonly: false,
    retina: '2x',
    type: 'png',
    color: 'full',
    gap: 0,
  },
};

export default meta;

export const Default: StoryObj<typeof GPLogo> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <GPLogoLyra {...args} />
        <GPLogo {...args} />
      </FlexDiv>
    );
  },
};
