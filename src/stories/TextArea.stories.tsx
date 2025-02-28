import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TextArea } from '../uikit/TextArea/TextArea';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const meta: Meta<typeof TextArea> = {
  title: 'UI Kit/TextArea',
  component: TextArea,
  args: {
    value: '',
    name: 'text_area',
    width: '100%',
    height: 'auto',
    focused: false,
    spacer: 'none',
    custom: 0,
    placeholder: 'Enter your text here',
    rows: 6,
    dark: true,
    padding: '16px 4px 16px 16px',
    validate: true,
    resizable: false,
    hasSend: false,
    sendOffset: { bottom: 6, right: 6 },
    sendSize: 36,
    bgColor: undefined,
    border: undefined,
    returnSubmits: false,
    textSize: 'm',
    tips: [{ key: 'Esc', label: 'exits' }],
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    onValidate: fn(),
    onSubmit: fn(),
    onKeyDown: fn(),
    onAction: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof TextArea> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <TextArea {...args} />
      </FlexDiv>
    );
  },
};
