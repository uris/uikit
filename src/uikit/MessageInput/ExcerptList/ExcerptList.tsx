import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { UIIcon } from '../../UIIcon/UIIcon';
import { ToolTip } from '../../sharedTypes';
import { IconButton } from '../../IconButton/IconButton';
import * as Styled from './_Styles';

export type Excerpt = {
  content?: string;
  docTitle?: string;
  range?: { to: number; from: number } | null;
  docID?: string;
};

interface ExcerptListProps {
  excerpts?: Excerpt[];
  onChange?: (excerpts: Excerpt[]) => void;
  onToolTip?: (tip: ToolTip | null) => void;
}

export function ExcerptList(props: ExcerptListProps) {
  const {
    excerpts = [],
    onChange = () => null,
    onToolTip = () => null,
  } = props;
  const theme = useTheme();
  const [excerptList, setExcerptList] = useState<Excerpt[]>(excerpts);
  useEffect(() => setExcerptList(excerpts), [excerpts]);

  function handleRemoveFile(content: string | undefined) {
    const updatedList = excerptList.filter((excerpt: Excerpt) => {
      return content !== excerpt.content;
    });
    onChange(updatedList);
    setExcerptList(updatedList);
  }

  return (
    <Styled.ExcerptList onClick={(e) => e.stopPropagation()}>
      {excerptList.map((excerpt: Excerpt, index: number) => {
        return (
          <Styled.ExcerptButton key={excerpt.content + '-' + index}>
            <div className="content">
              <div className="type">
                <UIIcon
                  name="recent chats"
                  size={16}
                  strokeColor={theme.lyraColors['core-text-disabled']}
                />
                {excerpt.docTitle ? excerpt.docTitle : `Document excerpt`}
              </div>
              <div className="label">{excerpt.content}</div>
            </div>
            <div className="icon">
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
          </Styled.ExcerptButton>
        );
      })}
    </Styled.ExcerptList>
  );
}
