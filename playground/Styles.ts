import styled from "styled-components";
import { flexBox } from "../src/util/flexBox";

export const Component = styled.div<{ $columns?: boolean }>`
  ${({ $columns }) => ($columns ? flexBox.columnStartCenter : flexBox.row)};
  flex-wrap: wrap;
  width: 100%;
  gap: 24px;
`;

export const Wrap = styled.div`
  ${flexBox.row};
  width: 100%;
  flex-wrap: wrap;
  gap: 16px;
  padding: 0 64px;
`;

export const Name = styled.span`
  ${flexBox.row};
  width: 100%;
  background: ${({ theme }) => theme.lyraColors["core-surface-secondary"]};
  ${({ theme }) => theme.lyraType["body-l-regular"]};
  color: ${({ theme }) => theme.lyraColors["core-text-primary"]};
  padding: 8px 0px;
`;
