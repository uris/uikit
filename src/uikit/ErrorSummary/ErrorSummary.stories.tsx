import type { Meta, StoryObj } from '@storybook/react-vite';
import { runErrorSummaryPlay } from 'src/stories/playHelpers';
import {
	type ErrorMessage,
	ErrorSummary,
} from 'src/uikit/ErrorSummary/ErrorSummary';
import { FlexDiv } from 'src/uikit/FlexDiv/FlexDiv';

const errorMessages: ErrorMessage[] = [
	{ id: '1', title: 'Error type 1', bullets: ['Bullet 1', 'Bullet 2'] },
	{ id: '2', title: 'Error type 2', bullets: ['Bullet 1', 'Bullet 2'] },
];
const meta: Meta<typeof ErrorSummary> = {
	title: 'Components/ErrorSummary',
	component: ErrorSummary,
	args: {
		entries: errorMessages,
		errors: [0, 1],
	},
};

export default meta;

export const Default: StoryObj<typeof ErrorSummary> = {
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<ErrorSummary {...args} />
			</FlexDiv>
		);
	},
	play: async ({ canvasElement, args }) => {
		await runErrorSummaryPlay({ canvasElement, args });
	},
};
