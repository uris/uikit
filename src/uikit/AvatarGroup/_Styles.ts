import { flexBox } from "../../util/flexBox";
import styled from "styled-components";

export const Wrapper = styled.div<{ $overlap: number }>`
  ${flexBox.rowStart};
  div.avatar {
    display: inline-block;
    margin-left: -${({ $overlap }) => $overlap}px;
    border-radius: 100%;
    &:first-child {
      margin-left: -${({ $overlap }) => $overlap / 2}px;
    }
  }
`;
