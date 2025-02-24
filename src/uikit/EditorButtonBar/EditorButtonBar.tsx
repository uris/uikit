import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { IconButton } from '../IconButton';
import { DropDown, DropDownOption } from '../DropDown';
import { ToolTip } from '../sharedTypes';
import { useObserveResize } from '../../hooks/useObserveResize';
import { coreButtons, editControls } from './_Data';
import * as Styled from './_Styles';
import { ButtonBarButton, ButtonBarGroup } from './_Types';

export interface EditorButtonBarProps {
  shortSize?: number;
  mediumSize?: number;
  state?: 'small' | 'medium' | 'regular' | 'auto';
  activeFormats?: string[];
  activeStyle?: 'h1' | 'h2' | 'h3' | 'p';
  disabledFormats?: string[];
  onCommand?: (command: any, e: React.MouseEvent<any> | undefined) => void;
  onToolTip?: (tip: ToolTip | null) => void;
}

export function EditorButtonBar(props: EditorButtonBarProps) {
  const {
    onCommand = () => null,
    onToolTip = () => null,
    shortSize = 500,
    mediumSize = 664,
    state = 'auto',
    activeStyle = 'p',
    disabledFormats = [],
    activeFormats,
  } = props;
  const [barState, setBarState] = useState<'small' | 'medium' | 'regular'>(
    'regular',
  );
  const ref = useRef<HTMLDivElement>(null);
  const size = useObserveResize(ref);
  useEffect(() => {
    if (state !== 'auto') setBarState(state);
    else if (size.width < shortSize) setBarState('small');
    else if (size.width < mediumSize) setBarState('medium');
    else setBarState('regular');
  }, [size, shortSize, mediumSize, state]);

  function handleStyleChange(option: DropDownOption) {
    switch (option.value) {
      case 'h1':
        onCommand('h1', undefined);
        break;
      case 'h2':
        onCommand('h2', undefined);
        break;
      case 'h3':
        onCommand('h3', undefined);
        break;
      case 'p':
        onCommand('p', undefined);
        break;
    }
  }

  return (
    <Styled.Wrapper ref={ref}>
      <div className="left">
        {editControls?.[barState].styles && (
          <DropDown
            options={editControls?.[barState].styles}
            placeholder={false}
            unframed
            width={'100px'}
            selectedValue={activeStyle}
            onChange={(_index, option) => handleStyleChange(option)}
          />
        )}
        {editControls?.[barState].buttons?.map(
          (group: ButtonBarGroup, index: number) => {
            return (
              <RenderGroup
                key={'button-group-' + index}
                onCommand={(command, e) => onCommand(command, e)}
                onToolTip={(tip) => onToolTip(tip)}
                buttonGroup={group}
                activeFormats={activeFormats}
                disabledFormats={disabledFormats}
                state={barState}
              />
            );
          },
        )}
      </div>
      {editControls?.[barState].download && (
        <div className="right">
          <IconButton
            icon={coreButtons.copy.icon}
            tooltip={coreButtons.copy.toolTip}
            hover={disabledFormats.includes('download')}
            toggle={false}
            onToolTip={(tip) => onToolTip(tip)}
            disabled={disabledFormats.includes('copy')}
            onClick={(e) => onCommand(coreButtons.copy.command, e)}
          />
          <IconButton
            icon={coreButtons.download.icon}
            tooltip={coreButtons.download.toolTip}
            hover={!disabledFormats.includes('download')}
            toggle={false}
            onToolTip={(tip) => onToolTip(tip)}
            disabled={disabledFormats.includes('download')}
            onClick={(e) => onCommand(coreButtons.download.command, e)}
          />
        </div>
      )}
    </Styled.Wrapper>
  );
}

interface RenderGroupProps {
  onCommand?: (command: any, e: React.MouseEvent<any>) => void;
  onToolTip?: (tip: ToolTip | null) => void;
  buttonGroup: ButtonBarGroup;
  activeFormats?: string[];
  disabledFormats?: string[];
  state?: 'regular' | 'small' | 'medium';
}

export function RenderGroup(props: RenderGroupProps) {
  const {
    onCommand = () => null,
    onToolTip = () => null,
    buttonGroup,
    activeFormats,
    state = 'default',
    disabledFormats = [],
  } = props;
  const theme = useTheme();
  return (
    <Styled.ButtonGroup>
      {state !== 'small' && <div className="divider" />}
      {buttonGroup?.buttons?.map((button: ButtonBarButton, index: number) => {
        const active = button?.id ? activeFormats?.includes(button.id) : false;
        const bgColor = active
          ? theme.lyraColors['core-surface-secondary']
          : 'transparent';
        return (
          <IconButton
            key={'button-' + button?.icon + '-' + index}
            icon={button?.icon}
            tooltip={button?.toolTip}
            onToolTip={(tip) => onToolTip(tip)}
            hover={!disabledFormats.includes(button.id || 'none')}
            toggle={false}
            bgColor={bgColor}
            onClick={(e) => onCommand(button?.command, e)}
            disabled={disabledFormats.includes(button.id || 'none')}
            frameSize={30}
            iconSize={20}
          />
        );
      })}
    </Styled.ButtonGroup>
  );
}
