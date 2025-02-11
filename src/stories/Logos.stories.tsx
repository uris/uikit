import type { Meta, StoryObj } from '@storybook/react';
import { Logos } from '../uikit/Logos/Logos';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const meta: Meta<typeof Logos> = {
  title: 'UI Kit/Logos',
  component: Logos,
  args: {
    image: 'gp',
    color: undefined,
    height: 36,
  },
};

export default meta;

export const Default: StoryObj<typeof Logos> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <Logos {...args} />
      </FlexDiv>
    );
  },
};
