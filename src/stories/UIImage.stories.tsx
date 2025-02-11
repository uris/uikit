import type { Meta, StoryObj } from '@storybook/react';
import { UIImage, UIImageNames } from '../uikit/UIImage/UIImage';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const meta: Meta<typeof UIImage> = {
  title: 'UI Kit/UIImage',
  component: UIImage,
  args: {
    name: UIImageNames.gpcolorlogo,
    type: 'png',
    width: 'auto',
    height: 'auto',
    dpr: 'none',
    title: undefined,
  },
};

export default meta;

export const Default: StoryObj<typeof UIImage> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <UIImage {...args} />
      </FlexDiv>
    );
  },
};
