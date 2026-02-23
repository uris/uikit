import type React from 'react';
import { useEffect, useState } from 'react';
import { useTheme } from '../../../hooks';
import { Avatar } from '../../Avatar';
import type { ToolTip } from '../../sharedTypes';
import css from './UserList.module.css';
import { PrompState, type UserPresence } from './_Types';

interface UserListProps {
	userPresence?: UserPresence[];
	owner?: string;
	currentUser?: string;
	presenceID?: string;
	onTogglePrompt?: (userPresensce: UserPresence) => void;
	onToolTip?: (tip: ToolTip | null) => void;
}

export function UserList(props: Readonly<UserListProps>) {
	const theme = useTheme();
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
		<div className={css.promptList}>
			{userList.map((user: UserPresence, index: number) => {
				if (user.id === presenceID) return null;
				if (!user.promptContent || user.promptContent === '') return null;

				const enabled = user.promptState !== PrompState.Disabled;
				const cssVars = {
					'--control-border-color': enabled
						? theme.colors['core-outline-primary']
						: theme.colors['feedback-warning'],
					'--cursor-background': enabled
						? theme.colors['core-icon-primary']
						: theme.colors['feedback-warning'],
					'--cursor-border-radius': enabled ? '100px' : '2px',
					'--cursor-animation': enabled ? 'blink 2s infinite' : 'none',
				} as React.CSSProperties;

				return (
					<div
						className={css.userPrompt}
						key={`${user.email}-${index}`}
						onClick={(e) => e.stopPropagation()}
						onKeyDown={(e) => e.stopPropagation()}
					>
						<div className={css.avatar}>
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
						<div className={css.prompt}>
							<p className={css.promptParagraph}>
								<strong className={css.promptStrong}>{user.first}:</strong>{' '}
								{user.promptContent}
							</p>
						</div>
						{currentUser === owner &&
							currentUser !== user.email &&
							user.promptContent !== '' && (
								<div
									className={css.control}
									style={cssVars}
									// biome-ignore lint/a11y/useSemanticElements: Custom control with specific styling - div with proper ARIA attributes
									role={'button'}
									aria-label={'Stop/Play'}
									onKeyDown={() => handleTogglePrompt(user)}
									onClick={() => handleTogglePrompt(user)}
									tabIndex={0}
								>
									<span className={css.cursor} />
								</div>
							)}
					</div>
				);
			})}
		</div>
	);
}
