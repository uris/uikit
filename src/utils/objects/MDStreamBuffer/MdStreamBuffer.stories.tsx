import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useRef, useState } from 'react';
import { expect, within } from 'storybook/test';
import { Button } from '../../../components/Button';
import { FlexDiv } from '../../../components/FlexDiv';
import { Label } from '../../../components/Label';
import { TextArea } from '../../../components/TextArea';
import { TextField } from '../../../components/Textfield';
import { MdBuffer } from './MdStreamBuffer';

const DEFAULT_MARKDOWN = `##### Streaming markdown

This is a **very long piece of bold text**.
This is a [link](https://example.com).
This is an image: ![image](https://example.com/image.png)`;

function getHealthyOutputText(canvasElement: HTMLElement) {
	const canvas = within(canvasElement);
	const output = canvas.getByTestId('healthy-output');
	return output.textContent ?? '';
}

type MarkdownStreamBufferDemoProps = {
	raw: string;
	chunkSize: number;
	intervalMs: number;
	includeLinksAndImages: boolean;
	htmlHandling: 'ignore' | 'strip';
	simulateStream?: boolean;
};

function MarkdownStreamBufferDemo(
	props: Readonly<MarkdownStreamBufferDemoProps>,
) {
	const {
		raw: sourceMarkdown,
		chunkSize: initialChunkSize,
		intervalMs: initialIntervalMs,
		includeLinksAndImages,
		htmlHandling,
		simulateStream = true,
	} = props;
	const [raw, setRaw] = useState(sourceMarkdown);
	const [healthy, setHealthy] = useState('');
	const [streamedRaw, setStreamedRaw] = useState('');
	const [chunkSize, setChunkSize] = useState(String(initialChunkSize));
	const [intervalMs, setIntervalMs] = useState(String(initialIntervalMs));
	const [playing, setPlaying] = useState(false);
	const bufferRef = useRef<MdBuffer | null>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const cursorRef = useRef(0);

	useEffect(() => {
		setRaw(sourceMarkdown);
	}, [sourceMarkdown]);

	useEffect(() => {
		setChunkSize(String(initialChunkSize));
	}, [initialChunkSize]);

	useEffect(() => {
		setIntervalMs(String(initialIntervalMs));
	}, [initialIntervalMs]);

	useEffect(() => {
		const buffer = new MdBuffer({
			includeLinksAndImages,
			htmlHandling,
			onFlush: (snapshot) => {
				setHealthy(snapshot.healthy);
				setStreamedRaw(snapshot.raw);
				if (snapshot.isComplete) {
					setPlaying(false);
					cursorRef.current = 0;
				}
			},
		});

		bufferRef.current = buffer;

		if (!simulateStream) {
			buffer.append(sourceMarkdown);
			buffer.flush();
		}

		return () => {
			if (timerRef.current !== null) {
				clearTimeout(timerRef.current);
				timerRef.current = null;
			}
			buffer.dispose();
			bufferRef.current = null;
		};
	}, [includeLinksAndImages, htmlHandling, sourceMarkdown, simulateStream]);

	useEffect(() => {
		if (simulateStream) return;
		const buffer = bufferRef.current;
		if (!buffer) return;

		buffer.reset();
		buffer.append(raw);
		buffer.flush();
	}, [raw, simulateStream]);

	const stopStream = () => {
		if (timerRef.current !== null) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		setPlaying(false);
	};

	const resetStream = () => {
		stopStream();
		cursorRef.current = 0;
		bufferRef.current?.reset();
		setHealthy('');
		setStreamedRaw('');
	};

	const streamNextChunk = () => {
		const buffer = bufferRef.current;
		if (!buffer) return;

		const parsedChunkSize = Math.max(Number.parseInt(chunkSize, 10) || 1, 1);
		const parsedInterval = Math.max(Number.parseInt(intervalMs, 10) || 16, 0);
		const nextChunk = raw.slice(
			cursorRef.current,
			cursorRef.current + parsedChunkSize,
		);

		if (!nextChunk) {
			buffer.complete();
			stopStream();
			return;
		}

		cursorRef.current += nextChunk.length;
		buffer.append(nextChunk);

		timerRef.current = setTimeout(() => {
			streamNextChunk();
		}, parsedInterval);
	};

	const startStream = () => {
		resetStream();
		setPlaying(true);
		streamNextChunk();
	};

	return (
		<FlexDiv absolute width={'fill'} height={'fill'} padding={64} gap={16}>
			The markdown stream buffer utility transforms streaming markdown into
			"healthy" markdown that can be parsed to render structurally complete
			JSX/HTML and reduce UI and unnecessary renders. Note: Token size has been
			reduced to 1 and interval to 300ms for better clarity of the effects.
			Realtime streams are typically 8 or more characters in size at 100ms or
			less.
			<FlexDiv
				width={'fill'}
				height={'fit'}
				padding={16}
				gap={12}
				border={'1px solid var(--core-outline-primary)'}
				borderRadius={12}
				background={'var(--core-surface-secondary)'}
			>
				<strong>{simulateStream ? 'Source markdown' : 'Raw markdown'}</strong>
				<TextArea
					name={'markdown-stream-buffer-input'}
					placeholder={'Enter raw markdown here...'}
					value={raw}
					onChange={setRaw}
					rows={3}
					border={true}
					resizable={true}
					backgroundColor={'var(--core-surface-primary)'}
				/>
			</FlexDiv>
			{simulateStream && (
				<FlexDiv
					width={'fill'}
					height={'fit'}
					direction={'row'}
					gap={12}
					background={'transparent'}
					wrap={true}
					align={'end'}
				>
					<TextField
						name={'chunk-size'}
						label={'Chunk size:'}
						value={chunkSize}
						onChange={setChunkSize}
						size={{ width: 'auto' }}
						clearButton={null}
					/>
					<TextField
						name={'interval-ms'}
						label={'Interval ms:'}
						value={intervalMs}
						onChange={setIntervalMs}
						size={{ width: 'auto' }}
						clearButton={null}
					/>
					<Button
						label={playing ? 'Streaming...' : 'Play'}
						onClick={startStream}
						state={playing ? 'disabled' : 'normal'}
					/>
					<Button
						label={'Stop'}
						onClick={stopStream}
						state={playing ? 'normal' : 'disabled'}
					/>
					<Button label={'Reset'} onClick={resetStream} />
				</FlexDiv>
			)}
			<FlexDiv width={'fill'} height={'fit'} direction={'row'} gap={12}>
				{simulateStream && (
					<FlexDiv
						width={'fill'}
						height={'fit'}
						padding={16}
						gap={12}
						border={'1px solid var(--core-outline-primary)'}
						borderRadius={12}
						background={'black'}
					>
						<strong>Raw Markdown Stream</strong>
						<pre
							data-testid={'raw-output'}
							style={{
								margin: 0,
								padding: 0,
								whiteSpace: 'pre-wrap',
								wordBreak: 'break-word',
								fontFamily: 'monospace',
								fontSize: '12px',
							}}
						>
							{streamedRaw}
						</pre>
					</FlexDiv>
				)}
				<FlexDiv
					width={'fill'}
					height={'fill'}
					padding={16}
					gap={12}
					border={'1px solid var(--core-outline-primary)'}
					borderRadius={12}
					background={'black'}
				>
					<strong>Healthy Markdown Stream</strong>
					<pre
						data-testid={'healthy-output'}
						style={{
							margin: 0,
							padding: 0,
							whiteSpace: 'pre-wrap',
							wordBreak: 'break-word',
							borderRadius: 8,
							fontFamily: 'monospace',
							fontSize: '12px',
							width: '100%',
						}}
					>
						{healthy}
					</pre>
				</FlexDiv>
			</FlexDiv>
			Select an example below then complete the markdown to see the output:
			<Label
				textSize={'m'}
				padding={'2px 8px'}
				onClick={() => setRaw('This is **part')}
			>
				Eg. Bold: This is **part
			</Label>
			<Label
				textSize={'m'}
				padding={'2px 8px'}
				onClick={() => setRaw('This is a partial [lin')}
			>
				Eg. Link: This is a partial [lin
			</Label>
		</FlexDiv>
	);
}

const meta: Meta<typeof MarkdownStreamBufferDemo> = {
	title: 'Utils/Markdown Buffer Class',
	component: MarkdownStreamBufferDemo,
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		raw: DEFAULT_MARKDOWN,
		chunkSize: 1,
		intervalMs: 150,
		includeLinksAndImages: true,
		htmlHandling: 'ignore',
		simulateStream: true,
	},
};

export default meta;

export const Demo: StoryObj<typeof MarkdownStreamBufferDemo> = {};

export const HeadingHealthy: StoryObj<typeof MarkdownStreamBufferDemo> = {
	tags: ['tests'],
	args: {
		...meta.args,
		raw: '### Title',
		simulateStream: false,
	},
	render: (args) => {
		return <MarkdownStreamBufferDemo {...args} />;
	},
	play: async ({ canvasElement }) => {
		await expect(getHealthyOutputText(canvasElement).trimEnd()).toBe(
			'### Title',
		);
	},
};

export const TrailingLinkWaits: StoryObj<typeof MarkdownStreamBufferDemo> = {
	tags: ['tests'],
	args: {
		...meta.args,
		raw: '[link]',
		simulateStream: false,
	},
	render: (args) => {
		return <MarkdownStreamBufferDemo {...args} />;
	},
	play: async ({ canvasElement }) => {
		await expect(getHealthyOutputText(canvasElement).trimEnd()).toBe('');
	},
};

export const LinkDestinationPlaceholder: StoryObj<
	typeof MarkdownStreamBufferDemo
> = {
	tags: ['tests'],
	args: {
		...meta.args,
		raw: '[link](w',
		simulateStream: false,
	},
	render: (args) => {
		return <MarkdownStreamBufferDemo {...args} />;
	},
	play: async ({ canvasElement }) => {
		await expect(getHealthyOutputText(canvasElement).trimEnd()).toBe(
			'[link]()',
		);
	},
};

export const ImageWaitsUntilComplete: StoryObj<
	typeof MarkdownStreamBufferDemo
> = {
	tags: ['tests'],
	args: {
		...meta.args,
		raw: '![image](w',
		simulateStream: false,
	},
	render: (args) => {
		return <MarkdownStreamBufferDemo {...args} />;
	},
	play: async ({ canvasElement }) => {
		await expect(getHealthyOutputText(canvasElement).trimEnd()).toBe('');
	},
};

export const HtmlStripMode: StoryObj<typeof MarkdownStreamBufferDemo> = {
	tags: ['tests'],
	args: {
		...meta.args,
		raw: 'Hello <strong>world</strong>',
		htmlHandling: 'strip',
		simulateStream: false,
	},
	render: (args) => {
		return <MarkdownStreamBufferDemo {...args} />;
	},
	play: async ({ canvasElement }) => {
		await expect(getHealthyOutputText(canvasElement).trimEnd()).toBe(
			'Hello world',
		);
	},
};

export const StablePrefixAndActiveTail: StoryObj<
	typeof MarkdownStreamBufferDemo
> = {
	tags: ['tests'],
	args: {
		...meta.args,
		raw: 'First safe line\nThis is **par',
		simulateStream: false,
	},
	render: (args) => {
		return <MarkdownStreamBufferDemo {...args} />;
	},
	play: async ({ canvasElement }) => {
		await expect(getHealthyOutputText(canvasElement).trimEnd()).toBe(
			'First safe line\nThis is **par**',
		);
	},
};
