import type { Meta, StoryObj } from '@storybook/react';
import { UIIcon } from '../uikit/UIIcon/UIIcon';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const meta: Meta<typeof UIIcon> = {
  title: 'UI Kit/UIIcon',
  component: UIIcon,
  args: {
    name: 'home',
    size: 20,
    stroke: 1.5,
    strokeColor: undefined,
    fillColor: 'transparent',
    toggle: false,
    pointer: true,
    disabled: false,
    onClick: () => null,
  },
};

export default meta;

export const Default: StoryObj<typeof UIIcon> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <UIIcon {...args} />
      </FlexDiv>
    );
  },
};
