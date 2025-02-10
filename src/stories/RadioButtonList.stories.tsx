import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { RadioButtonOption } from 'src/uikit/RadioButton';
import { RadioButtonList } from '../uikit/RadioButtonList/RadioButtonList';

const options: RadioButtonOption[] = [
  {
    fieldName: 'option',
    title: 'Option 1',
    state: false,
    icon: 'circle',
  },
  {
    fieldName: 'option',
    title: 'Option 2',
    state: false,
    icon: 'circle',
  },
];

const meta: Meta<typeof RadioButtonList> = {
  title: 'UI Kit/RadioButtonList',
  component: RadioButtonList,
  args: {
    options: options,
    selectedIndexes: null,
    selectedOptions: null,
    label: null,
    deselect: true,
    multiSelect: false,
    wrap: false,
    tabIndexSeed: 0,
    sizeToFit: false,
    spacer: 'none',
    custom: 0,
    gap: 16,
    hideRadio: false,
    flex: undefined,
    noFrame: false,
    toggleIcon: true,
    iconColor: undefined,
    iconSelectedColor: undefined,
    onChange: fn(),
    onMore: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof RadioButtonList> = {};
