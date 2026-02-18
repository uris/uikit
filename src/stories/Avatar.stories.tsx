import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { lightTheme } from "../theme/useGiaThemes";
import { Avatar } from "../uikit/Avatar/Avatar";
import { FlexDiv } from "../uikit/FlexDiv/FlexDiv";

const meta: Meta<typeof Avatar> = {
	title: "UI Kit/Avatar",
	component: Avatar,
	args: {
		first: "John",
		last: "Doe",
		image: "public/images/profile-male-02.jpg",
		border: 0,
		borderColor: lightTheme.lyraColors["core-surface-primary"],
		bgColor: undefined,
		transition: undefined,
		animate: undefined,
		initial: undefined,
		exit: undefined,
		onToolTip: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof Avatar> = {
	render: (args) => {
		return (
			<FlexDiv justify={"center"} alignItems={"center"} padding={64}>
				<Avatar {...args} />
			</FlexDiv>
		);
	},
};
