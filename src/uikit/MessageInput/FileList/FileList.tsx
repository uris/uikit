import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { IconButton } from '../../IconButton/IconButton';
import { UIIcon } from '../../UIIcon/UIIcon';
import { ToolTip } from '../../sharedTypes';
import * as Styled from './_Styles';

interface FileListProps {
  files?: File[];
  onChange?: (files: File[]) => void;
  onToolTip?: (tip: ToolTip | null) => void;
}

export function FileList(props: FileListProps) {
  const { files = [], onChange = () => null, onToolTip = () => null } = props;
  const theme = useTheme();
  const [fileList, setFileList] = useState<File[]>(files);
  useEffect(() => setFileList(files), [files]);

  function handleRemoveFile(fileName: string) {
    const updatedList = fileList.filter((file: File) => {
      return file.name !== fileName;
    });
    onChange(updatedList);
    setFileList(updatedList);
  }

  return (
    <Styled.FileList>
      {fileList.map((file: File, index: number) => {
        return (
          <Styled.FileButton key={file.name + '-' + index}>
            <div className="content">
              <div className="type">
                <UIIcon
                  name="text document"
                  size={16}
                  strokeColor={theme.lyraColors['core-text-disabled']}
                />
                {file.type}
              </div>
              <div className="label">{file.name}</div>
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
                  handleRemoveFile(file.name);
                }}
                tooltip={'remove file'}
                onToolTip={(tip) => onToolTip(tip)}
              />
            </div>
          </Styled.FileButton>
        );
      })}
    </Styled.FileList>
  );
}
