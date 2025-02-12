import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { UIIcon, Icons } from '../uikit/UIIcon/UIIcon';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const icons = Object.values(Icons).sort();
const meta: Meta<typeof UIIcon> = {
  title: 'UI Kit/UI Icon',
  component: UIIcon,
  argTypes: {
    name: {
      control: { type: 'select' }, // Dropdown selection
      options: icons, // Enum values as options
    },
  },
  args: {
    name: 'home',
    size: 20,
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

export const Default: StoryObj<typeof UIIcon> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <UIIcon {...args} />
      </FlexDiv>
    );
  },
};
