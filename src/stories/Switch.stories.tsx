import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { light } from '../theme/useGiaThemes';
import { Switch } from '../uikit/Switch/Switch';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const theme = light;
const meta: Meta<typeof Switch> = {
  title: 'UI Kit/Switch',
  component: Switch,
  args: {
    state: false,
    height: 22,
    width: 44,
    padding: 3,
    bgColorOn: theme.lyraColors['feedback-positive'],
    bgColorOff: theme.lyraColors['core-badge-secondary'],
    knobColor: theme.lyraColors['core-text-light'],
    onChange: fn(),
  },
};

export default meta;

export const Default: StoryObj<typeof Switch> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <Switch {...args} />
      </FlexDiv>
    );
  },
};
