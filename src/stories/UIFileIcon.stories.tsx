import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { UIFileIcon, UIFileIcons } from '../uikit/UIFileIcon/UIFileIcon';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const icons = Object.values(UIFileIcons).sort();
const meta: Meta<typeof UIFileIcon> = {
  title: 'UI Kit/UI File Icon',
  component: UIFileIcon,
  argTypes: {
    name: {
      control: { type: 'select' }, // Dropdown selection
      options: icons, // Enum values as options
    },
  },
  args: {
    name: 'document',
    size: 20,
    pointer: false,
    disabled: false,
    onClick: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof UIFileIcon> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <UIFileIcon {...args} />
      </FlexDiv>
    );
  },
};
