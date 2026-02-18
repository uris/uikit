import type { DropDownOption } from "../DropDown";
import {
	type ButtonBarButton,
	type ButtonBarGroup,
	type EditControls,
	FormattingOption,
} from "./_Types";

export const coreButtons: { [key: string]: ButtonBarButton } = {
	link: {
		icon: "link",
		toolTip: "Link",
		command: "link",
		id: FormattingOption.link,
	},
	hilight: {
		icon: "hilight",
		toolTip: "Highlight",
		command: "hilight",
		id: FormattingOption.hilight,
	},
	bold: {
		icon: "bold",
		toolTip: "Bold",
		command: "bold",
		id: FormattingOption.bold,
		shortcut: { modifier: "meta", key: "b" },
	},
	italic: {
		icon: "italic",
		toolTip: "Italic",
		command: "italic",
		id: FormattingOption.italic,
		shortcut: { modifier: "meta", key: "i" },
	},
	underline: {
		icon: "underline",
		toolTip: "Underline",
		command: "underline",
		id: FormattingOption.underline,
		shortcut: { modifier: "meta", key: "u" },
	},
	strikethrough: {
		icon: "strike",
		toolTip: "Strikethrough",
		command: "strike",
		id: FormattingOption.strikethrough,
		shortcut: { modifier: "meta", key: "s" },
	},
	list: {
		icon: "bullet list",
		toolTip: "List",
		command: "ulist",
		id: FormattingOption.list,
	},
	orderedList: {
		icon: "numbered list",
		toolTip: "Ordered list",
		command: "olist",
		id: FormattingOption.orderedList,
	},
	taskList: {
		icon: "task list",
		toolTip: "Task list",
		command: "task",
		id: FormattingOption.taskList,
	},
	sinkList: {
		icon: "sink",
		toolTip: "Sink list item",
		command: "sink",
		id: FormattingOption.sinkList,
	},
	raiseList: {
		icon: "lift",
		toolTip: "Raise list item",
		command: "raise",
		id: FormattingOption.raiseList,
	},
	undo: {
		icon: "undo",
		toolTip: "Undo",
		command: "undo",
		id: FormattingOption.undo,
	},
	redo: {
		icon: "redo",
		toolTip: "Redo",
		command: "redo",
		id: FormattingOption.redo,
	},
	copy: {
		icon: "copy",
		toolTip: "Copy",
		command: "copy",
		id: FormattingOption.copy,
	},
	download: {
		icon: "download",
		toolTip: "Download",
		command: "download",
		id: FormattingOption.download,
	},
	more: {
		icon: "more",
		toolTip: "More Options",
		command: "more",
		id: FormattingOption.more,
	},
};

export const styles: DropDownOption[] = [
	{ label: "Heading 1", value: "h1", alt: "h1" },
	{ label: "Heading 2", value: "h2", alt: "h2" },
	{ label: "Heading 3", value: "h3", alt: "h3" },
	{ label: "Body", value: "p", alt: "p" },
];

export const buttonGroups: { [key: string]: ButtonBarGroup } = {
	format: {
		buttons: [
			coreButtons.hilight,
			coreButtons.bold,
			coreButtons.italic,
			coreButtons.underline,
			coreButtons.strikethrough,
			coreButtons.link,
		],
	},
	lists: {
		buttons: [coreButtons.list, coreButtons.orderedList, coreButtons.taskList],
	},
	listEdit: {
		buttons: [coreButtons.sinkList, coreButtons.raiseList],
	},
	undo: {
		buttons: [coreButtons.undo, coreButtons.redo],
	},
	more: {
		buttons: [coreButtons.more],
	},
};

export const editControls: { [key: string]: EditControls } = {
	regular: {
		styles,
		buttons: [
			buttonGroups.format,
			buttonGroups.lists,
			buttonGroups.listEdit,
			buttonGroups.undo,
		],
		download: coreButtons.download,
	},
	small: {
		buttons: [buttonGroups.format, buttonGroups.more],
		download: coreButtons.download,
	},
	medium: {
		styles,
		buttons: [buttonGroups.format, buttonGroups.lists],
		download: coreButtons.download,
	},
};
