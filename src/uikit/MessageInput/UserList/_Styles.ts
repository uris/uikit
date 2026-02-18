import styled, { keyframes } from "styled-components";
import { flexBox } from "../../../util/flexBox";

export const PromptList = styled.div`
  ${flexBox.columnStart};
  width: 100%;
  gap: 8px;
`;

const blinkAnimation = keyframes`
  0% {opacity:1}
  50% {opacity:0}
  100% {opacity:1}
`;

export const UserPrompt = styled.div<{ $enabled: boolean }>`
  ${flexBox.rowStart};
  align-items: flex-start;
  padding: 10px 12px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors["core-surface-primary"]};
  border: 1px solid ${({ theme }) => theme.colors["core-outline-primary"]};
  cursor: default;
  div.avatar {
    ${flexBox.row};
    height: 24px;
    width: 24px;
  }
  div.prompt {
    ${flexBox.rowStart};
    flex: 1;
    padding: 0px 16px 0px 8px;
    ${({ theme }) => theme.type["body-s-regular"]};
    color: ${({ theme }) => theme.colors["core-text-tertiary"]};
    font-weight: 380;
    line-height: 1.5em;
    min-height: 24px;
    strong {
      ${({ theme }) => theme.type["body-s-regular"]};
      color: ${({ theme }) => theme.colors["core-text-primary"]};
    }
    p {
      margin: 0;
      padding: 0;
    }
  }
  div.control {
    ${flexBox.row};
    border-radius: 100%;
    border: 1px solid
      ${({ theme, $enabled }) =>
				$enabled
					? theme.colors["core-outline-primary"]
					: theme.colors["feedback-warning"]};
    height: 24px;
    width: 24px;
    cursor: pointer;
    span.cursor {
      display: block;
      background: ${({ theme, $enabled }) =>
				$enabled
					? theme.colors["core-icon-primary"]
					: theme.colors["feedback-warning"]};
      min-width: 0.5em;
      min-height: 0.5em;
      width: 0.5em;
      height: 0.5em;
      border-radius: ${({ $enabled }) => ($enabled ? 100 : 2)}px;
      animation-name: ${({ $enabled }) => ($enabled ? blinkAnimation : "none")};
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }
  }
`;
