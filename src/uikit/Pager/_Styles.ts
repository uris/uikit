import styled from "styled-components";
import { flexBox } from "../../util/flexBox";

type Styles = {
  gap: number;
  size: number;
  color: string;
  colorHover: string;
  colorOn: string;
};

export const Wrapper = styled.div<{ $styles: Styles }>`
  ${flexBox.row};
  gap: ${({ $styles }) => $styles.gap}px;
  width: 100%;
  div.bullet {
    ${flexBox.row};
    width: ${({ $styles }) => $styles.size}px;
    height: ${({ $styles }) => $styles.size}px;
    max-width: ${({ $styles }) => $styles.size}px;
    max-height: ${({ $styles }) => $styles.size}px;
    background: ${({ $styles }) => $styles.color};
    border-radius: 100%;
    cursor: pointer;
    &:hover {
      background: ${({ $styles }) => $styles.colorHover};
    }
  }
  div.bullet.selected {
    background: ${({ $styles }) => $styles.colorOn};
  }
`;
