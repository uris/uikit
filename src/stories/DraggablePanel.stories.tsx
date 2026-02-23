import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { fn } from 'storybook/test';
import {
	DraggablePanel,
	type DraggablePanelProps,
} from '../uikit/DraggablePanel/DrggablePanel';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';
import { IconButton } from '../uikit/IconButton';

const meta: Meta<typeof DraggablePanel> = {
	title: 'UI Kit/Draggable Panel',
	component: DraggablePanel,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		children: undefined,
		sizeConstraints: { initial: 150, min: 100, max: 350 },
		dragsRight: true,
		isClosed: false,
		resizeHandle: {
			width: 10,
			color: 'transparent',
			offsetX: true,
		},
		dragHandle: true,
		dragHandleStyle: {
			width: 6,
			height: 6,
			radius: 100,
			stroke: 1,
			color: 'var(--core-surface-primary)',
			strokeColor: 'var(--core-outline-primary)',
		},
		borderRight: undefined,
		borderLeft: undefined,
		bgColor: undefined,
		drags: true,
		isTouchDevice: false,
		containerRef: undefined,
		onResize: fn(),
		onResizeStart: fn(),
		onResizeEnd: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof DraggablePanel> = {
	render: (args) => {
		return <DraggablePanelWithChildren {...args} />;
	},
};

// create a component to pass in ref from a use ref hook
function DraggablePanelWithChildren(args: Readonly<DraggablePanelProps>) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [closed, setClosed] = useState(args.isClosed);
	useEffect(() => setClosed(args.isClosed), [args.isClosed]);
	return (
		<div ref={containerRef}>
			<FlexDiv
				width={'fill'}
				height={'fill'}
				direction={'row'}
				background={'var(--core-surface-primary)'}
			>
				<DraggablePanel {...args} containerRef={containerRef} isClosed={closed}>
					<FlexDiv
						alignItems={'end'}
						justify={'center'}
						background={'var(--core-surface-secondary)'}
						padding={8}
					></FlexDiv>
				</DraggablePanel>
				<FlexDiv width={'auto'} height={'fill'} justify={'start'} padding={24}>
					<IconButton
						icon={closed ? 'arrow right' : 'arrow left'}
						iconSize={20}
						onClick={() => setClosed(!closed)}
					/>
				</FlexDiv>
			</FlexDiv>
		</div>
	);
}
