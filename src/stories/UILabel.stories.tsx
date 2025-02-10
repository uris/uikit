import type { Meta, StoryObj } from '@storybook/react';
import { UILabel } from '../uikit/UILabel/UILabel';

const meta: Meta<typeof UILabel> = {
  title: 'UI Kit/UILabel',
  component: UILabel,
  args: {
    label: 'UI Label',
    state: 'red',
    noFill: false,
    button: false,
    round: false,
    onClick: () => null,
  },
};

export default meta;

export const Default: StoryObj<typeof UILabel> = {};
