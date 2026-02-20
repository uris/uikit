import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { lightTheme } from '../theme/useMayaTheme';
import { DropDown, type DropDownOption } from '../uikit/DropDown/DropDown';
import { FlexDiv } from '../uikit/FlexDiv/FlexDiv';

const optionsWPlace: DropDownOption[] = [
	{ label: 'select an option', value: 'none' },
	{ label: 'option 1', value: 'option-1' },
	{ label: 'option 2', value: 'option-2' },
];

const meta: Meta<typeof DropDown> = {
	title: 'UI Kit/DropDown',
	component: DropDown,
	args: {
		width: '100%',
		height: 'auto',
		selectedIndex: 0,
		selectedValue: '',
		options: optionsWPlace,
		placeholder: true,
		validate: true,
		borderRadius: 4,
		bgColor: 'transparent',
		iconColor: lightTheme.colors['core-text-primary'],
		paddingLeft: undefined,
		paddingRight: undefined,
		paddingTops: undefined,
		iconSize: 24,
		disabled: false,
		unframed: false,
		focused: false,
		gap: 0,
		size: 'medium',
		onChange: fn(),
		onValidate: fn(),
		onFocus: fn(),
		onBlur: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof DropDown> = {
	render: (args) => {
		return (
			<FlexDiv justify={'center'} alignItems={'center'} padding={64}>
				<DropDown {...args} />
			</FlexDiv>
		);
	},
};
