import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexDiv } from "../uikit/FlexDiv/FlexDiv";
import { Spacer } from "../uikit/Spacer/Spacer";

const meta: Meta<typeof Spacer> = {
	title: "UI Kit/Spacer",
	component: Spacer,
	args: {
		size: 8,
	},
};

export default meta;

export const Default: StoryObj<typeof Spacer> = {
	render: (args) => {
		return (
			<FlexDiv justify={"center"} alignItems={"center"} padding={64}>
				<Spacer {...args} />
			</FlexDiv>
		);
	},
};
