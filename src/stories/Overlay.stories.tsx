import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Overlay } from '../uikit/Overlay/Overlay';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const meta: Meta<typeof Overlay> = {
  title: 'UI Kit/Overlay',
  component: Overlay,
  args: {
    opacity: 1,
    color: '#00000080',
    type: 'dark',
    global: false,
    overlay: undefined,
    onClick: fn(),
    toggleOverlay: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof Overlay> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <Overlay {...args} />
      </FlexDiv>
    );
  },
};
