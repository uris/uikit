import { AnimatePresence } from 'framer-motion';
import * as Styled from './Styles';

export interface OverlayProps {
  opacity?: number;
  color?: string;
  type?: 'clear' | 'dark';
  global?: boolean;
  overlay?: any;
  onClick?: () => void;
  toggleOverlay?: (state: boolean) => void;
}

export function Overlay(props: OverlayProps) {
  const {
    onClick = () => null,
    toggleOverlay = () => null,
    opacity = 0,
    color = '#00000010',
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
          animate={{
            opacity:
              type === 'clear'
                ? 0
                : opacity
                  ? opacity
                  : type === 'dark'
                    ? 0.8
                    : 0,
          }}
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
