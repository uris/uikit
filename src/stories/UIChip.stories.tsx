import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { UIChip } from '../uikit/UIChip/UIChip';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { Icons } from '../uikit/UIIcon/UIIcon';

const icons = Object.values(Icons).sort();
const meta: Meta<typeof UIChip> = {
  title: 'UI Kit/UI Chip',
  component: UIChip,
  argTypes: {
    icon: {
      control: { type: 'select' }, // Dropdown selection
      options: icons, // Enum values as options
    },
  },
  args: {
    label: 'Chip Label',
    icon: 'sparkle',
    disabled: false,
    focused: false,
    variant: 'regular',
    unframed: false,
    onClick: fn(),
    onToolTip: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof UIChip> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <UIChip {...args} />
      </FlexDiv>
    );
  },
};
