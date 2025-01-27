import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { useGiaThemes } from '../../src/theme/useGiaThemes';
import { Switch } from '../../src';
import * as Styled from './_styles';

interface Props {
  children?: any;
}
export function LocalThemeProvider(props: Props) {
  const { children } = props;
  const themes = useGiaThemes();
  const [theme, setTheme] = useState<any>(themes.light);
  const [name, setName] = useState<string>('light');
  function handleChangeTheme(state: boolean) {
    setTheme(state ? themes.dark : themes.light);
    setName(state ? 'dark' : 'light');
  }
  return (
    <ThemeProvider theme={theme}>
      <Styled.Page $name={name}>
        <Styled.Title>
          Gia - Lrya UIKit
          <div className="switch">
            <span>Light</span>
            <Switch onChange={(state) => handleChangeTheme(state)} />
            <span>Dark</span>
          </div>
        </Styled.Title>
        <div className="widgets">{children}</div>
      </Styled.Page>
    </ThemeProvider>
  );
}
