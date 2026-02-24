import React, { useMemo } from 'react';

interface Props {
	size?: number;
}
export const Spacer = React.memo((props: Props) => {
	const { size = 8 } = props;

	const style = useMemo(
		() => ({ height: size, minHeight: size, maxHeight: size }),
		[size],
	);

	return <div style={style} />;
});
