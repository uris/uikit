import type React from 'react';
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

export const typeCssClasses: Record<keyof Type, string> = {
	'body-xs-regular': 'body-xs-regular',
	'body-xs-medium': 'body-xs-medium',
	'body-xs-bold': 'body-xs-bold',
	'body-s-regular': 'body-s-regular',
	'body-s-medium': 'body-s-medium',
	'body-s-bold': 'body-s-bold',
	'body-m-regular': 'body-m-regular',
	'body-m-medium': 'body-m-medium',
	'body-m-bold': 'body-m-bold',
	'body-l-regular': 'body-l-regular',
	'body-l-medium': 'body-l-medium',
	'body-l-bold': 'body-l-bold',
	'heading-s-bold': 'heading-s-bold',
	'heading-s-medium': 'heading-s-medium',
	'heading-m-medium': 'heading-m-medium',
	'heading-m-bold': 'heading-m-bold',
	'heading-l-medium': 'heading-l-medium',
	'heading-l-bold': 'heading-l-bold',
};

export const typeStyles: Record<keyof Type, React.CSSProperties> = {
	'body-xs-regular': {
		fontFamily: `${fontFamily}`,
		fontWeight: `${fontWeights.regular}`,
		fontSize: `${fontSizes.xs}px`,
		lineHeight: '133.33%',
		textDecoration: 'none',
		letterSpacing: '0.2px',
	},
	'body-xs-medium': {
		fontFamily: `${fontFamily}`,
		fontWeight: `${fontWeights.medium}`,
		fontSize: `${fontSizes.xs}px`,
		lineHeight: '133.33%',
		textDecoration: 'none',
		letterSpacing: '0.2px',
	},
	'body-xs-bold': {
		fontFamily: `${fontFamily}`,
		fontWeight: `${fontWeights.bold}`,
		fontSize: `${fontSizes.xs}px`,
		lineHeight: '133.33%',
		textDecoration: 'none',
		letterSpacing: '0.250px',
	},
	'body-s-regular': {
		fontFamily: `${fontFamily}`,
		fontWeight: `${fontWeights.regular}`,
		fontSize: `${fontSizes.s}px`,
		lineHeight: '142.86%',
		textDecoration: 'none',
		letterSpacing: '0.15px',
	},
	'body-s-medium': {
		fontFamily: `${fontFamily}`,
		fontWeight: `${fontWeights.medium}`,
		fontSize: `${fontSizes.s}px`,
		lineHeight: '142.86%',
		textDecoration: 'none',
		letterSpacing: '0.15px',
	},
	'body-s-bold': {
		fontFamily: `${fontFamily}`,
		fontWeight: `${fontWeights.bold}`,
		fontSize: `${fontSizes.s}px`,
		lineHeight: '142.86%',
		textDecoration: 'none',
		letterSpacing: '0.2px',
	},
	'body-m-regular': {
		fontFamily: `${fontFamily}`,
		fontWeight: `${fontWeights.regular}`,
		fontSize: `${fontSizes.m}px`,
		lineHeight: '140%',
		textDecoration: 'none',
		letterSpacing: '0.15px',
	},
	'body-m-medium': {
		fontFamily: `${fontFamily}`,
		fontWeight: `${fontWeights.medium}`,
		fontSize: `${fontSizes.m}px`,
		lineHeight: '140%',
		textDecoration: 'none',
		letterSpacing: '0.15px',
	},
	'body-m-bold': {
		fontFamily: `${fontFamily}`,
		fontWeight: `${fontWeights.bold}`,
		fontSize: `${fontSizes.m}px`,
		lineHeight: '140%',
		textDecoration: 'none',
		letterSpacing: '0.2px',
	},
	'body-l-regular': {
		fontFamily: `${fontFamily}`,
		fontWeight: `${fontWeights.regular}`,
		fontSize: `${fontSizes.l}px`,
		lineHeight: '162.5%',
		textDecoration: 'none',
		letterSpacing: '0.1px',
	},
	'body-l-medium': {
		fontFamily: `${fontFamily}`,
		fontWeight: `${fontWeights.medium}`,
		fontSize: `${fontSizes.l}px`,
		lineHeight: '162.5%',
		textDecoration: 'none',
		letterSpacing: '0.1px',
	},
	'body-l-bold': {
		fontFamily: `${fontFamily}`,
		fontWeight: `${fontWeights.bold}`,
		fontSize: `${fontSizes.l}px`,
		lineHeight: '162.5%',
		textDecoration: 'none',
		letterSpacing: '0.15px',
	},
	'heading-s-medium': {
		fontFamily: `${fontFamily}`,
		fontWeight: '560',
		fontSize: '20px',
		lineHeight: '140%',
		textDecoration: 'none',
		letterSpacing: '0.2px',
	},
	'heading-s-bold': {
		fontFamily: `${fontFamily}`,
		fontWeight: '650',
		fontSize: '20px',
		lineHeight: '140%',
		textDecoration: 'none',
		letterSpacing: '0.2px',
	},
	'heading-m-medium': {
		fontFamily: `${fontFamily}`,
		fontWeight: '560',
		fontSize: '24px',
		lineHeight: '116.67%',
		textDecoration: 'none',
		letterSpacing: '0.2px',
	},
	'heading-m-bold': {
		fontFamily: `${fontFamily}`,
		fontWeight: '650',
		fontSize: '24px',
		lineHeight: '116.67%',
		textDecoration: 'none',
		letterSpacing: '0.2px',
	},
	'heading-l-medium': {
		fontFamily: `${fontFamily}`,
		fontWeight: '560',
		fontSize: '28px',
		lineHeight: '128.57%',
		textDecoration: 'none',
		letterSpacing: '0.2px',
	},
	'heading-l-bold': {
		fontFamily: `${fontFamily}`,
		fontWeight: '650',
		fontSize: '28px',
		lineHeight: '128.57%',
		textDecoration: 'none',
		letterSpacing: '0.2px',
	},
};
