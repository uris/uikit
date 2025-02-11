import { useTheme } from 'styled-components';
import { DocIcons } from '../../DocIcon/DocIcons';
import { IconButton } from '../../IconButton/IconButton';
import { UploadDocument } from '../_Types';
import * as Styled from './Styles';

interface ClearAttachmentProps {
  onClearAttachment?: () => void;
  upload?: UploadDocument | null;
  maxsize?: number;
}

export function FileList(props: ClearAttachmentProps) {
  const {
    maxsize = 4000,
    upload = null,
    onClearAttachment = () => null,
  } = props;
  const { theme } = useTheme();

  function setFileIcon(): 'text' | 'pdf' | 'docx' | 'not supported' {
    if (!upload || (upload.size && upload.size > maxsize)) {
      return 'not supported';
    }
    switch (upload.mimeType) {
      case 'text/plain':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'docx';
      case 'application/pdf':
        return 'pdf';
      default:
        return 'not supported';
    }
  }

  return (
    <Styled.Upload>
      <Styled.Document>
        <Styled.Icon>
          <DocIcons height={44} type={setFileIcon()} />
        </Styled.Icon>
        <Styled.DocumentInfo>
          <div className="filename">{upload?.fileName}</div>
          <div className="filetype">{upload?.mimeType}</div>
        </Styled.DocumentInfo>
      </Styled.Document>
      <IconButton
        bgColor={theme.colors.bgTintNormal}
        bgColorHover={theme.colors.bgTintSelected}
        toggle={false}
        icon={'x'}
        tooltip="Remove file"
        onClick={() => onClearAttachment()}
        iconSize={20}
      />
    </Styled.Upload>
  );
}
