import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
        '@storybook/addon-onboarding',
        '@chromatic-com/storybook',
        '@storybook/addon-docs',
        '@storybook/addon-a11y',
        '@storybook/addon-vitest'
    ],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	staticDirs: [{ from: '../public', to: '/public' }],
	viteFinal: (config) => {
		// Remove @fs prefix for image paths
		config.server = config.server || {};
		config.server.fs = {
			strict: false,
			allow: ['/'],
		};

		return config;
	},
};
export default config;
