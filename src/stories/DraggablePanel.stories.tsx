import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { lyraLight } from "../theme/colors/colors";
import { DraggablePanel } from "../uikit/DraggablePanel/DrggablePanel";
import { FlexDiv } from "../uikit/FlexDiv/FlexDiv";
import { UIButton } from "../uikit/UIButton/UIButton";

const meta: Meta<typeof DraggablePanel> = {
	title: "UI Kit/Draggable Panel",
	component: DraggablePanel,
	parameters: {
		layout: "fullscreen",
	},
	args: {
		children: undefined,
		sizeContraints: { initial: 150, min: 100, max: 350 },
		dragsRight: true,
		isClosed: false,
		resizeHandle: {
			width: 10,
			color: "transparent",
			offsetX: true,
		},
		borderRight: `1px solid ${lyraLight["core-outline-primary"]}`,
		borderLeft: null,
		bgColor: lyraLight["core-surface-secondary"],
		drags: true,
		isTouchDevice: false,
		onResize: fn(),
		onResizeStart: fn(),
		onResizeEnd: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof DraggablePanel> = {
	render: (args) => {
		return (
			<FlexDiv
				width={"100%"}
				height={"fill"}
				background={lyraLight["core-surface-primary"]}
			>
				<DraggablePanel {...args}>
					<FlexDiv alignItems={"center"} justify={"center"}>
						<UIButton
							size={"text"}
							variant={"text"}
							label={"drags right"}
							iconRight={"arrow right"}
						/>
					</FlexDiv>
				</DraggablePanel>
			</FlexDiv>
		);
	},
};
