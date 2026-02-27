import React, { useMemo } from 'react';
import { useTrackRenders } from '../../hooks/useTrackRenders';
import type { SpacerProps } from './_types';

export const Spacer = React.memo((props: SpacerProps) => {
	const { size = 8 } = props;

	const style = useMemo(
		() => ({ height: size, minHeight: size, maxHeight: size }),
		[size],
	);

	/* START.DEBUG */
	useTrackRenders(props, 'Spacer');
	/* END.DEBUG */

	return <div style={style} />;
});
