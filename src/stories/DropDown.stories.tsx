import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { light } from '../theme/useGiaThemes';
import { DropDown, DropDownOption } from '../uikit/DropDown/DropDown';

const optionsWPlace: DropDownOption[] = [
  { label: 'select an option', value: 'none' },
  { label: 'option 1', value: 'option-1' },
  { label: 'option 2', value: 'option-2' },
];

const theme = light;
const meta: Meta<typeof DropDown> = {
  title: 'UI Kit/DropDown',
  component: DropDown,
  args: {
    width: '100%',
    height: 'auto',
    selectedIndex: 0,
    selectedValue: '',
    options: optionsWPlace,
    placeholder: true,
    validate: true,
    borderRadius: 4,
    dark: false,
    bgColor: theme.colors.transparent,
    iconColor: theme.colors.textPrimary,
    fontSize: undefined,
    padding: '8px',
    iconSize: 24,
    disabled: false,
    unframed: false,
    focused: false,
    textType: theme.lyraType['body-l-regular'],
    fontWeight: 500,
    gap: 0,
    onChange: fn(),
    onValidate: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof DropDown> = {};
