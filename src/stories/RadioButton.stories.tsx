import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { RadioButton } from '../uikit/RadioButton/RadioButton';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const meta: Meta<typeof RadioButton> = {
  title: 'UI Kit/RadioButton',
  component: RadioButton,
  args: {
    option: {
      fieldName: 'option',
      title: 'Option',
      state: false,
      icon: 'circle',
    },
    selected: false,
    deslect: true,
    tabIndex: 1,
    wrap: false,
    sizeToFit: false,
    hideRadio: false,
    toggleIcon: true,
    noFrame: false,
    flex: undefined,
    onChange: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof RadioButton> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <RadioButton {...args} />
      </FlexDiv>
    );
  },
};
