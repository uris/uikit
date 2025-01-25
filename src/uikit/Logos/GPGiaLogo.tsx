import { useTheme } from "styled-components";
import { Logos } from "./Logos";
import logoColor from "../Images/GPGiaLogoColor.png";

export interface GPGiaLogoProps {
  height?: number;
  color?: "full" | "bw" | string;
}

export function GPGiaLogo(props: GPGiaLogoProps) {
  const { height = 52, color = "bw" } = props;
  const theme = useTheme();

  if (color === "full") return <img src={logoColor} height={height} />;
  return (
    <Logos
      image={"gpgia"}
      height={height}
      color={color === "bw" ? theme.colors.textPrimary : color}
    />
  );
}
