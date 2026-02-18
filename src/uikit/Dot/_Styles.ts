import { motion } from "motion/react";
import styled from "styled-components";
import { flexBox } from "../../util/flexBox";

type Props = {
	size?: number;
	topOffset?: number;
	rightOffset?: number;
	border: number;
	position: "inline" | "corner";
	color?: string;
	state?: "red" | "yellow" | "green" | "blue" | "grey" | undefined;
};

function setBackground(
	state: "red" | "yellow" | "green" | "blue" | "grey" | undefined,
	color: string | undefined,
	theme: any,
) {
	if (state) {
		switch (state) {
			case "red":
				return theme.colors["feedback-warning"];
			case "yellow":
				return theme.colors["feedback-attention"];
			case "green":
				return theme.colors["feedback-positive"];
			case "grey":
				return theme.colors["core-text-secondary"];
			default:
				return theme.colors["core-gp-logo-primary"];
		}
	}
	if (color) {
		return color;
	}
	return theme.colors["core-gp-logo-primary"];
}

export const Dot = styled(motion.div)<{ $props: Props }>`
  ${flexBox.row};
  display: ${({ $props }) =>
		$props.position === "inline" ? "inline-flex" : "flex"};
  box-sizing: content-box;
  position: ${({ $props }) =>
		$props.position === "inline" ? "relative" : "absolute"};
  top: ${({ $props }) =>
		$props.position === "inline" ? "unset" : $props.topOffset}px;
  right: ${({ $props }) =>
		$props.position === "inline" ? "unset" : $props.rightOffset}px;
  vertical-align: ${({ $props }) =>
		$props.position === "inline" ? "middle" : "unset"};
  min-height: ${({ $props }) => $props.size}px;
  min-width: ${({ $props }) => $props.size}px;
  height: ${({ $props }) => $props.size}px;
  width: ${({ $props }) => $props.size}px;
  border: ${({ $props }) => $props.border}px solid
    ${({ theme }) => theme.colors["core-surface-primary"]};
  background: ${({ theme, $props }) =>
		setBackground($props.state, $props.color, theme)};
  border-radius: 100%;
  z-index: 1000;
`;
