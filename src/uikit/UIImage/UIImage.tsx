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
    name = '',
    type = 'png',
    width = 'auto',
    height = 'auto',
    dpr = 'none',
    title,
  } = props;
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pd, setPd] = useState<1 | 2 | 3 | null>(null);
  useEffect(() => {
    setSource();
    if (dpr === 'auto') {
      const ratio = Math.min(Math.ceil(window.devicePixelRatio), 3) as
        | 1
        | 2
        | 3;
      setPd(ratio);
    } // Ensure valid DPR values
    async function setSource() {
      try {
        const imageName = `${name}${pd ? '@' + pd + 'x' : ''}.${type}`;
        let src;
        try {
          src = await import(`./images/${imageName}`);
        } catch {
          src = await import(`../assets/${imageName}`);
        }

        setImageSrc(src.default);
      } catch (error) {
        console.error(`Failed to load image: ${name}`, error);
        setImageSrc(null);
      }
    }
  }, [name, dpr, type, pd]);
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
