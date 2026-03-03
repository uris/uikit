import type React from 'react';

type IconBaseProps = {
	name?: string;
	size?: number;
	stroke?: number;
	strokeColor?: string;
	fillColor?: string;
	coverUp?: string;
	toggle?: boolean;
	pointer?: boolean;
	disabled?: boolean;
	onClick?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
};

export type IconProps = Omit<
	React.SVGAttributes<SVGSVGElement>,
	keyof IconBaseProps
> &
	IconBaseProps;

export enum IconNames {
	home = 'home',
	inbox = 'inbox',
	sparkle = 'sparkle',
	people = 'people',
	wallet = 'wallet',
	invoice = 'invoice',
	payment = 'payment',
	heart = 'heart',
	clock = 'clock',
	book = 'book',
	search = 'search',
	filter = 'filter',
	more = 'more',
	unchecked = 'unchecked',
	checked = 'checked',
	partial = 'partial',
	chevronDown = 'chevron down',
	chevronUp = 'chevron up',
	plus = 'plus',
	plusCircle = 'plus circle',
	x = 'x',
	gpAssist = 'g-p assist',
	upload = 'upload',
	download = 'download',
	share = 'share',
	checkCircle = 'check circle',
	person = 'person',
	ctrlKey = 'ctrl key',
	commandKey = 'cmd key',
	gKey = 'g key',
	attach = 'attach',
	menu = 'menu',
	help = 'help',
	blank = 'blank',
	check = 'check',
	message = 'message',
	info = 'info',
	alert = 'alert',
	notification = 'notification',
	arrowUp = 'arrow up',
	arrowLeft = 'arrow left',
	arrowRight = 'arrow right',
	navigate = 'navigate',
	document = 'document',
	refresh = 'refresh',
	recentChats = 'recent chats',
	trashBin = 'trash bin',
	dollar = 'dollar',
	apple = 'apple',
	view = 'view',
	openCircle = 'open circle',
	expanded = 'expanded',
	concise = 'concise',
	moderate = 'moderate',
	mail = 'mail',
	textDocument = 'text document',
	complianceCheck = 'compliance check',
	edit = 'edit',
	characterBeam = 'character beam',
	undo = 'undo',
	chat = 'chat',
	exclamation = 'exclamation',
	chart = 'chart',
	lightBulb = 'light bulb',
	settings = 'settings',
	documentEditor = 'document editor',
	chartArrow = 'chart arrow',
	focus = 'focus',
	briefcase = 'briefcase',
	globeLocation = 'globe location',
	barChart = 'bar chart',
	fontSmaller = 'font smaller',
	fontLarger = 'font larger',
	copy = 'copy',
	stop = 'stop',
	like = 'like',
	unlike = 'unlike',
	bold = 'bold',
	italic = 'italic',
	underline = 'underline',
	strike = 'strike',
	bulletList = 'bullet list',
	numberedList = 'numbered list',
	sink = 'sink',
	lift = 'lift',
	code = 'code',
	taskList = 'task list',
	highlight = 'highlight',
}
