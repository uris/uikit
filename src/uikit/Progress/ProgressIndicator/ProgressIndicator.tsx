import { useTheme } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as Styled from './_Styles';

export interface ProgressIndicatorProps {
  size?: number;
  secondsPerSpin?: number;
  show?: boolean;
  color?: string;
  stroke?: number;
  displayInline?: boolean;
  duration?: number;
  inline?: boolean;
  didStart?: () => void;
  didStop?: () => void;
}

export function ProgressIndicator(props: ProgressIndicatorProps) {
  const theme = useTheme();
  const {
    size = 20,
    secondsPerSpin = 1,
    show = false,
    color = theme.lyraColors['core-icon-primary'],
    stroke = 1.5,
    inline = false,
    duration = undefined,
    didStart = () => null,
    didStop = () => null,
  } = props;
  const [playing, setPlaying] = useState<boolean>(show);
  const timer = useRef<any>(null);

  useEffect(() => {
    if (show) {
      setPlaying(true);
      didStart();
      if (duration) {
        timer.current = setTimeout(() => {
          setPlaying(false);
          didStop();
        }, duration * 1000);
      }
    } else {
      setPlaying(false);
      didStop();
    }
    return () => {
      if (timer && timer.current) clearTimeout(timer.current);
    };
  }, [show, didStart, didStop, duration]);

  return (
    <AnimatePresence initial={true}>
      {show && (
        <Styled.Container
          $inline={inline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {OpenCircle(size, secondsPerSpin, color, stroke, playing)}
        </Styled.Container>
      )}
    </AnimatePresence>
  );
}

const OpenCircle = (
  size: number = 20,
  secondsPerSpin: number = 1,
  color: string,
  stroke: number = 1.5,
  playing: boolean = false,
) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      transition={{
        ease: 'linear',
        repeatType: 'loop',
        repeat: playing ? Infinity : 0,
        duration: secondsPerSpin,
      }}
      animate={playing ? { rotate: 360 } : { rotate: 0 }}
    >
      <defs>
        <linearGradient id="strokeFill" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity={1} />
          <stop offset="50%" stopColor={color} stopOpacity={1} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.path
        d="M 17.371 6.886 C 17.776 7.843 18 8.895 18 10 C 18 14.418 14.418 18 10 18 C 5.582 18 2 14.418 2 10 C 2 5.582 5.582 2 10 2"
        fill="transparent"
        strokeWidth={stroke}
        stroke={'url(#strokeFill)'}
      />
    </motion.svg>
  );
};
