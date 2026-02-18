import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { FlexDiv } from "../uikit/FlexDiv/FlexDiv";
import { ProgressBar, defaultSteps } from "../uikit/ProgressBar/ProgressBar";

const meta: Meta<typeof ProgressBar> = {
	title: "UI Kit/ProgressBar",
	component: ProgressBar,
	args: {
		steps: defaultSteps,
		currentIndex: 0,
		clickable: true,
		onChange: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof ProgressBar> = {
	render: (args) => {
		return (
			<FlexDiv justify={"center"} alignItems={"center"} padding={64}>
				<ProgressBar {...args} />
			</FlexDiv>
		);
	},
};
