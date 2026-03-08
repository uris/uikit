import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from 'src/uikit/FlexDiv';
import { fn } from 'storybook/test';
import { FileList } from './FileList';

const meta: Meta<typeof FileList> = {
	title: 'Components/FileList',
	component: FileList,
	args: {
		files: [
			'document.doc',
			'spreadsheet.xls',
			'image.png',
			'markdown.md',
			'pdf.pdf',
			'video.mp4',
			'audio.mp3',
			'a veru long name for a file that is of type unknown that is also very freakishly long.zip',
		],
		size: 's',
		maxWidth: undefined,
		direction: 'row',
		gap: 8,
		onChange: fn(),
		onToolTip: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof FileList> = {
	render: (args) => {
		return (
			<FlexDiv
				justify={'center'}
				alignItems={'center'}
				padding={64}
				style={{ overflow: 'hidden' }}
				width={'fill'}
				height={'viewport'}
			>
				<FileList {...args} />
			</FlexDiv>
		);
	},
};
