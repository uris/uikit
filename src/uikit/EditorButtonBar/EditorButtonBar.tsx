import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../hooks';
import { useObserveResize } from '../../hooks/useObserveResize';
import { DropDown, type DropDownOption } from '../DropDown';
import { IconButton } from '../IconButton';
import type { ToolTip } from '../sharedTypes';
import css from './EditorButtonBar.module.css';
import { coreButtons, editControls } from './_Data';
import type { ButtonBarButton, ButtonBarGroup } from './_Types';

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

export const EditorButtonBar = React.memo((props: EditorButtonBarProps) => {
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
		<div className={css.wrapper} ref={ref}>
			<div className={css.left}>
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
								key={`button-group-${group.name}${index}`}
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
				<div className={css.right}>
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
		</div>
	);
});

interface RenderGroupProps {
	onCommand?: (command: any, e: React.MouseEvent<any>) => void;
	onToolTip?: (tip: ToolTip | null) => void;
	buttonGroup: ButtonBarGroup;
	activeFormats?: string[];
	disabledFormats?: string[];
	state?: 'regular' | 'small' | 'medium';
}

export const RenderGroup = React.memo((props: RenderGroupProps) => {
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
		<div className={css.buttonGroup}>
			{state !== 'small' && <div className="divider" />}
			{buttonGroup?.buttons?.map((button: ButtonBarButton, index: number) => {
				const active = button?.id ? activeFormats?.includes(button.id) : false;
				const bgColor = active
					? theme.colors['core-surface-secondary']
					: 'transparent';
				return (
					<IconButton
						key={`button-${button?.icon}-${index}`}
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
		</div>
	);
});
