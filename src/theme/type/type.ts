import type { Type } from './types';

// base family
const fontFamily = `"Funnel Sans"`;

// base weights
const fontWeights = {
	regular: 360,
	medium: 420,
	bold: 480,
};

// base sizes
const fontSizes = {
	xs: 12,
	s: 14,
	m: 15,
	l: 16,
};

// ** new styles aligned to lyra */
export const type: Type = {
	'body-xs-regular': `
      font-family: ${fontFamily};
      font-weight: ${fontWeights.regular};
      font-size: ${fontSizes.xs}px;
      line-height: 133.33%;
      text-decoration: none;
      letter-spacing: 0.2px`,
	'body-xs-medium': `
      font-family: ${fontFamily};
      font-weight: ${fontWeights.medium};
      font-size: ${fontSizes.xs}px;
      line-height: 133.33%;
      text-decoration: none;
      letter-spacing: 0.2px`,
	'body-xs-bold': `
      font-family: ${fontFamily};
      font-weight: ${fontWeights.bold};
      font-size: ${fontSizes.xs}px;
      line-height: 133.33%;
      text-decoration: none;
      letter-spacing: 0.250px`,
	'body-s-regular': `
      font-family: ${fontFamily};
      font-weight: ${fontWeights.regular};
      font-size: ${fontSizes.s}px;
      line-height: 142.86%;
      text-decoration: none;
      letter-spacing: 0.15px`,
	'body-s-medium': `
      font-family: ${fontFamily};
      font-weight: ${fontWeights.medium};
      font-size: ${fontSizes.s}px;
      line-height: 142.86%;
      text-decoration: none;
      letter-spacing: 0.15px`,
	'body-s-bold': `
      font-family: ${fontFamily};
      font-weight: ${fontWeights.bold};
      font-size: ${fontSizes.s}px;
      line-height: 142.86%;
      text-decoration: none;
      letter-spacing: 0.2px`,
	'body-m-regular': `
      font-family: ${fontFamily};
      font-weight: ${fontWeights.regular};
      font-size: ${fontSizes.m}px;
      line-height: 140%;
      text-decoration: none;
      letter-spacing: 0.15px`,
	'body-m-medium': `
      font-family: ${fontFamily};
      font-weight: ${fontWeights.medium};
      font-size: ${fontSizes.m}px;
      line-height: 140%;
      text-decoration: none;
      letter-spacing: 0.15px`,
	'body-m-bold': `
      font-family: ${fontFamily};
      font-weight: ${fontWeights.bold};
      font-size: ${fontSizes.m}px;
      line-height: 140%;
      text-decoration: none;
      letter-spacing: 0.2px`,
	'body-l-regular': `
      font-family: ${fontFamily};
      font-weight: ${fontWeights.regular};
      font-size: ${fontSizes.l}px;
      line-height: 162.5%;
      text-decoration: none;
      letter-spacing: 0.1px`,
	'body-l-medium': `
      font-family: ${fontFamily};
      font-weight: ${fontWeights.medium};
      font-size: ${fontSizes.l}px;
      line-height: 162.5%;
      text-decoration: none;
      letter-spacing: 0.1px`,
	'body-l-bold': `
      font-family: ${fontFamily};
      font-weight: ${fontWeights.bold};
      font-size: ${fontSizes.l}px;
      line-height: 162.5%;
      text-decoration: none;
      letter-spacing: 0.15px`,
	'heading-s-bold': `
      font-family: ${fontFamily};
      font-weight: 650;
      font-size: 20px; 
      line-height: 140%;
      text-decoration: none;
      letter-spacing: 0.2px`,
	'heading-s-medium': `
      font-family: ${fontFamily};
      font-weight: 560;
      font-size: 20px; 
      line-height: 140%;
      text-decoration: none;
      letter-spacing: 0.2px`,
	'heading-m-bold': `
      font-family: ${fontFamily};
      font-weight: 650;
      font-size: 24px; 
      line-height: 116.67%;
      text-decoration: none;
      letter-spacing: 0.2px`,
	'heading-m-medium': `
      font-family: ${fontFamily};
      font-weight: 560;
      font-size: 24px; 
      line-height: 116.67%;
      text-decoration: none;
      letter-spacing: 0.2px`,
	'heading-l-medium': `
      font-family: ${fontFamily};
      font-weight: 560;
      font-size: 28px; 
      line-height: 128.57%;
      text-decoration: none;
      letter-spacing: 0.2px`,
	'heading-l-bold': `
      font-family: ${fontFamily};
      font-weight: 650;
      font-size: 28px; 
      line-height: 128.57%;
      text-decoration: none;
      letter-spacing: 0.2px`,
};
