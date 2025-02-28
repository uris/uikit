import { IconButton } from '../../IconButton/IconButton';
import { UIFileIcon, UIFileIcons } from '../../UIFileIcon/UIFileIcon';
import { ToolTip } from '../../sharedTypes';
import * as Styled from './_Styles';

interface FileListProps {
  files?: File[];
  onChange?: (files: File[]) => void;
  onToolTip?: (tip: ToolTip | null) => void;
}

export function FileList(props: FileListProps) {
  const { files = [], onChange = () => null, onToolTip = () => null } = props;
  function handleRemoveFile(fileName: string) {
    const updatedList = files.filter((file: File) => {
      return file.name !== fileName;
    });
    onChange(updatedList);
  }

  const fileType = (file: File) => {
    switch (file.type) {
      case 'text/plain':
        return 'Text file';
      case 'text/html':
        return 'Web HTML file';
      case 'text/csv':
        return 'CSV spread shseet';
      case 'application/pdf':
        return 'PDF document';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/docx':
        return 'Word document';
      default:
        return 'Unknown file type';
    }
  };

  const fileIcon = (file: File) => {
    switch (file.type) {
      case 'text/plain':
      case 'text/html':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return UIFileIcons.Document;
      case 'text/csv':
        return UIFileIcons.Spreadhseet;
      case 'application/pdf':
        return UIFileIcons.Pdf;
      default:
        return UIFileIcons.Document;
    }
  };

  return (
    <Styled.FileList>
      {files.map((file: File, index: number) => {
        return (
          <Styled.FileButton key={file.name + '-' + index}>
            <div className="content">
              <div className="type">
                <UIFileIcon name={fileIcon(file)} size={18} />
                {fileType(file)}
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
