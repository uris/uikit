import React from "react";

interface Props {
	size?: number;
}
export const Spacer = React.memo((props: Props) => {
	const { size = 8 } = props;
	return <div style={{ height: size, minHeight: size, maxHeight: size }} />;
});
