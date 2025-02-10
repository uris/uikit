import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useGiaThemes } from '../src/theme/useGiaThemes';
import './fonts.css';

const preview: Preview = {
  decorators: [
    (Story) => {
      const themes = useGiaThemes();
      return (
        <ThemeProvider theme={themes.light}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
