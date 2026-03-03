import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from '../uikit/FlexDiv';
import { Spacer } from '../uikit/Spacer';
import { UIButton } from '../uikit/UIButton';
import { useTheme } from '../hooks/useTheme';
import { ThemeProvider } from './ThemeProvider';

type ThemeProviderDemoProps = {
	theme?: string;
	system?: boolean;
};

function ThemeProviderChildDemo() {
	const theme = useTheme();

	return (
		<FlexDiv
			width={'fill'}
			height={'auto'}
			alignItems={'center'}
			justify={'center'}
			direction={'column'}
			absolute
			gap={10}
			padding={24}
		>
			<h3>
				{theme.current.name.includes('light') ? 'Light theme' : 'Dark theme'}{' '}
				selected
			</h3>
			<span>Current: {theme.current.name}</span>
			<span>isDark: {theme.isDark ? 'true' : 'false'}</span>
			<Spacer size={8} />
			<FlexDiv direction={'row'} gap={8} width={'auto'} height={'auto'}>
				<UIButton label={'Set Light'} onClick={() => theme.set('lightMode')} />
				<UIButton label={'Set Dark'} onClick={() => theme.set('darkMode')} />
				<UIButton label={'Toggle'} onClick={() => theme.toggle()} />
			</FlexDiv>
		</FlexDiv>
	);
}

function ThemeProviderDemo(props: Readonly<ThemeProviderDemoProps>) {
	const { theme, system } = props;

	return (
		<ThemeProvider theme={theme} system={system}>
			<ThemeProviderChildDemo />
		</ThemeProvider>
	);
}

const meta: Meta<typeof ThemeProviderDemo> = {
	title: 'Providers/ThemeProvider',
	component: ThemeProviderDemo,
	parameters: {
		layout: 'padded',
	},
	args: {
		theme: 'lightMode',
		system: false,
	},
	argTypes: {
		theme: {
			control: { type: 'radio' },
			options: [undefined, 'lightMode', 'darkMode'],
		},
		system: {
			control: { type: 'boolean' },
		},
	},
};

export default meta;

export const Demo: StoryObj<typeof ThemeProviderDemo> = {};
