import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { UIIcon } from '../UIIcon/UIIcon';
import * as Styled from './_Styles';

export type DropDownOption = {
  label?: string;
  value?: any;
  alt?: string;
};

export interface DropDownProps {
  options?: DropDownOption[];
  selectedIndex?: number;
  selectedValue?: string;
  placeholder?: boolean;
  borderRadius?: number;
  validate?: boolean;
  iconColor?: string;
  bgColor?: string;
  width?: string;
  height?: string;
  fontSize?: number;
  padding?: number | string;
  iconSize?: number;
  disabled?: boolean;
  fontWeight?: number;
  unframed?: boolean;
  textType?: string;
  focused?: boolean;
  gap?: number;
  onChange?: (index: number, option: DropDownOption) => void;
  onBlur?: (value: string) => void;
  onValidate?: (state: boolean) => void;
  onFocus?: () => void;
}

export function DropDown(props: DropDownProps) {
  const theme = useTheme();
  const {
    width = '100%',
    height = 'auto',
    selectedIndex = 0,
    selectedValue = '',
    options = [],
    placeholder = true,
    validate = true,
    borderRadius = 4,
    bgColor = 'transparent',
    iconColor = theme.lyraColors['core-icon-primary'],
    fontSize = null,
    padding = '8px',
    iconSize = 24,
    disabled = false,
    unframed = false,
    focused = false,
    textType = theme.lyraType['body-m-regular'],
    fontWeight = 500,
    gap = 0,
    onChange = () => null,
    onValidate = () => null,
    onFocus = () => null,
    onBlur = () => null,
  } = props;
  console.log({ theme });
  const [index, setIndex] = useState<number>(selectedIndex);
  const [selectedText, setSelectedText] = useState<string>('Select an option');
  const [isFocused, setIsFocused] = useState<boolean>(focused);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [initiated, setInitated] = useState<boolean>(false);
  const [color, setColor] = useState<string>(iconColor);
  const ref = useRef<HTMLSelectElement>(null);
  useEffect(() => setColor(theme.lyraColors['core-icon-primary']), [theme]);

  // validate selection and if there's a placehoder
  // with a validate flag, set error state and event error
  useEffect(() => {
    let valid = true;
    if (validate && placeholder && index === 0) valid = false;
    if (!initiated) valid = true;
    setInvalid(valid);
    onValidate(valid);
  }, [index, validate, placeholder, initiated, onValidate]);

  // set focus
  useEffect(() => {
    if (focused && ref && ref.current) {
      setIsFocused(true);
      setInitated(true);
      ref.current.click();
    }
  }, [focused]);

  // set selected by index
  useEffect(() => {
    if (ref && ref.current) {
      if (!options || !options[selectedIndex]) return;
      const label = options[selectedIndex].label || 'Select an option';
      setIndex(selectedIndex);
      setSelectedText(label);
      ref.current.selectedIndex = selectedIndex;
    }
  }, [selectedIndex, options]);

  // set selected by value
  useEffect(() => {
    if (!options || options.length === 0 || selectedValue === '') return;
    for (let i = 0; options.length - 1; i++) {
      const option = options[i];
      if (
        (option?.value &&
          option.value.toLowerCase() ===
            selectedValue.toString().toLowerCase()) ||
        (option?.label &&
          option.label.toLowerCase() ===
            selectedValue.toString().toLowerCase()) ||
        (option?.alt &&
          option.alt.toLowerCase() === selectedValue.toString().toLowerCase())
      ) {
        const label = options[i].label || 'Select an option';
        setSelectedText(label);
        setIndex(i);
        if (ref.current) ref.current.selectedIndex = i;
        break;
      }
    }
  }, [selectedValue, options]);

  function handleChange(i: number) {
    if (!options) return;
    const label = options[i].label || 'Select an option';
    setIndex(i);
    setSelectedText(label);
    if (index !== i) onChange(i, options[i]);
    onBlur(options[i].label || '');
    setIsFocused(false);
  }

  function handleFocus() {
    setInitated(true);
    setIsFocused(true);
    onFocus();
  }

  function renderOptions() {
    if (!options) return null;
    return options.map((option: DropDownOption, i: number) => {
      return (
        <option
          key={option?.value + '_' + i}
          value={option?.value}
          onMouseUp={() => handleChange(i)}
        >
          {option?.label}
        </option>
      );
    });
  }

  return (
    <Styled.Wrapper
      $focused={isFocused}
      $size={{ width, height }}
      $invalid={invalid}
      $margin={'8px'}
      $placeholder={placeholder && index === 0}
      $bgColor={bgColor}
      $borderRadius={borderRadius}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $padding={padding}
      $unframed={unframed}
      $textType={textType}
      $gap={gap}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <div className={'face'}>{selectedText.replace('-- ', '')}</div>
      <div className={'chevron'}>
        <UIIcon name="chevron down" size={iconSize} strokeColor={color} />
      </div>
      <Styled.Select
        defaultValue={index}
        ref={ref}
        onFocus={() => handleFocus()}
        onMouseDown={(e) => {
          if (disabled) e.preventDefault();
          handleFocus();
        }}
        onChange={(e) => {
          handleChange(e.target.selectedIndex);
        }}
      >
        {renderOptions()}
      </Styled.Select>
    </Styled.Wrapper>
  );
}
