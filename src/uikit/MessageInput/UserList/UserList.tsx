import { useEffect, useState } from 'react';
import { Avatar } from '../../Avatar/Avatar';
import { ToolTip } from '../../sharedTypes';
import * as Styled from './_Styles';
import { PrompState, UserPresence } from './_Types';

interface UserListProps {
  userPresence?: UserPresence[];
  owner?: string;
  currentUser?: string;
  presenceID?: string;
  onTogglePrompt?: (userPresensce: UserPresence) => void;
  onToolTip?: (tip: ToolTip | null) => void;
}

export function UserList(props: UserListProps) {
  const {
    userPresence = [],
    onTogglePrompt = () => null,
    owner = '',
    currentUser = '',
    presenceID = '',
  } = props;
  const [userList, setUserList] = useState<UserPresence[]>(userPresence);
  useEffect(() => setUserList(userPresence), [userPresence]);

  function handleTogglePrompt(user: UserPresence) {
    if (currentUser !== owner) return;
    let promptState: PrompState = PrompState.Disabled;
    if (user.promptState) {
      promptState =
        user.promptState === PrompState.Disabled
          ? PrompState.Enabled
          : PrompState.Disabled;
    }
    const presenceUpdate: UserPresence = { ...user, promptState };
    onTogglePrompt(presenceUpdate);
  }

  return (
    <Styled.PromptList>
      {userList.map((user: UserPresence, index: number) => {
        if (user.id === presenceID) return null;
        if (!user.promptContent || user.promptContent === '') return null;
        return (
          <Styled.UserPrompt
            key={user.email + '-' + index}
            $enabled={user.promptState !== PrompState.Disabled}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="avatar">
              <Avatar
                size={20}
                first={user.first}
                last={user.last}
                image={user.avatar}
                bgColor={user.bgColor}
                color={user.color}
                border={0}
              />
            </div>
            <div className="prompt">
              <p>
                <strong>{user.first}:</strong> {user.promptContent}
              </p>
            </div>
            {currentUser === owner &&
              currentUser !== user.email &&
              user.promptContent !== '' && (
                <div
                  className="control"
                  role={'button'}
                  aria-label={'Stop/Play'}
                  onKeyDown={() => handleTogglePrompt(user)}
                  onClick={() => handleTogglePrompt(user)}
                  tabIndex={0}
                >
                  <span className="cursor" />
                </div>
              )}
          </Styled.UserPrompt>
        );
      })}
    </Styled.PromptList>
  );
}
