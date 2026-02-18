import styled from "styled-components";
import { flexBox } from "../../util/flexBox";

export const ButtonBar = styled.div`
  ${flexBox.rowStart};
  div.label {
    ${flexBox.rowStart};
    ${({ theme }) => theme.type["body-m-regular"]};
    color: ${({ theme }) => theme.colors["core-text-disabled"]};
    padding-right: 4px;
  }
`;

export const Button = styled.div<{ $last: boolean }>`
  ${flexBox.rowStart};
  div.button {
    ${flexBox.row};
    height: 32px;
    gap: 0px;
    cursor: pointer;
  }
  div.button {
    background: ${({ theme }) => theme.colors["core-surface-primary"]};
    color: ${({ theme }) => theme.colors["core-text-disabled"]};
    &:last-child {
      &:hover {
        background: ${({ theme }) => theme.colors["core-surface-primary"]};
      }
    }
    &:first-child {
      &:hover {
        background: ${({ theme }) => theme.colors["core-surface-primary"]};
      }
    }
    &:hover {
      background: ${({ theme }) => theme.colors["core-surface-primary"]};
      color: ${({ theme }) => theme.colors["core-text-primary"]};
    }
  }
  div.button.selected {
    background: ${({ theme }) => theme.colors["core-surface-primary"]};
    color: ${({ theme }) => theme.colors["core-button-primary"]};
  }
  div.divider {
    display: ${({ $last }) => ($last ? "none" : "block")};
    width: 1px;
    height: 16px;
    background: ${({ theme }) => theme.colors["core-outline-primary"]};
    margin: 0 4px;
  }
`;
