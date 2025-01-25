import { useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { Icon } from "../Icon/Icon";
import * as Styled from "./_Styles";

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
  dark?: boolean;
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
    width = "100%",
    height = "auto",
    selectedIndex = 0,
    selectedValue = "",
    options = [],
    placeholder = true,
    validate = true,
    borderRadius = 0,
    dark = theme.name === "lightMode" ? false : true,
    bgColor = "transparent",
    iconColor = theme.lyraColors["core-icon-primary"],
    fontSize = null,
    padding = 0,
    iconSize = 24,
    disabled = false,
    unframed = false,
    focused = false,
    textType = theme.lyraType["body-l-regular"],
    fontWeight = 500,
    gap = 8,
    onChange = () => null,
    onValidate = () => null,
    onFocus = () => null,
    onBlur = () => null,
  } = props;

  const [index, setIndex] = useState<number>(selectedIndex);
  const [selectedText, setSelectedText] = useState<string>("Select an option");
  const [isFocused, setIsFocused] = useState<boolean>(focused);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [initiated, setInitated] = useState<boolean>(false);
  const ref = useRef<HTMLSelectElement>(null);

  // set focus
  useEffect(() => {
    if (focused && ref && ref.current) {
      handleFocus();
      ref.current.click();
    }
  }, [focused]);

  // set selected by index
  useEffect(() => {
    if (ref && ref.current) {
      if (!options || !options[selectedIndex]) return;
      const label = options[selectedIndex].label || "Select an option";
      setIndex(selectedIndex);
      setSelectedText(label);
      setInvalid(runValidation(selectedIndex));
      ref.current.selectedIndex = selectedIndex;
    }
  }, [selectedIndex, ref]);

  // set selected by value
  useEffect(() => {
    if (!options) return;
    options.forEach((option: DropDownOption, i: number) => {
      if (
        ((option.value &&
          option.value.toString().toLowerCase() ===
            selectedValue.toString().toLowerCase()) ||
          (option.label &&
            option.label.toLowerCase() ===
              selectedValue.toString().toLowerCase()) ||
          (option.alt &&
            option.alt.toLowerCase() ===
              selectedValue.toString().toLowerCase())) &&
        ref &&
        ref.current
      ) {
        const label = options[i].label || "Select an option";
        setSelectedText(label);
        setIndex(i);
        ref.current.selectedIndex = i;
      }
    });
  }, [selectedValue, ref]);

  function runValidation(selected: number) {
    let valid = true;
    if (validate && selected === 0) valid = false;
    if (!initiated) valid = true;
    onValidate(valid);
    return !valid;
  }

  function handleChange(i: number) {
    if (!options) return;
    const label = options[i].label || "Select an option";
    setIndex(i);
    setInvalid(runValidation(index));
    setSelectedText(label);
    if (index !== i) onChange(i, options[i]);
    onBlur(options[i].label || "");
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
          key={option?.value + "_" + i}
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
      $dark={dark}
      $margin={"8px"}
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
      <div className={"face"}>{selectedText.replace("-- ", "")}</div>
      <div className={"chevron"}>
        <Icon name="chevron down" size={iconSize} strokeColor={iconColor} />
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
