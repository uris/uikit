// biome-ignore lint/style/useImportType: <explanation>
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useObserveResize } from '../../../src';
import { Icon } from '../../../src/components/Icon';
import { Label } from '../../../src/components/Label';
import { Slider } from '../../../src/components/Slider';
import css from './IconSampler.module.css';
interface IconSamplerProps {
	icons: string[];
	size?: number;
}

export function IconSampler(props: Readonly<IconSamplerProps>) {
	const { icons = [], size = 100 } = props;
	const [iconSize, setIconSize] = useState<number>(size);
	const [spacers, setSpacers] = useState<string[]>([]);
	const ref = useRef<HTMLDivElement>(null);
	const wrapperSize = useObserveResize(ref, { ignore: 'height' });

	useEffect(() => {
		if (!ref.current || !iconSize || !wrapperSize) return;
		const items = ref.current.querySelectorAll('.slice_icon');
		if (items?.length <= 0) return;
		const topRowOffset = (items[0] as HTMLDivElement).offsetTop;
		let rowItemCount = 0;
		for (const item of items) {
			if ((item as HTMLDivElement).offsetTop === topRowOffset) rowItemCount++;
		}
		const itemsPerRow = Math.ceil(icons.length / rowItemCount);
		const spacerCount = rowItemCount * itemsPerRow - icons.length;
		const spacerArray = [];
		for (let i = 0; i < spacerCount; i++) {
			spacerArray.push(`spacer_${i}`);
		}
		setSpacers(spacerArray);
	}, [iconSize, icons, wrapperSize]);

	const cssVars = useMemo(() => {
		return {
			'--icon-size': `${iconSize + 16 * 2}px`,
		} as React.CSSProperties;
	}, [iconSize]);

	return (
		<>
			<div className={css.controls}>
				<Slider
					scaleMin={10}
					scaleMax={128}
					value={iconSize}
					onChange={(value, _) => setIconSize(value)}
					width={'100%'}
					trackHeadSize={0}
				/>
				<Label>{iconSize.toFixed(0)}px</Label>
			</div>
			<div className={css.container} style={cssVars} ref={ref}>
				{icons.map((icon, index) => {
					return (
						<div
							className={`${css.wrapper} slice_icon`}
							key={`slice_icon_${icon}`}
						>
							<div className={css.icon}>
								<Icon name={icon} size={iconSize} />
							</div>
							<div className={css.label}>{icon}</div>
						</div>
					);
				})}
				{spacers.map((spacer) => {
					return <div className={css.spacer} key={spacer} />;
				})}
			</div>
		</>
	);
}
