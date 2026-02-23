import { useEffect, useState } from 'react';
import { useTheme } from '../../hooks';
import { IconButton } from '../IconButton';
import type { ToolTip } from '../sharedTypes';
import css from './EditorSummary.module.css';
import type { SuggestMark } from './_Types';

export interface EditorSummaryProps {
	edits?: SuggestMark[];
	current?: number;
	label?: string;
	onAcceptAll?: () => void;
	onRejectAll?: () => void;
	onAccept?: (edit: SuggestMark) => void;
	onReject?: (edit: SuggestMark) => void;
	onChange?: (index: number, edit: SuggestMark) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}

export function EditorSummary(props: Readonly<EditorSummaryProps>) {
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

	useEffect(() => {
		setIndex(current);
		setIsResolved(current === -1);
	}, [current]);

	useEffect(() => {
		setPendingEdits(edits);
		setIsResolved(index === -1);
		onChange(index, pendingEdits[index]);
	}, [edits, index, onChange, pendingEdits]);

	function back() {
		let newIndex = index - 1;
		if (newIndex < -1) newIndex = pendingEdits.length - 1;
		doUpdates(newIndex);
	}

	function forward() {
		let newIndex = index + 1;
		if (newIndex > pendingEdits.length - 1) newIndex = 0;
		doUpdates(newIndex);
	}

	function doUpdates(newIndex: number) {
		setIsResolved(newIndex === -1);
		setIndex(newIndex);
		onChange(newIndex, pendingEdits[newIndex]);
	}

	function handleRejectAll() {
		onRejectAll();
	}

	function handleAccept() {
		onAccept(pendingEdits[index]);
	}

	function handleReject() {
		onReject(pendingEdits[index]);
	}

	return (
		<div className={css.summaryBar}>
			<div className={css.paging}>
				<IconButton
					icon={'chevron left'}
					borderRadius={100}
					onClick={() => back()}
					tooltip="Previous"
					onToolTip={(tip) => onToolTip(tip)}
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
					onClick={() => forward()}
					tooltip="Next"
					onToolTip={(tip) => onToolTip(tip)}
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
					onClick={() => handleAccept()}
					tooltip="Accept Suggestion"
					onToolTip={(tip) => onToolTip(tip)}
					hover
					frameSize={24}
					bgColor={theme.colors['core-surface-secondary']}
					color={theme.colors['feedback-positive']}
					disabled={isResolved}
				/>
				<IconButton
					icon={'x'}
					borderRadius={100}
					onClick={() => handleReject()}
					tooltip="Reject Suggestion"
					onToolTip={(tip) => onToolTip(tip)}
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
					onClick={() => handleRejectAll()}
					tooltip="Restore"
					onToolTip={(tip) => onToolTip(tip)}
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
}
