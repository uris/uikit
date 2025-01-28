import React from 'react';
import {
  Badge,
  Icon,
  Switch,
  CheckBox,
  DropDown,
  DropDownOption,
  Dot,
  UIImage,
  UIImageNames,
} from '../src/index';
import { useApp } from './UseApp';
import * as S from './Styles';
import { LocalThemeProvider } from './context/themeContext';

const App = () => {
  const { iconNames } = useApp();
  return (
    <LocalThemeProvider>
      <S.Component $columns>
        <S.Name>{`<Badge /> variant | count`}</S.Name>
        <S.Wrap>
          <Badge variant={'dark'} count={5} />
          <Badge variant={'light'} count={150} />
        </S.Wrap>
      </S.Component>
      <S.Component $columns>
        <S.Name>{`<Switch /> onChange()`}</S.Name>
        <Switch />
      </S.Component>
      <S.Component $columns>
        <S.Name>{`<Icon /> size | color | accentColor`}</S.Name>
        <S.Wrap>
          {iconNames().map((icon: DropDownOption, index: number) => {
            return (
              <div key={icon.label + '_' + index} title={icon.value}>
                <Icon name={icon.label} />
              </div>
            );
          })}
        </S.Wrap>
      </S.Component>
      <S.Component $columns>
        <S.Name>{`<DropDown />`}</S.Name>
        <S.Wrap>
          <DropDown
            width={'auto'}
            placeholder={false}
            options={[
              { label: 'Option One', value: '' },
              { label: 'Option Two', value: '' },
              { label: 'Option Three', value: '' },
            ]}
          />
          <DropDown
            unframed
            gap={8}
            width={'auto'}
            placeholder
            options={[
              { label: 'Select option', value: '' },
              { label: 'Option One', value: '' },
              { label: 'Option Two', value: '' },
            ]}
          />
        </S.Wrap>
      </S.Component>
      <S.Component $columns>
        <S.Name>{`<Checkbox />`}</S.Name>
        <S.Wrap>
          <CheckBox />
          <CheckBox checked />
          <CheckBox checked={'partial'} />
          <CheckBox label={'Checkbox label'} />
        </S.Wrap>
      </S.Component>
      <S.Component $columns>
        <S.Name>{`<Dot />`}</S.Name>
        <S.Wrap>
          <Dot show={true} state={'blue'} size={8} position={'inline'} />
          <Dot show={true} state={'green'} size={8} position={'inline'} />
          <Dot show={true} state={'yellow'} size={8} position={'inline'} />
          <Dot show={true} state={'red'} size={8} position={'inline'} />
          <Dot show={true} state={'grey'} size={8} position={'inline'} />
        </S.Wrap>
      </S.Component>
      <S.Component $columns>
        <S.Name>{`<UIImage />`}</S.Name>
        <S.Wrap>
          <UIImage name={UIImageNames.profileMan1} height={44} />
          <UIImage name={UIImageNames.gpcolorlogo} height={44} dpr={'auto'} />
        </S.Wrap>
      </S.Component>
    </LocalThemeProvider>
  );
};

export default App;
