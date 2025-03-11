import { UIIcon } from '../UIIcon';
import * as Styled from './_Styles';

export interface UICardProps {
  id?: string;
  icon?: string;
  label?: string;
  command?: string;
  width?: number | string;
  onCommand?: (command: { id?: string; command?: string }) => void;
}

export function UICard(props: UICardProps) {
  const { id, icon, label, command, width, onCommand = () => null } = props;
  return (
    <Styled.Card $width={width} onClick={() => onCommand({ id, command })}>
      {icon && (
        <div className="icon">
          <UIIcon name={icon} />
        </div>
      )}
      {label && <div className="label">{label}</div>}
    </Styled.Card>
  );
}
