import React, { useMemo } from "react";
import { Avatar } from "../Avatar/Avatar";
import type { ToolTip } from "../sharedTypes";
import * as Styled from "./_Styles";
import type { AvatarInfo } from "./_Types";

export interface AvatarGroupProps {
	avatars?: AvatarInfo[] | null;
	size?: number;
	overlap?: number;
	border?: number;
	borderColor?: string;
	gap?: number;
	margin?: number;
	firstOnly?: boolean;
	onToolTip?: (tip: ToolTip | null) => void;
}

export const AvatarGroup = React.memo((props: AvatarGroupProps) => {
	const {
		avatars = [],
		size = 32,
		border = 3,
		overlap = 8,
		gap = 0,
		borderColor = undefined,
		margin = 0,
		firstOnly = false,
		onToolTip = () => null,
	} = props;

	// Memoize rendered avatars list
	const renderedAvatars = useMemo(() => {
		if (!avatars) return null;
		return avatars.map((avatar: AvatarInfo, index: number) => (
			<div className="avatar" key={`avatar_${avatar.email}_${index}`}>
				<Avatar
					first={avatar.first}
					last={avatar.last}
					image={avatar.image || avatar.avatar}
					size={size}
					frame={size}
					border={border}
					borderColor={borderColor}
					color={avatar.color}
					bgColor={avatar.bgColor}
					firstOnly={firstOnly}
					onToolTip={onToolTip}
				/>
			</div>
		));
	}, [avatars, size, border, borderColor, firstOnly, onToolTip]);

	return (
		<Styled.Wrapper $overlap={overlap} $gap={gap} $margin={margin}>
			{renderedAvatars}
		</Styled.Wrapper>
	);
});
