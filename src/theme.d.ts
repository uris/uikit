// use this to get Intellisense for theme styles
// inside styled components

import {} from 'styled-components';
import type { MayaTheme } from './theme/useMayaTheme';
declare module 'styled-components' {
	/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
	export interface DefaultTheme extends MayaTheme {} // extends the global DefaultTheme with GiaTheme.
}
