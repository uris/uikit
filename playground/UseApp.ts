import type { DropDownOption } from "../src/uikit/DropDown/DropDown";
import { IconNames } from "../src/uikit/Icon/Icon";

export function useApp() {
	const iconNames = () => {
		const icons = Object.values(IconNames);
		const options: DropDownOption[] = [];
		icons.forEach((icon: string) => options.push({ label: icon, value: icon }));
		return options.sort((a: DropDownOption, b: DropDownOption) => {
			if ((a?.label || "") > (b?.label || "")) return 1;
			if ((a?.label || "") < (b?.label || "")) return 1;
			return 0;
		});
	};

	return { iconNames };
}
