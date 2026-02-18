import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { IconButton } from '../IconButton';
import { ToolTip } from '../sharedTypes';
import * as Styled from './_Styles.js';
import { BarButton } from './_Types';

export interface UIButtonBarProps {
  options?: BarButton[];
  label?: string;
  current?: number;
  onChange?: (option: BarButton) => void;
  onToolTip?: (tip: ToolTip | null) => void;
}

export function UIButtonBar(props: UIButtonBarProps) {
  const {
    options = [],
    current = 0,
    label,
    onChange = () => null,
    onToolTip = () => null,
  } = props;
  const theme = useTheme();
  const [hovered, setHovered] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState<number>(current);
  useEffect(() => setCurrentPage(current), [current]);

  function handleMouseEnter(index: number) {
    setHovered(index);
  }

  function handleMouseLeave() {
    setHovered(-1);
  }

  function handleClick(button: BarButton, index: number) {
    setCurrentPage(index);
    onChange(button);
  }
  return (
    <Styled.ButtonBar>
      {label && <div className="label">{label}</div>}
      {options?.map((button: BarButton, index: number) => {
        return (
          <Styled.Button
            key={`button-bar-${button.icon}-${index}`}
            $last={index === options.length - 1}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <div
              className={`button${currentPage === index ? ' selected' : ''}`}
              onClick={() => handleClick(button, index)}
              onKeyDown={() => handleClick(button, index)}
              role={'button'}
              tabIndex={0}
            >
              <IconButton
                icon={button.icon}
                color={
                  currentPage === index
                    ? theme.lyraColors['core-icon-primary']
                    : hovered === index
                      ? theme.lyraColors['core-button-primary']
                      : theme.lyraColors['core-text-disabled']
                }
                label={button.label}
                tooltip={button.tip}
                onToolTip={(tip) => onToolTip(tip)}
                hover
                toggle={false}
              />
            </div>
            <div className="divider" />
          </Styled.Button>
        );
      })}
    </Styled.ButtonBar>
  );
}
