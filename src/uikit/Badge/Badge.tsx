import * as Styled from "./_Styles";

export interface BadgeProps {
  count?: number | string;
  hideNull?: boolean;
  variant?: "light" | "dark";
}

export function Badge(props: BadgeProps) {
  const { count = 0, variant = "dark", hideNull = true } = props;
  const setCount = () => {
    if (typeof count === "number" && count > 99) return "99+";
    else return count.toString();
  };
  if (hideNull && count === 0) return null;
  return <Styled.Badge $variant={variant}>{setCount()}</Styled.Badge>;
}
