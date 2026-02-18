import styled from "styled-components";
import { flexBox } from "../../util/flexBox";

export const Wrapper = styled.div`
  ${flexBox.rowBetween};
  width: 100%;
  div.right {
    ${flexBox.rowStart};
  }
  div.left {
    ${flexBox.rowStart};
    flex: 1;
  }
`;

export const ButtonGroup = styled.div`
  ${flexBox.rowStart};
  gap: 4px;
  div.divider {
    height: 20px;
    min-height: 100%;
    width: 1px;
    min-width: 1px;
    max-width: 1px;
    background: ${({ theme }) => theme.lyraColors["core-surface-secondary"]};
    margin: 0 8px;
  }
`;
