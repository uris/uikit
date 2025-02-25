import { useEffect, useState } from 'react';
import { imageMap } from './imageImports';

export enum UIImageNames {
  lightMode = 'light',
  darkmode = 'dark',
  automode = 'auto',
  profileWoman1 = 'expert1',
  profileMan1 = 'expert2',
  profileWoman2 = 'expert3',
  gpcolorlogo = 'gp-color',
  gpcolormark = 'gp-mark',
  empty = 'empty',
}

export interface UIImageProps {
  name?: string | UIImageNames;
  dpr?: 1 | 2 | 3 | 'auto' | 'none';
  width?: number | 'auto' | '100%';
  height?: number | 'auto' | '100%';
  title?: string;
}

export function UIImage(props: UIImageProps) {
  const {
    name = 'empty',
    width = 'auto',
    height = 'auto',
    dpr = 'none',
    title,
  } = props;
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pd, setPd] = useState<1 | 2 | 3 | null>(null);

  useEffect(() => {
    if (dpr === 'auto') {
      const ratio = Math.min(Math.ceil(window.devicePixelRatio), 3) as
        | 1
        | 2
        | 3;
      setPd(ratio);
    } else if (typeof dpr === 'number') {
      setPd(dpr);
    }
  }, [dpr]);

  useEffect(() => {
    if (!name) return;

    const resolution = pd || 1;
    const image = imageMap[name]?.[resolution];

    if (image) {
      setImageSrc(image);
    } else {
      console.error(`Image not found: ${name} at resolution ${resolution}x`);
      setImageSrc(null);
    }
  }, [name, pd]);

  if (!imageSrc) return null;
  return (
    <img
      src={imageSrc}
      width={width}
      height={height}
      alt={title ? title : name}
      loading={'eager'}
    />
  );
}
