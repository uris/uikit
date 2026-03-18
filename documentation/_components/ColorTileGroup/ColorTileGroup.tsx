import React from 'react';
import { type Colors, FlexDiv, lightTheme } from 'src';
import { colorClass, coreColors } from '../../../src/theme/colors/colors';
import { ColorTile } from '../ColorTile/ColorTile';
import type { ColorTileGroupProps } from '../ColorTile/types';

const BaseColorTileGroup = (props: Readonly<ColorTileGroupProps>) => {
	const { pattern, theme = lightTheme } = props;

	// get all color tokens
	const allColorTokens = Object.keys(colorClass) ?? [];

	// create arrays to hold colors
	const groupTokens = [];
	const colors = [];

	// extract patterns to match
	const patterns = typeof pattern === 'string' ? [pattern] : (pattern ?? []);

	// fill group array with tokens
	for (const p of patterns) {
		const tokens = allColorTokens.filter((token) => token.startsWith(p));
		groupTokens.push(...tokens);
	}

	// iterate group tokens to set color values based on theme
	for (const token of groupTokens) {
		const themeToken = token as keyof Colors;
		const hex = theme.colors[themeToken];
		const core =
			Object.entries(coreColors).find(([, value]) => value === hex)?.[0] ??
			undefined;
		colors.push({ token, hex, core });
	}

	return (
		<FlexDiv
			width={'fill'}
			height={'fit'}
			direction={'row'}
			wrap={true}
			gap={16}
		>
			{colors.map((color) => {
				return (
					<ColorTile
						token={color.token}
						hex={color.hex}
						core={color.core}
						key={color.token}
					/>
				);
			})}
		</FlexDiv>
	);
};

BaseColorTileGroup.displayName = 'ColorTileGroup';

export const ColorTileGroup = React.memo(BaseColorTileGroup);
