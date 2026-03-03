import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTheme } from './useTheme';

function UseThemeDemo() {
	const theme = useTheme();

	return (
		<div style={{ padding: 24 }}>
			<h3>Current theme: {theme.current.name}</h3>
			<p>isDark: {String(theme.isDark)}</p>
			<div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
				<button type="button" onClick={() => theme.set(theme.lightTheme)}>
					Set Light
				</button>
				<button type="button" onClick={() => theme.set(theme.darkTheme)}>
					Set Dark
				</button>
				<button type="button" onClick={() => theme.set('system')}>
					Set System
				</button>
				<button type="button" onClick={() => theme.toggleTheme()}>
					Toggle
				</button>
			</div>
			<p style={{ color: theme.colors['core-link-primary'] }}>
				Sample token text color: core-link-primary
			</p>
		</div>
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
