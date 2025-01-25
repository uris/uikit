import * as Styled from "./Styles";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { IconButton } from "../Buttons/IconButton/IconButton";

export type RadioButtonOption = {
  fieldName?: string;
  title?: string;
  description?: string;
  state?: boolean;
  icon?: string;
};

export interface RadioButtonProps {
  selected?: boolean;
  option: RadioButtonOption;
  deslect?: boolean;
  tabIndex?: number;
  checkBox?: boolean;
  wrap?: boolean;
  sizeToFit?: boolean;
  hideRadio?: boolean;
  flex?: string | number | null;
  toggleIcon?: boolean;
  iconColor?: string;
  noFrame?: boolean;
  onChange?: (option: RadioButtonOption, state: boolean) => void;
  onMore?: (option: RadioButtonOption, state: boolean) => void;
}

export function RadioButton(props: RadioButtonProps) {
  const theme = useTheme();
  const {
    option,
    selected = false,
    deslect = false,
    tabIndex = 1,
    wrap = false,
    sizeToFit = false,
    hideRadio = false,
    toggleIcon = true,
    noFrame = false,
    flex,
    onChange = () => null,
  } = props;
  const [isSelected, setIsSelected] = useState<boolean>(selected);
  useEffect(() => setIsSelected(selected), [selected]);

  function handleChange(checked?: boolean) {
    if (isSelected && !deslect) return;
    else if (checked !== undefined) setIsSelected(checked);
    else setIsSelected(!isSelected);
    onChange(option, !isSelected);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.code === "Space") {
      e.preventDefault();
      e.stopPropagation();
      handleChange();
    }
  }

  return (
    <Styled.Wrapper
      $wrap={wrap}
      $sizeToFit={sizeToFit}
      $offset={3}
      $selected={isSelected}
      $noImage={!option.icon}
      $hideRadio={hideRadio}
      $flex={flex}
      $noFrame={noFrame}
      onClick={() => handleChange()}
      onKeyDown={(e) => handleKeyDown(e)}
      tabIndex={tabIndex}
      role={"radio"}
      aria-label={option.title}
    >
      {option.icon && (
        <div className="radio-icon">
          <IconButton
            toggle={false}
            icon={toggleIcon && isSelected ? "checked" : "unchecked"}
            color={
              toggleIcon && isSelected
                ? theme.colors.primaryBlue
                : theme.colors.iconPrimary
            }
          />
        </div>
      )}
      <div className="radio-content noselect">
        <div className="radio-title">{option.title}</div>
        {option.description && option.description !== "" && (
          <div className="radio-summary">{option.description}</div>
        )}
      </div>
    </Styled.Wrapper>
  );
}
