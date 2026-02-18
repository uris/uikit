import type { Meta, StoryObj } from "@storybook/react-vite";
import { FlexDiv } from "../uikit/FlexDiv/FlexDiv";
import { TextField } from "../uikit/Textfield/TextField";

const meta: Meta<typeof TextField> = {
	title: "UI Kit/Textfield",
	component: TextField,
	args: {},
};

export default meta;

export const Default: StoryObj<typeof TextField> = {
	render: (args) => {
		return (
			<FlexDiv justify={"center"} alignItems={"center"} padding={64}>
				<TextField {...args} />
			</FlexDiv>
		);
	},
};
