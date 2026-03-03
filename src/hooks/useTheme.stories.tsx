import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlexDiv } from '../uikit/FlexDiv';
import { Spacer } from '../uikit/Spacer';
import { UIButton } from '../uikit/UIButton';
import { useTheme } from './useTheme';

function UseThemeDemo() {
	const theme = useTheme();
	console.log('Theme colors:', theme.current);

	return (
		<FlexDiv
			absolute
			width={'fill'}
			height={'fill'}
			alignItems={'center'}
			justify={'center'}
			direction={'column'}
		>
			<h3>
				{theme.current.name.includes('light') ? 'Light theme' : 'Dark Theme'}{' '}
				Selected
			</h3>
			<span>IsDark? {theme.isDark ? 'True' : 'False'}</span>
			<Spacer size={24} />
			<FlexDiv
				width={'fill'}
				height={'auto'}
				direction={'column'}
				alignItems={'center'}
				justify={'center'}
				gap={12}
			>
				<UIButton
					label={'Set Light'}
					onClick={() => theme.set(theme.lightTheme)}
				/>
				<UIButton
					label={'Set Dark'}
					onClick={() => theme.set(theme.darkTheme)}
				/>
				<UIButton label={'Set System'} onClick={() => theme.set('system')} />
				<UIButton label={'Toggle'} onClick={() => theme.toggle()} />
			</FlexDiv>
			<Spacer size={24} />
			<strong style={{ color: theme.colors['core-link-primary'] }}>
				{`Var: '${theme.colors['core-link-primary']}'`}
			</strong>
			<strong style={{ color: theme.colors['core-link-primary'] }}>
				{`Class: '${theme.colorsClass['core-link-primary']}'`}
			</strong>{' '}
			<strong style={{ color: theme.colors['core-link-primary'] }}>
				{`Value: '${theme.current.colors['core-link-primary']}'`}
			</strong>
		</FlexDiv>
	);
}

const meta: Meta<typeof UseThemeDemo> = {
	title: 'Hooks/useTheme',
	component: UseThemeDemo,
	parameters: {
		layout: 'padded',
	},
};

export default meta;

export const Default: StoryObj<typeof UseThemeDemo> = {};
