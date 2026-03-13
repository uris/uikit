import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AvatarInfo } from 'src/components/AvatarGroup';
import { AvatarGroup } from 'src/components/AvatarGroup';
import { FlexDiv } from 'src/components/FlexDiv';
import { runAvatarGroupPlay } from 'src/components/playHelpers';

const avatars: AvatarInfo[] = [
	{
		first: 'John',
		last: 'Appleseed',
		image: 'https://www.slice-uikit.com/public/images/profile-male-02.jpg',
		email: 'johna@email.com',
	},
	{
		first: 'Jane',
		last: 'Appleseed',
		image: '',
		email: 'jane@email.com',
	},
];

const meta: Meta<typeof AvatarGroup> = {
	title: 'Components/AvatarGroup',
	component: AvatarGroup,
	args: {
		avatars: avatars,
		size: 38,
		border: 3,
		overlap: 8,
	},
};

export default meta;

export const Default: StoryObj<typeof AvatarGroup> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<AvatarGroup {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runAvatarGroupPlay({ canvasElement, args });
	},
};
