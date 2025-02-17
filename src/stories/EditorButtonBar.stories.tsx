import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { EditorButtonBar } from '../uikit/EditorButtonBar/EditorButtonBar';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const meta: Meta<typeof EditorButtonBar> = {
  title: 'UI Kit / EditorButtonBar',
  component: EditorButtonBar,
  args: {
    shortSize: 560,
    state: 'auto',
    activeFormats: [],
    activeStyle: 'p',
    onCommand: fn(),
    onToolTip: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof EditorButtonBar> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <EditorButtonBar {...args} />
      </FlexDiv>
    );
  },
};
