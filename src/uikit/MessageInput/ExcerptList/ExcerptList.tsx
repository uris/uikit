import { memo, useCallback, useMemo } from 'react';
import { useTheme } from '../../../hooks';
import { Icon } from '../../Icon';
import { IconButton } from '../../IconButton';
import type { ToolTip } from '../../sharedTypes';
import css from './ExcerptList.module.css';

export type DocExcerpt = {
	content?: string;
	docTitle?: string;
	range?: { to: number; from: number } | null;
	docID?: string;
};

interface ExcerptListProps {
	excerpts?: DocExcerpt[];
	onChange?: (excerpts: DocExcerpt[]) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}

export const ExcerptList = memo(function ExcerptList(
	props: Readonly<ExcerptListProps>,
) {
	const {
		excerpts = [],
		onChange = () => null,
		onToolTip = () => null,
	} = props;
	const theme = useTheme();

	// memo remove file
	const handleRemoveFile = useCallback(
		(content: string | undefined) => {
			const updatedList = excerpts.filter((excerpt: DocExcerpt) => {
				return content !== excerpt.content;
			});
			onChange(updatedList);
		},
		[excerpts, onChange],
	);

	const excerptItems = useMemo(() => {
		return excerpts.map((excerpt: DocExcerpt, index: number) => {
			return (
				<div className={css.excerptButton} key={`${excerpt.content}-${index}`}>
					<div className={css.content}>
						<div className={css.type}>
							<Icon
								name="recent chats"
								size={16}
								strokeColor={theme.colors['core-text-disabled']}
							/>
							{excerpt.docTitle ? excerpt.docTitle : 'Document excerpt'}
						</div>
						<div className={css.label}>{excerpt.content}</div>
					</div>
					<div className={css.icon}>
						<IconButton
							icon={'x'}
							hover={false}
							toggle={false}
							frameSize={20}
							iconSize={20}
							onClick={(e) => {
								e.stopPropagation();
								handleRemoveFile(excerpt.content);
							}}
							tooltip={'remove excerpt'}
							onToolTip={(tip) => onToolTip(tip)}
						/>
					</div>
				</div>
			);
		});
	}, [excerpts, theme.colors, onToolTip, handleRemoveFile]);

	return (
		<div
			className={css.excerptList}
			onKeyDown={(e) => e.stopPropagation()}
			onClick={(e) => e.stopPropagation()}
		>
			{excerptItems}
		</div>
	);
});
