import { useTheme } from 'styled-components';
import { Avatar } from '../Avatar/Avatar';
import { ToolTip } from '../sharedTypes';
import * as Styled from './_Styles';
import { AvatarInfo } from './_Types';

export interface AvatarGroupProps {
  avatars?: AvatarInfo[] | null;
  size?: number;
  selected?: boolean;
  bgColor?: string;
  overlap?: number;
  border?: number;
  borderColor?: string;
  onToolTip?: (tip: ToolTip | null) => void;
}

export function AvatarGroup(props: AvatarGroupProps) {
  const theme = useTheme();
  const {
    avatars = [],
    size = 32,
    border = 3,
    overlap = 8,
    selected = false,
    bgColor = undefined,
    borderColor = undefined,
    onToolTip = () => null,
  } = props;

  return (
    <Styled.Wrapper $overlap={overlap}>
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
              bgColor={bgColor}
              borderColor={
                borderColor
                  ? borderColor
                  : selected
                    ? theme.lyraColors['core-surface-secondary']
                    : theme.lyraColors['core-surface-primary']
              }
              onToolTip={(tip) => onToolTip(tip)}
            />
          </div>
        );
      })}
    </Styled.Wrapper>
  );
}
