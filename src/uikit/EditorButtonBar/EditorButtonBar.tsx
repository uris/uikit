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
  state?: 'default' | 'short' | 'auto';
  activeFormats?: string[];
  activeStyle?: 'h1' | 'h2' | 'h3' | 'p';
  onCommand?: (command: any, e: React.MouseEvent<any> | undefined) => void;
  onToolTip?: (tip: ToolTip | null) => void;
}

export function EditorButtonBar(props: EditorButtonBarProps) {
  const {
    onCommand = () => null,
    onToolTip = () => null,
    shortSize = 560,
    state = 'auto',
    activeStyle = 'p',
    activeFormats,
  } = props;
  const [barState, setBarState] = useState<'default' | 'short'>('default');
  const ref = useRef<HTMLDivElement>(null);
  const size = useObserveResize(ref);
  useEffect(() => {
    if (state !== 'auto') setBarState(state);
    else setBarState(size.width < shortSize ? 'short' : 'default');
  }, [size, shortSize, state]);

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
            hover={true}
            toggle={false}
            onToolTip={(tip) => onToolTip(tip)}
            onClick={(e) => onCommand(coreButtons.copy.command, e)}
          />
          <IconButton
            icon={coreButtons.download.icon}
            tooltip={coreButtons.download.toolTip}
            hover={true}
            toggle={false}
            onToolTip={(tip) => onToolTip(tip)}
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
  state?: 'default' | 'short';
}

export function RenderGroup(props: RenderGroupProps) {
  const {
    onCommand = () => null,
    onToolTip = () => null,
    buttonGroup,
    activeFormats,
    state = 'default',
  } = props;
  const theme = useTheme();
  return (
    <Styled.ButtonGroup>
      {state === 'default' && <div className="divider" />}
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
            hover={true}
            toggle={false}
            bgColor={bgColor}
            onClick={(e) => onCommand(button?.command, e)}
            frameSize={30}
            iconSize={20}
          />
        );
      })}
    </Styled.ButtonGroup>
  );
}
