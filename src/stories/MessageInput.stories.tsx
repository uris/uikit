import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { MessageInput } from '../uikit/MessageInput/InputField/MessageInput';

const meta: Meta<typeof MessageInput> = {
  title: 'UI Kit/MessageInput',
  component: MessageInput,
  args: {
    value: '',
    maxHeight: 300,
    focused: false,
    error: null,
    placeholder: 'Ask me anytning HR compliance',
    isStreaming: false,
    isFetching: false,
    isShort: false,
    jurisdiction: null,
    jurisdictionClick: fn(),
    complianceCheckClick: fn(),
    attachClick: fn(),
    onChangeExcerpts: fn(),
    onChangeFiles: fn(),
    onTogglePrompt: fn(),
    onChange: fn(),
    onBlur: fn(),
    onFocus: fn(),
    onStop: fn(),
    onSend: fn(),
    onToolTip: fn(),
  },
};

export default meta;

//export const Default: StoryObj<typeof MessageInput> = {};
export const Default: StoryObj<typeof MessageInput> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <MessageInput {...args} />
      </FlexDiv>
    );
  },
};
