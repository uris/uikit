import styled from 'styled-components';
import { flexBox } from '../../util/flexBox';

export const Bar = styled.div`
  ${flexBox.row};
  width: 100%;
  gap: 10px;
  padding: 16px 0;
`;

export const Step = styled.div<{
	$state: 'done' | 'current' | 'disabled';
	$clickable: boolean;
}>`
  ${flexBox.rowStart};
  gap: 10px;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  div.step {
    ${flexBox.rowStart};
    gap: 8px;
    div.number {
      ${flexBox.row};
      ${({ theme }) => theme.type['body-m-regular']};
      width: 20px;
      height: 20px;
      border-radius: 100px;
      border: 1px solid
        ${({ theme, $state }) =>
					$state === 'done' || $state === 'current'
						? theme.colors['core-button-primary']
						: theme.colors['core-outline-primary']};
      background: ${({ theme, $state }) =>
				$state === 'done'
					? theme.colors['core-button-primary']
					: $state === 'current'
						? 'transparent'
						: theme.colors['core-outline-primary']};
      color: ${({ theme, $state }) =>
				$state === 'disabled'
					? theme.colors['core-text-secondary']
					: theme.colors['core-button-primary']};
      transition: all 0.25s ease-in-out 0s;
    }
    div.title {
      ${({ theme }) => theme.type['body-m-regular']};
      color: ${({ theme, $state }) =>
				$state === 'disabled'
					? theme.colors['core-text-disabled']
					: theme.colors['core-text-primary']};
    }
  }
  div.line {
    height: 1px;
    width: 32px;
    min-height: 1px;
    min-width: 32px;
    background: ${({ theme }) => theme.colors['core-outline-primary']};
  }
`;
