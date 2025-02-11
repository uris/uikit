import type { Meta, StoryObj } from '@storybook/react';
import { UIButton } from '../uikit/UIButton/UIButton';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { light } from '../theme/useGiaThemes';

const theme = light;
const loremIpsum = `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.`;
const meta: Meta<typeof FlexDiv> = {
  title: 'UI Kit/FlexDiv',
  component: FlexDiv,
  argTypes: {
    justify: {
      control: { type: 'radio' },
      options: ['start', 'center', 'end', 'between', 'top', 'bottom'],
    },
    children: {
      options: ['Buttons', 'ShortText', 'LongText'],
      mapping: {
        Buttons: (
          <>
            <UIButton label="Button 1" variant={'solid'} />
            <UIButton label="Button 2" variant={'solid'} />
          </>
        ),
        ShortText: 'This is some text',
        LongText: loremIpsum,
      },
    },
  },
  args: {
    children: undefined,
    scrollY: true,
    scrollX: false,
    background: theme.lyraColors['core-surface-secondary'],
    direction: 'column',
    alignItems: 'center',
    justify: 'start',
    height: '300px',
    width: '300px',
    wrap: false,
    reverse: false,
    padding: 44,
    margin: 0,
    absolute: false,
    flex: undefined,
    className: undefined,
    gap: 16,
    variants: undefined,
    transition: undefined,
    animate: undefined,
    enter: undefined,
    exit: undefined,
  },
};

export default meta;
// type Story = StoryObj<typeof FlexDiv>;

export const Default: StoryObj<typeof FlexDiv> = {
  render: (args) => {
    return (
      <FlexDiv justify={'center'} alignItems={'center'} padding={64}>
        <FlexDiv {...args} />
      </FlexDiv>
    );
  },
};
