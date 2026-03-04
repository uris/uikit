import { useEffect } from 'react';

export interface KeyboardShortcut {
	key: string;
	name: string;
}

export type KeyboardShortcuts = KeyboardShortcut[];

export function useKeyboardShortcuts(
	shortcuts: KeyboardShortcuts,
	shortCutHandler: (shortcut: KeyboardShortcut) => void,
	isAppleDevice: boolean,
) {
	// don't process shortcuts on editable elements, like inputs, editable divs, etc.
	const isEditable = (e: KeyboardEvent) => {
		const target = e.target as HTMLElement | null;
		if (target) {
			const tag = target.tagName;
			return (
				target.isContentEditable ||
				tag === 'INPUT' ||
				tag === 'TEXTAREA' ||
				tag === 'SELECT'
			);
		}
		return false;
	};

	// get keyboard event check if it's a shortcut
	function handleKeyPress(e: KeyboardEvent) {
		if (isEditable(e)) return;
		const isMeta = (isAppleDevice && e.metaKey) || (!isAppleDevice && e.ctrlKey);
		for (const s of shortcuts) {
			if (s.key.toLowerCase() === e.key.toLowerCase() && isMeta) {
				e.preventDefault();
				shortCutHandler(s);
				break;
			}
		}
	}

	// set keyboard listener
	useEffect(() => {
		if (shortcuts.length === 0) return;
		globalThis.addEventListener('keydown', handleKeyPress, false);
		return () => {
			globalThis.removeEventListener('keydown', handleKeyPress, false);
		};
	}, [isAppleDevice, shortcuts, shortCutHandler]);
}
