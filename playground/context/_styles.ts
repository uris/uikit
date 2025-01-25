import styled from "styled-components";
import { flexBox } from "../../src/util/flexBox";

export const Page = styled.div<{ $name: string }>`
  ${flexBox.columnStartCenter}
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  background: ${({ theme }) => theme.lyraColors["core-surface-primary"]};
  div.widgets {
    ${flexBox.columnStartCenter};
    padding: 24px 0px;
    gap: 32px;
  }
  div.switch {
    ${flexBox.row};
    gap: 16px;
    span {
      ${({ theme }) => theme.lyraType["body-s-regular"]};
      color: ${({ theme }) => theme.lyraColors["core-text-disabled"]};
    }
  }
`;

export const Title = styled.h1`
  ${flexBox.rowBetween};
  width: 100%;
  padding: 16px 32px;
  white-space: nowrap;
  ${({ theme }) => theme.lyraType["heading-m-medium"]};
  color: ${({ theme }) => theme.lyraColors["core-text-primary"]};
`;
