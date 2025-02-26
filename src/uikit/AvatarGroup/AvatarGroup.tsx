import { Avatar } from '../Avatar/Avatar';
import { ToolTip } from '../sharedTypes';
import * as Styled from './_Styles';
import { AvatarInfo } from './_Types';

export interface AvatarGroupProps {
  avatars?: AvatarInfo[] | null;
  size?: number;
  overlap?: number;
  border?: number;
  borderColor?: string;
  gap?: number;
  margin?: number;
  onToolTip?: (tip: ToolTip | null) => void;
}

export function AvatarGroup(props: AvatarGroupProps) {
  const {
    avatars = [],
    size = 32,
    border = 3,
    overlap = 8,
    gap = 0,
    borderColor = undefined,
    margin = 0,
    onToolTip = () => null,
  } = props;

  return (
    <Styled.Wrapper $overlap={overlap} $gap={gap} $margin={margin}>
      {avatars?.map((avatar: AvatarInfo, index: number) => {
        return (
          <div className="avatar" key={'avatar_' + avatar.email + '_' + index}>
            <Avatar
              first={avatar.email}
              last={avatar.last}
              image={avatar.image ? avatar.image : avatar.avatar}
              size={size}
              frame={size}
              border={border}
              borderColor={borderColor}
              color={avatar.color}
              bgColor={avatar.bgColor}
              onToolTip={(tip) => onToolTip(tip)}
            />
          </div>
        );
      })}
    </Styled.Wrapper>
  );
}
