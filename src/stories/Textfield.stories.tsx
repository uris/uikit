import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '../uikit/Textfield/TextField';

const meta: Meta<typeof TextField> = {
  title: 'UI Kit/Textfield',
  component: TextField,
  args: {},
};

export default meta;

export const Default: StoryObj<typeof TextField> = {};
