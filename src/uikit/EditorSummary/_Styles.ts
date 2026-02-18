import styled from "styled-components";
import { flexBox } from "../../util/flexBox";

export const SummaryBar = styled.div`
  ${flexBox.rowStart};
  min-height: 30px;
  gap: 8px;
  ${({ theme }) => theme.type["body-s-regular"]};
  background: ${({ theme }) => theme.colors["core-surface-primary"]};
  line-height: 1em;
  color: ${({ theme }) => theme.colors["core-text-primary"]};
  border: 1px solid ${({ theme }) => theme.colors["core-outline-primary"]};
  box-shadow: ${({ theme }) => theme.colors["surface-shadow-soft"]};
  border-radius: 100px;
  transition: all 0.25s ease-in-out 0s;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  padding: 12px 16px 12px 12px;
  white-space: nowrap;
  div.pagging {
    ${flexBox.rowStart};
    gap: 4px;
    div.current span {
      color: ${({ theme }) => theme.colors["core-text-primary"]};
    }
    div.current span.resolved {
      color: ${({ theme }) => theme.colors["core-text-disabled"]};
    }
  }
  div.actions {
    ${flexBox.rowStart};
    gap: 8px;
  }
  div.divider {
    width: 1px;
    height: 16px;
    background: ${({ theme }) => theme.colors["core-outline-primary"]};
  }
`;
