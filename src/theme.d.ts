// use this to get inteli sense for GiaTheme styles
// inside styled components
import {} from "styled-components";
import { GiaTheme } from "./theme/useGiaThemes";
declare module "styled-components" {
  export interface DefaultTheme extends GiaTheme {} // extends the global DefaultTheme with GiaTheme.
}
