import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { MessageInput } from '../uikit/MessageInput/InputField/MessageInput';
import {
  PrompState,
  UserPresence,
} from '../uikit/MessageInput/UserList/_Types';
import { Excerpt } from '../uikit/MessageInput/ExcerptList/ExcerptList';

const testFile: Partial<File> = {
  name: 'secret-plans-to-blow-up-the-deathstar.docx',
  type: 'Mircrosoft word / docx',
  size: 425,
  lastModified: new Date().getSeconds(),
};

const testExcerpt: Excerpt = {
  content:
    'OB1, we meet again at last. When I left you I was but a learner. Now I am the master... Your powers grow weak old man.',
  range: { from: 0, to: 100 },
  docID: 'docID',
};

const user: UserPresence = {
  avatar:
    'https://api.typeup.app/avatars/3c7b7a91-5b68-4b0e-87ee-1c4ee0050f31.png',
  conversationID: '87602118-366b-486b-a627-c56277d074b1',
  email: 'ob1kenobi@gmail.com',
  first: 'OB1',
  last: 'Kenobi',
  promptContent:
    'this is me typing Implement a range of health interventions that address both occupational diseases and general health concerns. This can include fatigue management, chemical management, hearing conservation, fall prevention, and chronic disease management.',
  promptState: PrompState.Enabled,
};

const meta: Meta<typeof MessageInput> = {
  title: 'UI Kit/MessageInput',
  component: MessageInput,
  args: {
    value: '',
    maxHeight: 1000,
    focused: false,
    error: null,
    placeholder: 'Ask me anytning HR compliance',
    isStreaming: false,
    isFetching: false,
    isShort: false,
    jurisdiction: null,
    currentUser: 'test@me.com',
    owner: 'test@me.com',
    users: [user],
    excerpts: [testExcerpt],
    files: [testFile as File],
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
