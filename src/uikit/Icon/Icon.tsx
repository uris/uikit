import React, { useMemo } from "react";
import { useTheme } from "styled-components";
import { type UIIcon, getIconRegistry } from "./iconRegistry";

export type { UIIcon };

export enum IconNames {
	home = "home",
	inbox = "inbox",
	sparkle = "sparkle",
	people = "people",
	wallet = "wallet",
	invoice = "invoice",
	payment = "payment",
	heart = "heart",
	clock = "clock",
	book = "book",
	search = "search",
	filter = "filter",
	more = "more",
	unchecked = "unchecked",
	checked = "checked",
	partial = "partial",
	chevronDown = "chevron down",
	chevronUp = "chevron up",
	plus = "plus",
	plusCircle = "plus circle",
	x = "x",
	gpAssist = "g-p assist",
	upload = "upload",
	download = "download",
	share = "share",
	checkCircle = "check circle",
	person = "person",
	ctrlKey = "ctrl key",
	commandKey = "cmd key",
	gKey = "g key",
	attach = "attach",
	menu = "menu",
	help = "help",
	blank = "blank",
	check = "check",
	message = "message",
	info = "info",
	alert = "alert",
	notification = "notification",
	arrowUp = "arrow up",
	arrowLeft = "arrow left",
	arrowRight = "arrow right",
	gpMark = "gpMark",
	navigate = "navigate",
	document = "document",
	refresh = "refresh",
	recentChats = "recent chats",
	trashBin = "trash bin",
	dollar = "dollar",
	apple = "apple",
	view = "view",
	openCircle = "open circle",
	expanded = "expanded",
	concise = "concise",
	moderate = "moderate",
	mail = "mail",
	textDocument = "text document",
	complianceCheck = "compliance check",
	edit = "edit",
	characterBeam = "character beam",
	undo = "undo",
	chat = "chat",
	exclamation = "exclamation",
	chart = "chart",
	lightBulb = "light bulb",
	settings = "settings",
	documentEditor = "document editor",
	chartArrow = "chart arrow",
	focus = "focus",
	briefcase = "briefcase",
	globeLocation = "globe location",
	barChart = "bar chart",
	fontSmaller = "font smaller",
	fontLarger = "font larger",
	copy = "copy",
	stop = "stop",
	like = "like",
	unlike = "unlike",
	bold = "bold",
	italic = "italic",
	underline = "underline",
	strike = "strike",
	bulletList = "bullet list",
	numberedList = "numbered list",
	sink = "sink",
	lift = "lift",
	code = "code",
	taskList = "task list",
	highlight = "highlight",
}

export interface IconProps {
	name?: string | IconNames;
	size?: number;
	stroke?: number;
	strokeColor?: string;
	accentColor?: string;
	fillColor?: string;
	type?: "line" | "dualtone";
	toggle?: boolean;
	pointer?: boolean;
	theme?: any;
	disabled?: boolean;
	onClick?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

export const Icon = React.memo((props: IconProps) => {
	const theme = useTheme();
	const {
		name = "home",
		size = 22,
		stroke = 1.5,
		strokeColor = theme.colors["core-icon-primary"],
		fillColor = "transparent",
		toggle = false,
		pointer = true,
		disabled = false,
		onClick = () => null,
	} = props;

	const opacity = disabled ? 0.5 : 1;

	// Get icon registry Map - only recreates when props affecting SVG change
	const iconRegistry = useMemo(() => {
		return getIconRegistry({
			size,
			stroke,
			strokeColor,
			fillColor,
			disabled,
			pointer,
			onClick,
			theme,
			opacity,
		});
	}, [
		size,
		stroke,
		strokeColor,
		fillColor,
		disabled,
		pointer,
		onClick,
		theme,
		opacity,
	]);

	// Memoize the icon creation - only creates the ONE icon needed when name or toggle changes
	const renderedIcon = useMemo(() => {
		const normalizedName = name.toLowerCase();
		const icon = iconRegistry.get(normalizedName);

		if (!icon) return null;

		// set the variant to return and call the factory function to create the SVG
		const variant = toggle ? "lineOn" : "line";
		const factory = icon[variant];
		return factory ? factory() : null;
	}, [name, toggle, iconRegistry]);

	return renderedIcon;
});
