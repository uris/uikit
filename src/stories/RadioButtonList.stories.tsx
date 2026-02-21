import type { Meta, StoryObj } from "@storybook/react-vite";
import type { RadioButtonOption } from "src/uikit/RadioButton";
import { fn } from "storybook/test";
import { FlexDiv } from "../uikit/FlexDiv/FlexDiv";
import { RadioButtonList } from "../uikit/RadioButtonList/RadioButtonList";

const options: RadioButtonOption[] = [
	{
		fieldName: "option",
		title: "Option 1",
		state: false,
		icon: "circle",
	},
	{
		fieldName: "option",
		title: "Option 2",
		state: false,
		icon: "circle",
	},
];

const meta: Meta<typeof RadioButtonList> = {
	title: "UI Kit/RadioButtonList",
	component: RadioButtonList,
	args: {
		options: options,
		selectedIndexes: null,
		selectedOptions: null,
		label: null,
		deselect: true,
		multiSelect: false,
		wrap: false,
		tabIndexSeed: 0,
		spacer: "none",
		custom: 0,
		gap: 16,
		hideRadio: false,
		noFrame: false,
		toggleIcon: true,
		iconColor: undefined,
		iconSelectedColor: undefined,
		onChange: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof RadioButtonList> = {
	render: (args) => {
		return (
			<FlexDiv justify={"center"} alignItems={"center"} padding={64}>
				<RadioButtonList {...args} />
			</FlexDiv>
		);
	},
};
