import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { FlexDiv } from "../uikit/FlexDiv/FlexDiv";
import { UILabel } from "../uikit/UILabel/UILabel";

const meta: Meta<typeof UILabel> = {
	title: "UI Kit/UILabel",
	component: UILabel,
	args: {
		label: "UI Label",
		state: "red",
		noFill: false,
		button: false,
		round: false,
		onClick: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof UILabel> = {
	render: (args) => {
		return (
			<FlexDiv justify={"center"} alignItems={"center"} padding={64}>
				<UILabel {...args} />
			</FlexDiv>
		);
	},
};
