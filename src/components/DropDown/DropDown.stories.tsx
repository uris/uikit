import type { Meta, StoryObj } from '@storybook/react-vite';
// biome-ignore lint/style/useImportType: <explanation>
import { DropDown, DropDownOption } from 'src/components/DropDown';
import { FlexDiv } from 'src/components/FlexDiv/FlexDiv';
import { fn } from 'storybook/test';

type DropdownValueType = {
	id: number;
};

const optionsWPlace: DropDownOption<DropdownValueType>[] = [
	{ label: '-- select a user', value: { id: 0 } },
	{ label: 'Jane Doe', value: { id: 1 } },
	{ label: 'John Doe', value: { id: 2 } },
];

const meta: Meta<typeof DropDown> = {
	title: 'Components/DropDown',
	component: DropDown,
	args: {
		width: '100%',
		height: 'auto',
		label: undefined,
		valueSize: 'm',
		labelSize: 'm',
		selectedIndex: undefined,
		placeholder: true,
		validate: true,
		borderRadius: 4,
		valueKey: 'id',
		selectedValue: { id: 0 },
		options: optionsWPlace,
		bgColor: 'transparent',
		iconColor: undefined,
		borderStyle: 'box',
		iconSize: 20,
		disabled: false,
		error: false,
		size: 'medium',
		onChange: fn(),
	},
};

export default meta;

export const Default: StoryObj<typeof DropDown> = {
	args: {
		error: false,
	},
	render: (args) => {
		return (
			<FlexDiv absolute justify={'center'} alignItems={'center'} padding={64}>
				<DropDown<DropdownValueType>
					{...args}
					selectedValue={args.selectedValue as DropdownValueType}
					options={optionsWPlace}
				/>
			</FlexDiv>
		);
	},
};
