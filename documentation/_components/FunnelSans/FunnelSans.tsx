import { useState } from 'react';
import { FlexDiv, Label, Slider, TabBar, type TabOption } from 'src';
import css from './FunnelSans.module.css';

const tabs: TabOption[] = [
	{ name: 'Normal', value: 'normal' },
	{ name: 'Italic', value: 'italic' },
];

export function FunnelSans() {
	const [weight, setWeight] = useState(400);
	const [style, setStyle] = useState('regular');

	const handleWeightChange = (value: number) => {
		// set the weight to the nearest integer value
		setWeight(Math.round(value));
	};

	return (
		<FlexDiv
			width={'fill'}
			height={'fit'}
			alignItems={'start'}
			justify={'start'}
		>
			<TabBar
				options={tabs}
				selectedValue={style}
				onTabChange={(option) => setStyle(option.value)}
			/>
			<div
				className={css.glyphs}
				style={{ fontWeight: weight, fontStyle: style }}
			>
				{`ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖabcdefghijklmnopqrstuvwxyzåäö1234567890!"#€%&/()=?*@£<~+>`}
			</div>
			<FlexDiv
				width={'fill'}
				height={'fit'}
				direction={'row'}
				justify={'between'}
				alignItems={'center'}
				gap={16}
			>
				<Label border={0} size="l">
					Variable Weight
				</Label>
				<Slider
					value={weight}
					width={'100%'}
					trackHeadSize={0}
					scaleMin={300}
					scaleMax={800}
					onChange={(v, _) => handleWeightChange(v)}
				/>
				<Label size="l" padding={'4px 16px'}>
					{weight}
				</Label>
			</FlexDiv>
		</FlexDiv>
	);
}
