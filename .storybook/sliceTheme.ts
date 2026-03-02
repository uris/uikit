import type { ThemeVars } from 'storybook/theming';
import { create } from 'storybook/theming/create';

const sliceTheme: ThemeVars = create({
	base: 'light',
	brandTitle: 'Slice UIKit',
	brandUrl: 'https://example.com',
	brandImage: '/public/images/slice-s.svg',
	brandTarget: '_self',
});

export default sliceTheme;
