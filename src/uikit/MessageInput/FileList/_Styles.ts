import styled from "styled-components";
import { flexBox } from "../../../util/flexBox";

export const FileList = styled.div`
  ${flexBox.rowStart};
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;
  gap: 8px;
`;

export const FileButton = styled.div`
  ${flexBox.rowStart};
  align-items: flex-start;
  padding: 10px 16px 14px 12px;
  background: ${({ theme }) => theme.colors["core-surface-primary"]};
  border: 1px solid ${({ theme }) => theme.colors["core-outline-primary"]};
  border-radius: 24px;
  min-height: 48px;
  cursor: default;
  div.icon {
    ${flexBox.row};
    height: 20px;
    width: 20px;
  }
  div.content {
    ${flexBox.columnStart};
    max-width: 300px;
    padding: 0px 16px 0px 8px;
    gap: 4px;
    div.label {
      ${({ theme }) => theme.type["body-m-regular"]};
      color: ${({ theme }) => theme.colors["core-text-primary"]};
      max-width: 300px;
      line-height: 1.5em;
      overflow: hidden;
      word-break: normal;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      user-select: none;
      -webkit-user-select: none;
    }
    div.type {
      ${flexBox.rowStart};
      padding-top: 4px;
      ${({ theme }) => theme.type["body-xs-regular"]};
      color: ${({ theme }) => theme.colors["core-text-disabled"]};
      gap: 4px;
      div.icon {
        ${flexBox.row};
        height: 16px;
        width: 16px;
        overflow: hidden;
      }
    }
  }
  div.clear {
    ${flexBox.row};
    height: 20px;
    width: 20px;
  }
`;
