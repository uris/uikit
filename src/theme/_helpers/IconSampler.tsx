// biome-ignore lint/style/useImportType: <explanation>
import React, { useMemo, useState } from 'react';
import { Icon } from '../../uikit/Icon';
import { Label } from '../../uikit/Label';
import { Slider } from '../../uikit/Slider';
import css from './IconSampler.module.css';
interface IconSamplerProps {
	icons: string[];
	size?: number;
}

export function IconSampler(props: Readonly<IconSamplerProps>) {
	const { icons, size = 100 } = props;
	const [iconSize, setIconSize] = useState<number>(size);

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
			<div className={css.container} style={cssVars}>
				{icons.map((icon, index) => {
					return (
						<div className={css.wrapper} key={`slice_icon_${icon}`}>
							<div className={css.icon}>
								<Icon name={icon} size={iconSize} />
							</div>
							<div className={css.label}>{icon}</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
