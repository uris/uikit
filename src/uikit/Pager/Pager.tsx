import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import * as Styled from './_Styles';

export interface PagerProps {
  size?: number;
  index?: number;
  color?: string;
  colorOn?: string;
  colorHover?: string;
  pages?: number;
  gap?: number;
  onChange?: (index: number) => void;
}

export function Pager(props: PagerProps) {
  const theme = useTheme();
  const {
    size = 8,
    index = 0,
    color = theme.colors.bgTintSelected,
    colorHover = theme.colors.bgTintHovered,
    colorOn = theme.colors.textSecondary,
    pages = 2,
    gap = 4,
    onChange = () => null,
  } = props;
  const [selected, setSelected] = useState<number>(index);
  const [bullets, setBullets] = useState<number[]>([]);
  const styles = { size, color, colorOn, colorHover, gap };
  useEffect(() => {
    const items = new Array(pages).fill(0);
    setBullets(items);
  }, [pages]);
  useEffect(() => setSelected(index), [index]);

  function handleClick(i: number) {
    setSelected(i);
    onChange(i);
  }

  return (
    <Styled.Wrapper $styles={styles}>
      {bullets.map((_bullet: number, i: number) => {
        return (
          <div
            key={'pagging_' + i}
            className={`bullet ${selected === i ? 'selected' : ''}`}
            onClick={() => handleClick(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent page scrolling on space key
                handleClick(i);
              }
            }}
            onTouchStart={() => handleClick(i)}
            role={'button'}
            tabIndex={i}
          />
        );
      })}
    </Styled.Wrapper>
  );
}
