// use this to get Intellisense for GiaTheme styles
// inside styled components

import {} from "styled-components";
import type { GiaTheme } from "./theme/useGiaThemes";
declare module "styled-components" {
	/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
	export interface DefaultTheme extends GiaTheme {} // extends the global DefaultTheme with GiaTheme.
}
