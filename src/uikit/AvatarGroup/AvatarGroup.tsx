import { useTheme } from 'styled-components';
import { Avatar } from '../Avatar/Avatar';
import * as Styled from './_Styles';
import { AvatarInfo } from './_Types';

export interface AvatarGroupProps {
  avatars?: AvatarInfo[] | null;
  size?: number;
  selected?: boolean;
  bgColor?: string;
  overlap?: number;
  border?: number;
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
  } = props;

  return (
    <Styled.Wrapper $overlap={overlap}>
      {avatars?.map((avatar: AvatarInfo, index: number) => {
        return (
          <div className="avatar" key={'avatar_' + avatar.email + '_' + index}>
            <Avatar
              first={avatar.email}
              last={avatar.last}
              image={avatar.image}
              size={size}
              frame={size}
              border={border}
              bgColor={bgColor}
              borderColor={
                selected
                  ? theme.lyraColors['core-surface-secondary']
                  : theme.lyraColors['core-surface-primary']
              }
            />
          </div>
        );
      })}
    </Styled.Wrapper>
  );
}
