import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Icon, IconNames } from '../uikit/Icon/Icon';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const icons = Object.values(IconNames);
const meta: Meta<typeof Icon> = {
  title: 'UI Kit/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: { type: 'select' }, // Dropdown selection
      options: icons, // Enum values as options
    },
  },
  args: {
    name: 'home',
    size: 22,
    stroke: 1.5,
    fillColor: 'transparent',
    strokeColor: undefined,
    toggle: false,
    pointer: true,
    disabled: false,
    onClick: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof Icon> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <Icon {...args} />
      </FlexDiv>
    );
  },
};
