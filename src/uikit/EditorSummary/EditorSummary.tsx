import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '../../hooks';
import { IconButton } from '../IconButton';
import css from './EditorSummary.module.css';
import type { EditorSummaryProps, SuggestMark } from './_types';

export const EditorSummary = React.memo(function EditorSummary(
	props: Readonly<EditorSummaryProps>,
) {
	const {
		edits = [],
		current = -1,
		label = 'Suggested Edits',
		//onAcceptAll = () => null,
		onRejectAll = () => null,
		onAccept = () => null,
		onReject = () => null,
		onChange = () => null,
		onToolTip = () => null,
	} = props;
	const [index, setIndex] = useState<number>(current);
	const theme = useTheme();
	const [pendingEdits, setPendingEdits] = useState<SuggestMark[]>(edits);
	const [isResolved, setIsResolved] = useState<boolean>(false);

	// Use ref to avoid infinite loop with onChange
	const onChangeRef = useRef(onChange);
	useEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);

	useEffect(() => {
		setIndex(current);
		setIsResolved(current === -1);
	}, [current]);

	useEffect(() => {
		setPendingEdits(edits);
	}, [edits]);

	useEffect(() => {
		setIsResolved(index === -1);
		if (index >= 0 && index < pendingEdits.length) {
			onChangeRef.current(index, pendingEdits[index]);
		}
	}, [index, pendingEdits]);

	const doUpdates = useCallback((newIndex: number) => {
		setIsResolved(newIndex === -1);
		setIndex(newIndex);
	}, []);

	const back = useCallback(() => {
		let newIndex = index - 1;
		if (newIndex < -1) newIndex = pendingEdits.length - 1;
		doUpdates(newIndex);
	}, [index, pendingEdits.length, doUpdates]);

	const forward = useCallback(() => {
		let newIndex = index + 1;
		if (newIndex > pendingEdits.length - 1) newIndex = 0;
		doUpdates(newIndex);
	}, [index, pendingEdits.length, doUpdates]);

	const handleRejectAll = useCallback(() => {
		onRejectAll();
	}, [onRejectAll]);

	const handleAccept = useCallback(() => {
		onAccept(pendingEdits[index]);
	}, [onAccept, pendingEdits, index]);

	const handleReject = useCallback(() => {
		onReject(pendingEdits[index]);
	}, [onReject, pendingEdits, index]);

	return (
		<div className={css.summaryBar}>
			<div className={css.paging}>
				<IconButton
					icon={'chevron left'}
					borderRadius={100}
					onClick={back}
					tooltip="Previous"
					onToolTip={onToolTip}
					hover
					toggle={false}
					frameSize={24}
					color={theme.colors['core-icon-tertiary']}
					disabled={index <= -1}
				/>
				<div className="current">
					{label} -{' '}
					<span className={isResolved ? 'resolved' : ''}>{index + 1}</span> of{' '}
					{pendingEdits.length}
				</div>
				<IconButton
					icon={'chevron right'}
					borderRadius={100}
					onClick={forward}
					tooltip="Next"
					onToolTip={onToolTip}
					hover
					toggle={false}
					frameSize={24}
					color={theme.colors['core-icon-tertiary']}
					disabled={index >= pendingEdits.length - 1}
				/>
			</div>
			<div className={css.actions}>
				<IconButton
					borderRadius={100}
					icon={'check'}
					onClick={handleAccept}
					tooltip="Accept Suggestion"
					onToolTip={onToolTip}
					hover
					frameSize={24}
					bgColor={theme.colors['core-surface-secondary']}
					color={theme.colors['feedback-positive']}
					disabled={isResolved}
				/>
				<IconButton
					icon={'x'}
					borderRadius={100}
					onClick={handleReject}
					tooltip="Reject Suggestion"
					onToolTip={onToolTip}
					hover
					iconSize={18}
					frameSize={24}
					bgColor={theme.colors['core-surface-secondary']}
					color={theme.colors['feedback-warning']}
					disabled={isResolved}
				/>
				<div className={css.divider} />
				<IconButton
					icon={'restore'}
					borderRadius={100}
					onClick={handleRejectAll}
					tooltip="Restore"
					onToolTip={onToolTip}
					hover
					iconSize={18}
					frameSize={26}
					bgColor={theme.colors['core-surface-secondary']}
					color={theme.colors['feedback-warning']}
					disabled={index === -1}
				/>
			</div>
		</div>
	);
});
