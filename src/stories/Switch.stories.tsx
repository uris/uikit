import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { lightTheme } from "../theme/useGiaThemes";
import { FlexDiv } from "../uikit/FlexDiv/FlexDiv";
import { Switch } from "../uikit/Switch/Switch";

const meta: Meta<typeof Switch> = {
	title: "UI Kit/Switch",
	component: Switch,
	args: {
		state: false,
		height: 22,
		width: 44,
		padding: 3,
		bgColorOn: lightTheme.lyraColors["feedback-positive"],
		bgColorOff: lightTheme.lyraColors["core-badge-secondary"],
		knobColor: lightTheme.lyraColors["core-text-light"],
		onChange: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof Switch> = {
	render: (args) => {
		return (
			<FlexDiv justify={"center"} alignItems={"center"} padding={64}>
				<Switch {...args} />
			</FlexDiv>
		);
	},
};
