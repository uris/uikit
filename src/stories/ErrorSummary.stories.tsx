import type { Meta, StoryObj } from '@storybook/react';
import { ErrorSummary, ErrorMessage } from '../uikit/ErrorSummary/ErrorSummary';

const errorMessages: ErrorMessage[] = [
  { id: '1', title: 'Error type 1', bullets: ['Bullet 1', 'Bullet 2'] },
  { id: '2', title: 'Error type 2', bullets: ['Bullet 1', 'Bullet 2'] },
];
const meta: Meta<typeof ErrorSummary> = {
  title: 'UI Kit/ErrorSummary',
  component: ErrorSummary,
  args: {
    entries: errorMessages,
    errors: [0, 1],
  },
};

export default meta;

export const Default: StoryObj<typeof ErrorSummary> = {};
