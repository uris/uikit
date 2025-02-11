import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { UIButton } from '../uikit/UIButton/UIButton';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const meta: Meta<typeof UIButton> = {
  title: 'UI Kit/UIButton',
  component: UIButton,
  args: {
    size: 'large',
    variant: 'solid',
    label: 'Button Label',
    iconRight: 'arrow right',
    iconLeft: undefined,
    count: undefined,
    showDot: undefined,
    tooltip: undefined,
    round: false,
    state: 'normal',
    fill: false,
    link: false,
    iconSize: undefined,
    width: 'min-content',
    underline: false,
    borderRadius: undefined,
    iconColor: undefined,
    bgColor: undefined,
    bgColorDisabled: undefined,
    labelColor: undefined,
    fontSize: 'small',
    transition: undefined,
    variants: undefined,
    initial: undefined,
    animate: undefined,
    exit: undefined,
    progress: false,
    working: false,
    duration: undefined,
    trigger: false,
    destructive: false,
    onClick: fn(),
    onToolTip: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof UIButton> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <UIButton {...args} />
      </FlexDiv>
    );
  },
};
