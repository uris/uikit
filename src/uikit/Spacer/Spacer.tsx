import React, { useMemo } from 'react';
import type { SpacerProps } from './_types';

export const Spacer = React.memo((props: SpacerProps) => {
	const { size = 8 } = props;

	const style = useMemo(
		() => ({ height: size, minHeight: size, maxHeight: size }),
		[size],
	);

	return <div style={style} />;
});
