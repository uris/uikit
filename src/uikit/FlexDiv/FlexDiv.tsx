import { useTheme } from 'styled-components';
import { Transition } from 'framer-motion';
import * as Styled from './_Styles';

export interface FlexDivProps {
  children?: any;
  scrollY?: boolean;
  scrollX?: boolean;
  absolute?: boolean;
  background?: string;
  direction?: 'row' | 'column';
  alignItems?: 'start' | 'center' | 'end' | 'between';
  justify?: 'start' | 'top' | 'center' | 'end' | 'bottom' | 'between';
  width?: number | 'grow' | 'fill' | 'fit' | 'viewport' | string;
  height?: number | 'grow' | 'fill' | 'fit' | 'viewport' | string;
  flex?: number;
  reverse?: boolean;
  wrap?: boolean;
  padding?: number | string;
  margin?: number | string;
  className?: string;
  enter?: any;
  exit?: any;
  animate?: any;
  transition?: Transition;
  variants?: any;
  gap?: number;
}

export function FlexDiv(props: FlexDivProps) {
  const theme = useTheme();
  const {
    children,
    scrollY = false,
    scrollX = false,
    background = theme.colors.bgNormal,
    direction = 'column',
    alignItems = 'start',
    justify = 'start',
    height = 'viewport',
    width = 'fill',
    wrap = false,
    reverse = false,
    padding = 0,
    margin = 0,
    absolute = false,
    flex,
    className,
    gap,
    variants,
    transition,
    animate,
    enter,
    exit,
  } = props;

  function setSize(style: string | number, isHeight: boolean) {
    if (typeof style === 'number') return style + 'px';
    if (style === 'grow') return 'unset';
    if (style === 'fill') return '100%';
    if (style === 'fit') return 'auto';
    if (style === 'viewport') return isHeight ? '100vh' : '100vw';
    return style;
  }

  function setBox(style: string | number) {
    if (typeof style === 'number') return style + 'px';
    return style;
  }

  function setFlex(style: string) {
    if (style === 'start' || style === 'top') return 'flex-start';
    if (style === 'end' || style === 'bottom') return 'flex-end';
    if (style === 'between') return 'space-between';
    return style;
  }

  const layout = () => {
    return `display: flex;
    position: ${absolute ? 'absolute' : 'relative'};
    flex-direction: ${direction}${reverse ? '-reverse' : ''};
    flex-wrap:${wrap ? 'wrap' : 'nowrap'};
    justify-content: ${setFlex(direction === 'row' ? justify : justify)};
    align-items: ${setFlex(direction === 'row' ? alignItems : alignItems)};;
    box-sizing: border-box;
    padding: ${setBox(padding)};
    margin: ${setBox(margin)};
    width: ${absolute ? 'unset' : setSize(width, false)};
    height: ${absolute ? 'unset' : setSize(height, true)};
    flex:${absolute ? 'unset' : flex ? flex : 'unset'};
    top:${absolute ? '0' : 'unset'};
    bottom:${absolute ? '0' : 'unset'};
    left:${absolute ? '0' : 'unset'};
    right:${absolute ? '0' : 'unset'};
    gap:${gap ? gap + 'px' : 'unset'};`;
  };
  return (
    <Styled.BaseLayout
      $scrollX={scrollX}
      $scrollY={scrollY}
      $flexBox={layout()}
      $background={background}
      className={className}
      transition={transition}
      variants={variants}
      initial={enter}
      animate={animate}
      exit={exit}
    >
      {children}
    </Styled.BaseLayout>
  );
}
