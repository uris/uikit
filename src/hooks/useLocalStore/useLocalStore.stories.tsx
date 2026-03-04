import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FlexDiv } from '../../uikit/FlexDiv';
import { TextField } from '../../uikit/Textfield';
import { UIButton } from '../../uikit/UIButton';
import { useLocalStore } from './useLocalStore';

type UseLocalStoreDemoProps = {
	storageKey: string;
};

function UseLocalStoreDemo(props: Readonly<UseLocalStoreDemoProps>) {
	const { storageKey } = props;
	const [name, setName] = useLocalStore<string>(storageKey, 'Jane Doe');
	const [draft, setDraft] = useState(name);

	return (
		<FlexDiv
			absolute
			width={'fill'}
			height={'fill'}
			alignItems={'center'}
			justify={'center'}
			padding={24}
		>
			<FlexDiv
				width={420}
				height={'auto'}
				direction={'column'}
				gap={12}
				padding={16}
				border={'1px solid var(--core-outline-primary)'}
				background={'none'}
				alignItems={'center'}
			>
				<strong>Key: {storageKey}</strong>
				<span>Persisted value: {name}</span>
				<TextField
					label={'Display Name:'}
					name={'displayName'}
					value={draft}
					onChange={(v) => setDraft(v)}
				/>
				<FlexDiv
					width={'auto'}
					height={'auto'}
					gap={8}
					background={'none'}
					direction={'row'}
				>
					<UIButton
						label={'Save'}
						variant={'outline'}
						onClick={() => setName(draft)}
					/>
					<UIButton
						label={'Reset'}
						variant={'outline'}
						onClick={() => setName('Jane Doe')}
					/>
				</FlexDiv>
			</FlexDiv>
		</FlexDiv>
	);
}

const meta: Meta<typeof UseLocalStoreDemo> = {
	title: 'Hooks/useLocalStore',
	component: UseLocalStoreDemo,
	parameters: {
		layout: 'padded',
	},
	args: {
		storageKey: 'slice-demo-profile-name',
	},
	argTypes: {
		storageKey: { control: 'text' },
	},
};

export default meta;

export const Demo: StoryObj<typeof UseLocalStoreDemo> = {};
