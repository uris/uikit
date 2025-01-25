import { AnimatePresence } from 'framer-motion';
import * as Styled from './Styles';

export interface OverlayProps {
  onClick?: () => void;
  toggleOverlay: (state: boolean) => void;
  opacity?: number;
  color?: string;
  type?: 'clear' | 'dark';
  global?: boolean;
  overlay?: any;
}

export function Overlay(props: OverlayProps) {
  const {
    onClick = () => null,
    toggleOverlay = () => null,
    opacity = 0,
    color = 'rgba(0,0,0,1)',
    type = 'clear',
    global = false,
    overlay,
  } = props;
  const show = !global || (global && overlay);
  function handleClick() {
    if (global) toggleOverlay(false);
    onClick();
  }
  return (
    <AnimatePresence initial={false}>
      {show && (
        <Styled.Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: opacity ? opacity : type === 'dark' ? 0.8 : 0 }}
          exit={{ opacity: 0 }}
          $opacity={opacity ? opacity : type === 'dark' ? 0.8 : 0}
          $color={color}
          onClick={() => handleClick()}
          onContextMenu={(e) => e.preventDefault()}
        />
      )}
    </AnimatePresence>
  );
}
