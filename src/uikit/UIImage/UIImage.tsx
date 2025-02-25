import { useEffect, useState } from 'react';

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
  name?: UIImageNames | string;
  dpr?: 1 | 2 | 3 | 'auto' | 'none';
  type?: 'png' | 'jpg' | 'gif';
  width?: number | 'auto' | '100%';
  height?: number | 'auto' | '100%';
  title?: string;
}

export function UIImage(props: UIImageProps) {
  const {
    name = 'empty',
    type = 'png',
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
    async function loadImage() {
      if (!name) return;
      try {
        const imageName = `${name}${pd ? '@' + pd + 'x' : ''}.${type}`;
        let imageModule;
        try {
          // Using dynamic import with explicit file extension
          imageModule = await import(`./images/${imageName}`);
        } catch {
          // Fallback to assets directory
          imageModule = await import(`../dist/assets/${imageName}`);
        }
        setImageSrc(imageModule.default);
      } catch (error) {
        console.error(`Failed to load image: ${name}`, error);
        setImageSrc(null);
      }
    }
    loadImage();
  }, [name, type, pd]);

  if (!imageSrc) return null;
  return (
    <img
      src={imageSrc || ''}
      width={width}
      height={height}
      alt={title ? title : name}
      loading={'eager'}
    />
  );
}
