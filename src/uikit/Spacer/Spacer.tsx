interface Props {
  size?: number;
}
export function Spacer(props: Props) {
  const { size = 8 } = props;
  return <div style={{ height: size, minHeight: size, maxHeight: size }} />;
}
