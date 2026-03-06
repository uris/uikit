import { FlexDiv } from '../../uikit/FlexDiv';
import { UILabel } from '../../uikit/UILabel';
import { typeStyles } from '../type/type';
import css from './TypeSizes.module.css';

export function TypeSizes(
	props: Readonly<{ filter: string; sample?: string }>,
) {
	const {
		filter = '',
		sample = 'It is not daily increase but daily decrease, hack away the unessential.',
	} = props;
	const types = [];
	const matchingTypes = Object.keys(typeStyles).filter((key) =>
		key.startsWith(filter),
	);
	for (const type of matchingTypes) {
		const typeStyle = type as keyof typeof typeStyles;
		const cssProps = typeStyles[typeStyle];
		types.push({ name: type, props: cssProps });
	}

	return (
		<FlexDiv
			width={'fill'}
			height={'fit'}
			alignItems={'start'}
			justify={'start'}
		>
			{types.map((entry) => {
				return (
					<div className={css.wrapper} key={entry.name}>
						<UILabel
							size="l"
							border={0}
							padding={'0'}
							color={'var(--core-text-disabled)'}
						>
							{`${entry.name}: Size: ${entry.props.fontSize}, Weight: ${entry.props.fontWeight}, Line Height: ${entry.props.lineHeight}, Letter Spacing: ${entry.props.letterSpacing}`}
						</UILabel>
						<div className={`${css.sample} ${entry.name}`}>{sample}</div>
					</div>
				);
			})}
		</FlexDiv>
	);
}
