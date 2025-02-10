import { useCallback, useEffect, useRef } from 'react';
import { useGiaThemes } from '../../theme/useGiaThemes';
import * as Styled from './Styles';

export interface SliderProps {
  initial?: number;
  scaleMin?: number;
  scaleMax?: number;
  width?: number | string;
  height?: number | string;
  touchHeight?: number | string;
  trackHeadSize?: number | null;
  trackHeadWidth?: number | null;
  headType?: 'round' | 'square';
  headColor?: string;
  trackColor?: string;
  progressColor?: string;
  rounding?: number;
  cursor?: 'default' | 'grab' | 'grabbing' | 'pointer';
  state?: any[];
  onChange?: (value: number, percent: number) => void;
  onDragChange?: (value: number, percent: number) => void;
}

export function Slider(props: SliderProps) {
  const themes = useGiaThemes();
  const {
    initial = 25,
    scaleMin = 0,
    scaleMax = 100,
    width = 100,
    height = 2,
    touchHeight = 24,
    trackHeadSize = 7,
    headType = 'round',
    trackHeadWidth = 4,
    rounding = 2,
    cursor = 'default',
    headColor = themes.light.lyraColors['core-icon-primary'],
    trackColor = themes.light.lyraColors['core-outline-primary'],
    progressColor = themes.light.lyraColors['core-icon-primary'],
    state = [],
    onChange = () => null,
    onDragChange = () => null,
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);

  // set the initital positon of the slider absolute value within scale
  const initialProgress = useCallback(
    (current: number): void => {
      if (!ref || !ref.current) return;
      const sliderWidth = ref.current.getBoundingClientRect().width;
      if (current > scaleMax || current < scaleMin) {
        // eslint-disable-next-line no-console
        console.warn(
          'Slider value outside scale range. Auto adjusting to mid point.',
        );
        current = (scaleMax - scaleMin) / 2;
      }
      const normalized = (current - scaleMin) / (scaleMax - scaleMin);
      const pixelPos = normalized * sliderWidth;
      setTrackAndHead(pixelPos);
    },
    [scaleMax, scaleMin],
  );

  // based on x pos of a mouse drag/click, get the percent and normalized value of the slider
  const progress = useCallback(
    (posX: number): { value: number; percent: number } => {
      const el = ref?.current;
      if (!el) return { value: 0, percent: 0 };
      const rect = el.getBoundingClientRect();
      const sliderWidth = rect.width;
      const percent: number = posX / sliderWidth;
      const value: number = scaleMin + percent * (scaleMax - scaleMin);
      return {
        value: parseFloat(value.toFixed(rounding)),
        percent: parseFloat(percent.toFixed(rounding)),
      };
    },
    [rounding, scaleMax, scaleMin],
  );

  // take a mouse pos and sets the slider position accordingly
  // returns the pos value making sure it's in bounds
  const updateSlider = useCallback((e: any) => {
    const el = ref?.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const sliderWidth = rect.width;
    let pos: number = e.clientX - rect.x;
    if (pos > sliderWidth) pos = sliderWidth;
    else if (pos < 0) pos = 0;
    setTrackAndHead(pos);
    return pos;
  }, []);

  // on mouse move, push slider to updated mouse position and trigger the update events
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      const el = ref?.current;
      if (el) {
        const pos = updateSlider(e); // return new pixel pos and updates head/track
        const sliderValues = progress(pos);
        onChange(sliderValues.value, sliderValues.percent);
      }
    },
    [onChange, progress, updateSlider],
  );

  // on mouse move, push slider to updated mouse up position and trigger the update events
  // also cleaning up the mouse move and mouse up listnsers attached to the window
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      window.removeEventListener('mousemove', handleMouseMove, false);
      window.removeEventListener('mouseup', handleMouseUp, false);
      const el = ref?.current;
      if (el) {
        const pos = updateSlider(e); // return new pixel pos and updates head/track
        const sliderValues = progress(pos);
        onDragChange(sliderValues.value, sliderValues.percent);
      }
    },
    [handleMouseMove, progress, onDragChange, updateSlider],
  );

  // On mouse down push the progress of slider to the mouse down point
  // and trigger events - add the drag and mouse up window listners
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      window.addEventListener('mousemove', handleMouseMove, false);
      window.addEventListener('mouseup', handleMouseUp, false);
      const el = ref?.current;
      if (el) {
        const pos = updateSlider(e); // return new pixel pos and updates head/track
        const sliderValues = progress(pos);
        onChange(sliderValues.value, sliderValues.percent);
        onDragChange(sliderValues.value, sliderValues.percent);
      }
    },
    [
      handleMouseMove,
      handleMouseUp,
      onChange,
      onDragChange,
      progress,
      updateSlider,
    ],
  );

  // set the very first state of the slider - note the empty dependency
  // ensuring the initial state will be applied only once on compoenent load
  useEffect(() => {
    const el = ref?.current;
    if (el) {
      el?.addEventListener('mousedown', handleMouseDown, false);
      initialProgress(initial);
    }
    return () => {
      el?.removeEventListener('mousedown', handleMouseDown, false);
    };
  }, [initial, handleMouseDown, initialProgress]);

  // becuase we use addEventListner, need to refresh based on state updates
  // so we use the sate prop as dependency to re-apply listners without setting
  // the current position to avoid infinte render
  useEffect(() => {
    const el = ref?.current;
    if (el) el?.addEventListener('mousedown', handleMouseDown, false);
    return () => {
      el?.removeEventListener('mousedown', handleMouseDown, false);
    };
  }, [state, handleMouseDown]);

  // set the position of the track progress and track head
  // based on the pixel position
  function setTrackAndHead(pixelPos: number) {
    const tr = track.current;
    const hd = head.current;
    if (tr && hd) {
      tr.style.width = pixelPos + 'px';
      hd.style.left = pixelPos - hd.offsetWidth / 2 + 'px';
    }
  }

  function headWidth() {
    if (headType === 'round') return trackHeadSize;
    else return trackHeadWidth;
  }

  return (
    <Styled.Wrapper
      ref={ref}
      $width={width}
      $height={height}
      $touchHeight={touchHeight}
      $cursor={cursor}
    >
      <Styled.TrackBG $width={width} $height={height} $color={trackColor}>
        <Styled.Track ref={track} $color={progressColor}>
          <Styled.TrackHead
            ref={head}
            $height={trackHeadSize}
            $width={headWidth()}
            $headType={headType}
            $color={headColor}
          />
        </Styled.Track>
      </Styled.TrackBG>
    </Styled.Wrapper>
  );
}
