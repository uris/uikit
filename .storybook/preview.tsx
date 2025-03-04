import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../src/theme/useGiaThemes';
import './fonts.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        // The icon for the toolbar item
        icon: 'circlehollow',
        // Array of options
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light theme' },
          { value: 'dark', icon: 'circle', title: 'Dark theme' },
        ],
        // Property that specifies if the name of the item will be displayed
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const selectedTheme = context.globals.theme;
      const theme = selectedTheme === 'light' ? lightTheme : darkTheme;
      return (
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
