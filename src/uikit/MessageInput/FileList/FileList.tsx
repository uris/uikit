import { IconButton } from '../../IconButton';
import { UIFileIcon, UIFileIcons } from '../../UIFileIcon';
import type { ToolTip } from '../../sharedTypes';
import css from './FileList.module.css';

interface FileListProps {
	files?: File[];
	onChange?: (files: File[]) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}

export function FileList(props: Readonly<FileListProps>) {
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
		<div className={css.fileList}>
			{files.map((file: File, index: number) => {
				return (
					<div className={css.fileButton} key={`${file.name}-${index}`}>
						<div className={css.content}>
							<div className={css.type}>
								<UIFileIcon name={fileIcon(file)} size={18} />
								{fileType(file)}
							</div>
							<div className={css.label}>{file.name}</div>
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
									handleRemoveFile(file.name);
								}}
								tooltip={'remove file'}
								onToolTip={(tip) => onToolTip(tip)}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}
