import { useTheme } from "styled-components";
import { IconButton } from "../../IconButton/IconButton";
import { Icon } from "../../Icon/Icon";
import type { ToolTip } from "../../sharedTypes";
import * as Styled from "./_Styles";

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

export function ExcerptList(props: ExcerptListProps) {
	const {
		excerpts = [],
		onChange = () => null,
		onToolTip = () => null,
	} = props;
	const theme = useTheme();

	function handleRemoveFile(content: string | undefined) {
		const updatedList = excerpts.filter((excerpt: DocExcerpt) => {
			return content !== excerpt.content;
		});
		onChange(updatedList);
	}

	return (
		<Styled.ExcerptList onClick={(e) => e.stopPropagation()}>
			{excerpts.map((excerpt: DocExcerpt, index: number) => {
				return (
					<Styled.ExcerptButton key={`${excerpt.content}-${index}`}>
						<div className="content">
							<div className="type">
								<Icon
									name="recent chats"
									size={16}
									strokeColor={theme.lyraColors["core-text-disabled"]}
								/>
								{excerpt.docTitle ? excerpt.docTitle : "Document excerpt"}
							</div>
							<div className="label">{excerpt.content}</div>
						</div>
						<div className="icon">
							<IconButton
								icon={"x"}
								hover={false}
								toggle={false}
								frameSize={20}
								iconSize={20}
								onClick={(e) => {
									e.stopPropagation();
									handleRemoveFile(excerpt.content);
								}}
								tooltip={"remove excerpt"}
								onToolTip={(tip) => onToolTip(tip)}
							/>
						</div>
					</Styled.ExcerptButton>
				);
			})}
		</Styled.ExcerptList>
	);
}
