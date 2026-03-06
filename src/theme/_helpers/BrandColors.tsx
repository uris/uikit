import { useCallback, useRef, useState } from 'react';
import { useToolTip } from '../../hooks';
import { FlexDiv } from '../../uikit/FlexDiv';
import { Tip } from '../../uikit/Tip/Tip';
import { Toast } from '../../uikit/Toast/Toast';
import type { ToolTip } from '../../uikit/sharedTypes';
import { coreColors } from '../colors/colors';
import { ColorTile } from './ColorTile';
import { ColorTileGroup } from './ColorTileGroup';

export function BrandColors() {
	const [tip, setTip] = useState<ToolTip | null>(null);
	const [message, setMessage] = useState<string | null>(null);
	const tipRef = useRef<HTMLDivElement>(null);
	const coords = useToolTip(tip, tipRef);
	type ColorMap = Record<string, string>;

	type ColorGroup = {
		key: string;
		values: Array<{ key: string; value: string }>;
	};

	function groupColors(colors: ColorMap): ColorGroup[] {
		const grouped = new Map<string, Array<{ key: string; value: string }>>();

		for (const [key, value] of Object.entries(colors)) {
			const match = /^brand-[a-z]+-/i.exec(key); // e.g. brand-grey-300
			const bucket = match ? match[0].slice(0, -1) : 'Special'; // brand-grey or misc

			if (!grouped.has(bucket)) grouped.set(bucket, []);
			grouped.get(bucket)?.push({ key, value });
		}

		return Array.from(grouped.entries()).map(([key, values]) => ({
			key,
			values,
		}));
	}

	const groupedColors = groupColors(coreColors);

	const handleCopy = useCallback((token: string, hex: string) => {
		setMessage('Copied to clipboard');
	}, []);

	const handleToolTip = useCallback((tip: ToolTip | null) => {
		setTip(tip);
	}, []);

	return (
		<FlexDiv
			width={'fill'}
			height={'fit'}
			gap={16}
			justify={'start'}
			alignItems={'start'}
			scrollY
			padding={'0 0 32px 0'}
		>
			{groupedColors.map((group) => {
				return (
					<FlexDiv
						width={'fill'}
						height={'fit'}
						direction={'column'}
						key={group.key}
					>
						<h3 style={{ textTransform: 'capitalize' }}>{group.key}</h3>
						<FlexDiv
							width={'fill'}
							height={'fit'}
							direction={'row'}
							wrap={true}
							gap={16}
						>
							{group.values.map((color) => {
								return (
									<ColorTile
										token={color.key}
										hex={color.value}
										key={color.key}
										onCopy={handleCopy}
										onTooltip={handleToolTip}
									/>
								);
							})}
						</FlexDiv>
					</FlexDiv>
				);
			})}
			<Tip ref={tipRef} coords={coords} tip={tip} />
			<Toast message={message} didHide={() => setMessage(null)} close={false} />
		</FlexDiv>
	);
}
