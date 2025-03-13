import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { UIIcon } from '../UIIcon/UIIcon';
import * as Styled from './_Styles';

export interface CheckBoxProps {
  size?: number;
  checked?: 'partial' | boolean;
  disabled?: boolean;
  color?: string;
  label?: string;
  onChange?: (state: boolean) => void;
}

export function CheckBox(props: CheckBoxProps) {
  const {
    size = 20,
    checked = false,
    disabled = false,
    color = undefined,
    label = undefined,
    onChange = () => null,
  } = props;
  const theme = useTheme();
  const [state, setState] = useState<'partial' | boolean>(checked);
  useEffect(() => setState(checked), [checked]);
  const styles = {
    size,
    disabled,
    checked,
  };

  const setIconName = () => {
    if (state === true) return 'checked';
    if (state === 'partial') return 'partial';
    return 'unchecked';
  };

  const setIconColor = () => {
    if (color) return color;
    if (disabled) return theme.lyraColors['core-icon-disabled'];
    if (state === 'partial') return theme.lyraColors['core-icon-primary'];
    if (state === false) return theme.lyraColors['core-icon-secondary'];
    return theme.lyraColors['core-link-primary'];
  };

  function handleToggle() {
    let newState: boolean = false;
    switch (state) {
      case true:
        newState = false;
        break;
      case false:
        newState = true;
        break;
      case 'partial':
        newState = true;
        break;
    }
    setState(newState);
    onChange(newState);
  }

  return (
    <Styled.CheckBox $props={styles} onClick={() => handleToggle()}>
      <div className="icon">
        <UIIcon name={setIconName()} strokeColor={setIconColor()} />
      </div>
      {label && <span className="label">{label}</span>}
    </Styled.CheckBox>
  );
}
