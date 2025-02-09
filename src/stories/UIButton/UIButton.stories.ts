import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { UIButton } from '../../../src/uikit/Buttons/UIButon/UIButton';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UIButton',
  component: UIButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    //
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof UIButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Solid: Story = {
  args: {
    variant: 'solid',
    size: 'large',
    fontSize: 'medium',
    label: 'Button Label',
    iconRight: 'arrow right',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'large',
    fontSize: 'medium',
    label: 'Button Label',
    iconRight: 'arrow right',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    size: 'text',
    fontSize: 'medium',
    label: 'Button Label',
    iconRight: 'arrow right',
  },
};
