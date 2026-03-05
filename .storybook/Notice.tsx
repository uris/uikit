import { Unstyled } from '@storybook/addon-docs/blocks';
import React from 'react';
import { FlexDiv } from '../src';

const NoteSection = React.memo((props: { children: React.ReactNode }) => {
	const { children } = props;
	return (
		<FlexDiv
			className={'note-section'}
			width={'fill'}
			height={'fit'}
			padding={24}
			background={'var(--core-surface-secondary)'}
			border={'1px solid var(--core-outline-primary)'}
			borderRadius={8}
		>
			{children}
		</FlexDiv>
	);
});

NoteSection.displayName = 'NoteSection';

export default NoteSection;
